import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import '../App.css'

// Se você já tem FormLogin.js com layout, importe e utilize-o aqui.
import FormLogin from "../componentes/Seller/FormLogin"; // ajuste o path se necessário

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Se FormLogin não enviar os dados, você pode replicar um pequeno form aqui.
  const handleLogin = async (email, senha) => {
    try {
      await login({ email, senha });
      navigate("/dashboard");
    } catch (err) {
      setError(err.body?.message || "Erro ao entrar");
    }
  };

  return (
    <div className="container">
      <h2>Login Seller</h2>
      {error && <p>{error}</p>}
      {/* Se seu FormLogin aceita props onSubmit, passe handleLogin */}
      <FormLogin onSubmit={handleLogin} />
      {/* Se não, implemente o form aqui */}
    </div>
  );
}
