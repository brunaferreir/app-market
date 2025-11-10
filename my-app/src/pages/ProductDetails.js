import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import '../App.css'

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const p = await api.getProduct(id);
        setProduct(p);
      } catch (err) { setError("Erro ao carregar produto"); }
    })();
  }, [id]);

  const handleInactivate = async () => {
    if (!window.confirm("Inativar produto?")) return;
    try {
      await api.inactivateProduct(id);
      navigate("/products");
    } catch (err) {
      setError("Erro ao inativar");
    }
  };

  if (!product) return <div>{error || "Carregando..."}</div>;

  return (
    <div className="container">
      <h2>{product.nome}</h2>
      {product.img && <img src={product.img} alt={product.nome} style={{ maxWidth: 200 }} />}
      <p>Preço: R$ {product.preco}</p>
      <p>Quantidade: {product.quantidade}</p>
      <p>Status: {product.status}</p>
      <button onClick={() => navigate(`/products/${id}/edit`)}>Editar</button>
      <button onClick={handleInactivate}>Inativar</button>
    </div>
  );
}
