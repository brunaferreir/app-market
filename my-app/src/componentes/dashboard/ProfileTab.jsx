import { useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório").max(100),
  telefone: z.string().trim().min(10, "Telefone inválido").max(20),
});

const ProfileTab = ({ seller, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState(seller.nome);
  const [telefone, setTelefone] = useState(seller.telefone);

  async function atualizarPerfil(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = profileSchema.parse({ nome, telefone });

      let dados = {
        nome: validated.nome,
        telefone: validated.telefone,
      };

      const response = await api.updateSeller(seller.user_id, dados);
      console.log(response);

      toast.success("Perfil atualizado!");
      onUpdate();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Erro ao atualizar perfil");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Informações do Perfil</CardTitle>
          <CardDescription>
            Atualize suas informações pessoais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={atualizarPerfil} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone/WhatsApp</Label>
              <Input
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                maxLength={20}
              />
            </div>
            <div className="space-y-2">
              <Label>Status da Conta</Label>
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    seller.ativo ? "bg-success" : "bg-muted-foreground"
                  }`}
                />
                <span className="text-sm">
                  {seller.ativo ? "Ativa" : "Aguardando ativação"}
                </span>
              </div>
            </div>
            {seller.codigo_ativacao && (
              <div className="space-y-2">
                <Label>Código de Ativação</Label>
                <Input value={seller.codigo_ativacao} readOnly disabled />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Integração WhatsApp</CardTitle>
          <CardDescription>
            Configure a integração com WhatsApp para receber códigos de ativação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            A integração com WhatsApp via Twilio está preparada e será ativada em breve.
            Você receberá códigos de ativação diretamente no seu WhatsApp cadastrado.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
