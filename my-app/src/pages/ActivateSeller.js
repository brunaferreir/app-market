import React, { useState } from "react";
import api from "../api";
import '../App.css'

export default function ActivateSeller() {
  const [celular, setCelular] = useState("");
  const [codigo, setCodigo] = useState("");
  const [message, setMessage] = useState("");

  const handleActivate = async (e) => {
    e.preventDefault();
    try {
      await api.activateSeller({ celular, codigo });
      setMessage("Conta ativada! Você já pode realizar login.");
    } catch (err) {
      setMessage(err.body?.message || "Erro na ativação");
    }
  };

  return (
    <div className="container">
      <h2>Ativar Conta</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleActivate}>
        <input placeholder="Celular (+55...)" value={celular} onChange={(e) => setCelular(e.target.value)} required />
        <input placeholder="Código (4 dígitos)" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
        <button type="submit">Ativar</button>
      </form>
    </div>
  );
}
