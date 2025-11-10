import React, { useEffect, useState } from "react";
import api from "../api";
import '../App.css'

export default function CreateSale() {
  const [products, setProducts] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.listProducts();
        setProducts(res || []);
      } catch (err) {
        setMessage("Erro ao carregar produtos");
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createSale({ produtoId: Number(produtoId), quantidade: Number(quantidade) });
      setMessage("Venda registrada com sucesso!");
    } catch (err) {
      setMessage(err.body?.message || "Erro ao registrar venda");
    }
  };

  return (
    <div className="container">
      <h2>Registrar Venda</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <select value={produtoId} onChange={(e) => setProdutoId(e.target.value)} required>
          <option value="">Selecione um produto</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.nome} - estoque: {p.quantidade}</option>
          ))}
        </select>
        <input type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        <button type="submit">Vender</button>
      </form>
    </div>
  );
}
