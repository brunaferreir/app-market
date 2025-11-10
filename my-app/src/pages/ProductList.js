import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import '../App.css'

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const res = await api.listProducts();
      setProducts(res || []);
    } catch (err) {
      setError("Erro ao buscar produtos");
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container">
      <h2>Meus Produtos</h2>
      {error && <p>{error}</p>}
      <Link to="/products/new">+ Novo produto</Link>
      <table>
        <thead><tr><th>Nome</th><th>Preço</th><th>Quantidade</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td><Link to={`/products/${p.id}`}>{p.nome}</Link></td>
              <td>R$ {p.preco}</td>
              <td>{p.quantidade}</td>
              <td>{p.status}</td>
              <td>
                <Link to={`/products/${p.id}/edit`}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
