import React, { useState } from "react";
import api from "../api";
import '../App.css'

export default function SellerRegister() {

  const [form, setForm] = useState({ name: "", cnpj: "", email: "", celular: "", password: "" });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createSeller(form);
      setMessage("Cadastro realizado! Você receberá um código via WhatsApp para ativação.");
    } catch (err) {
      // Mensagem de erro mais detalhada do Flask (400)
      setMessage(err.body?.error || err.body?.message || "Erro ao cadastrar");
    }
  };

  return (
    <div className="container">
      <h2>Cadastro Mini Mercado</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>

        <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
        
        <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required />
        <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} type="email" required />
        <input name="celular" placeholder="Celular (+55...)" value={form.celular} onChange={handleChange} required />
        
        <input name="password" placeholder="Senha" value={form.password} onChange={handleChange} type="password" required />
        
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}