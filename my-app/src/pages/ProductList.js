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
      setError(null); 
    } catch (err) {
     
      setError("Erro ao buscar produtos. Tente fazer login novamente.");
      setProducts([]); 
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container">
      <h2>Meus Produtos</h2>
      {error && <p className="error-message">{error}</p>} 
      <Link to="/products/new">+ Novo produto</Link>
      
     
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
               
                <td><Link to={`/products/${p.id}`}>{p.name}</Link></td> 
                
               
                <td>R$ {p.price}</td> 
                
                
                <td>{p.quantity}</td> 
                
                <td>{p.status}</td>
                <td>
                  <Link to={`/products/${p.id}/edit`}>Editar</Link>
             
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        
        <p>Carregando produtos ou nenhum produto cadastrado.</p>
      )}
    </div>
  );
}