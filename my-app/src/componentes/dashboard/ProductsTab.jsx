import { useState, useEffect } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import { z } from "zod";

const productSchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório").max(100),
  preco: z.number().positive("Preço deve ser positivo").max(9999999.99),
  estoque: z.number().int().min(0, "Estoque não pode ser negativo"),
});

const ProductsTab = ({ sellerId, onUpdate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    buscarProdutos();
  }, [sellerId]);

  async function buscarProdutos() {
    try {
      const data = await api.getProdutos(sellerId);
      console.log(data);
      setProducts(data || []);
    } catch (error) {
      toast.error("Erro ao carregar produtos");
    }
  }

  async function salvarProduto(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = productSchema.parse({
        nome: nome.trim(),
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
      });

      let imagemUrl = editingProduct?.imagem_url || null;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${sellerId}/${Date.now()}.${fileExt}`;

        imagemUrl = await api.uploadImagem(imageFile, fileName);
      }

      let dados = {
        nome: validated.nome,
        preco: validated.preco,
        estoque: validated.estoque,
        imagem_url: imagemUrl,
      };

      if (editingProduct) {
        const response = await api.updateProduto(editingProduct.id, dados);
        console.log(response);
        toast.success("Produto atualizado!");
      } else {
        dados.seller_id = sellerId;
        const response = await api.createProduto(dados);
        console.log(response);
        toast.success("Produto criado!");
      }

      resetForm();
      buscarProdutos();
      onUpdate();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Erro ao salvar produto");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNome(product.nome);
    setPreco(product.preco.toString());
    setEstoque(product.estoque.toString());
    setOpen(true);
  };

  async function deletarProduto(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    try {
      await api.deleteProduto(id);
      toast.success("Produto excluído!");
      buscarProdutos();
      onUpdate();
    } catch (error) {
      toast.error("Erro ao excluir produto");
    }
  }

  const resetForm = () => {
    setNome("");
    setPreco("");
    setEstoque("");
    setImageFile(null);
    setEditingProduct(null);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={salvarProduto} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Produto</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preco">Preço (R$)</Label>
                <Input
                  id="preco"
                  type="number"
                  step="0.01"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estoque">Estoque</Label>
                <Input
                  id="estoque"
                  type="number"
                  value={estoque}
                  onChange={(e) => setEstoque(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imagem">Imagem do Produto</Label>
                <Input
                  id="imagem"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Salvando..." : editingProduct ? "Atualizar" : "Criar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Nenhum produto cadastrado
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.imagem_url ? (
                      <img
                        src={product.imagem_url}
                        alt={product.nome}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.nome}</TableCell>
                  <TableCell>R$ {Number(product.preco).toFixed(2)}</TableCell>
                  <TableCell>{product.estoque}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletarProduto(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsTab;
