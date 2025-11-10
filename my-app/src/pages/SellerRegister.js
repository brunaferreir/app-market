import React, { useState } from "react";
import api from "../api";
import '../App.css'

export default function SellerRegister() {
  const [form, setForm] = useState({ nome: "", cnpj: "", email: "", celular: "", senha: "" });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createSeller(form);
      setMessage("Cadastro realizado! Você receberá um código via WhatsApp para ativação.");
    } catch (err) {
      setMessage(err.body?.message || "Erro ao cadastrar");
    }
  };

  return (
    <div className="container">
      <h2>Cadastro Mini Mercado</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required />
        <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} type="email" required />
        <input name="celular" placeholder="Celular (+55...)" value={form.celular} onChange={handleChange} required />
        <input name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} type="password" required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
