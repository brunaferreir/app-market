import { useState, useEffect } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { z } from "zod";

const saleSchema = z.object({
  produto_id: z.string().uuid("Selecione um produto"),
  quantidade: z.number().int().positive("Quantidade deve ser positiva"),
});

const SalesTab = ({ sellerId, onUpdate }) => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    buscarVendas();
    buscarProdutos();
  }, [sellerId]);

  async function buscarVendas() {
    try {
      const data = await api.getVendas(sellerId);
      console.log(data);
      setSales(data || []);
    } catch (error) {
      toast.error("Erro ao carregar vendas");
    }
  }

  async function buscarProdutos() {
    try {
      const data = await api.getProdutos(sellerId);
      const produtosComEstoque = data.filter(p => p.estoque > 0);
      setProducts(produtosComEstoque);
    } catch (error) {
      toast.error("Erro ao carregar produtos");
    }
  }

  async function registrarVenda(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = saleSchema.parse({
        produto_id: selectedProduct,
        quantidade: parseInt(quantidade),
      });

      const product = products.find((p) => p.id === validated.produto_id);

      if (!product) {
        throw new Error("Produto não encontrado");
      }

      if (product.estoque < validated.quantidade) {
        throw new Error("Estoque insuficiente");
      }

      const valorTotal = product.preco * validated.quantidade;

      let dados = {
        seller_id: sellerId,
        produto_id: validated.produto_id,
        quantidade: validated.quantidade,
        valor_total: valorTotal,
      };

      const response = await api.createVenda(dados);
      console.log(response);

      // Atualizar estoque
      const novoEstoque = product.estoque - validated.quantidade;
      await api.updateProduto(validated.produto_id, { estoque: novoEstoque });

      toast.success("Venda registrada!");
      resetForm();
      buscarVendas();
      buscarProdutos();
      onUpdate();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Erro ao registrar venda");
      }
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setSelectedProduct("");
    setQuantidade("");
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Registrar Vendas</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Venda
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Nova Venda</DialogTitle>
            </DialogHeader>
            <form onSubmit={registrarVenda} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="produto">Produto</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.nome} - R$ {Number(product.preco).toFixed(2)} (Estoque: {product.estoque})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  type="number"
                  min="1"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  required
                />
              </div>
              {selectedProduct && quantidade && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium">
                    Valor Total: R${" "}
                    {(
                      (products.find((p) => p.id === selectedProduct)?.preco || 0) *
                      parseInt(quantidade || "0")
                    ).toFixed(2)}
                  </p>
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registrando..." : "Registrar Venda"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Valor Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Nenhuma venda registrada
                </TableCell>
              </TableRow>
            ) : (
              sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    {new Date(sale.created_at).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="font-medium">
                    {sale.produtos?.nome}
                  </TableCell>
                  <TableCell>{sale.quantidade}</TableCell>
                  <TableCell className="font-semibold text-success">
                    R$ {Number(sale.valor_total).toFixed(2)}
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

export default SalesTab;
