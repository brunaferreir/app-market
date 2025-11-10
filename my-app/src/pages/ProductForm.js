import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import '../App.css'

export default function ProductForm() {
  const { id } = useParams(); // se existir, estamos editando
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", preco: "", quantidade: "", status: "Ativo", img: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const data = await api.getProduct(id);
          setForm({ nome: data.nome, preco: data.preco, quantidade: data.quantidade, status: data.status, img: data.img || "" });
        } catch (err) { setError("Não foi possível carregar produto"); }
      })();
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.updateProduct(id, { nome: form.nome, preco: Number(form.preco), quantidade: Number(form.quantidade), status: form.status, img: form.img });
      } else {
        await api.createProduct({ nome: form.nome, preco: Number(form.preco), quantidade: Number(form.quantidade), status: form.status, img: form.img });
      }
      navigate("/products");
    } catch (err) {
      setError(err.body?.message || "Erro ao salvar produto");
    }
  };

  return (
    <div className="container">
      <h2>{id ? "Editar Produto" : "Novo Produto"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="preco" value={form.preco} onChange={handleChange} placeholder="Preço" required />
        <input name="quantidade" value={form.quantidade} onChange={handleChange} placeholder="Quantidade" required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Ativo</option>
          <option>Inativo</option>
        </select>
        <input name="img" value={form.img} onChange={handleChange} placeholder="URL da imagem" />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
