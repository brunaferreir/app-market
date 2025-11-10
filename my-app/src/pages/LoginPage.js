import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import '../App.css'


import FormLogin from "../componentes/Seller/FormLogin"; // ajuste o path se necessário

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

 
  const handleLogin = async (email, password) => {
    try {
      await login({ email, password});
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
