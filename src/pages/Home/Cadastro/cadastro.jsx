import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // <<< IMPORTAMOS O LINK
import api from "../../../services/api";
import "./style.css";

function Cadastro() {
  // ... (Seu estado e funções permanecem inalterados) ...
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnpj: "",
    number: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Nota: Seu backend espera 'phone', mas seu estado usa 'number'. 
      // É recomendado mudar 'number' para 'phone' no estado e no input 'name'.
      const dataToSend = { ...formData, phone: formData.number }; 
      delete dataToSend.number; // Remove 'number' e usa 'phone' que é esperado pelo Flask

      const response = await api.post("/user", dataToSend);
      alert("Usuário registrado com sucesso!");
      navigate("/ativar", { state: { number: formData.number } });

    } catch (error) {
      console.error(error);
      alert("Erro ao registrar usuário!");
    }
  };

  return (
    <div className="cadastro-container">
      {/* Classe 'cadastro-card' será definida no CSS para o estilo branco/arredondado */}
      <div className="cadastro-card"> 
        
        {/* Título */}
        <h1>Crie sua conta</h1> 

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            {/* Removido <label> e adicionado placeholder */}
            <input name="name" onChange={handleChange} placeholder="Nome completo" required />
          </div>

          <div className="input-group">
            {/* Removido <label> e adicionado placeholder */}
            <input name="email" onChange={handleChange} placeholder="Email" required />
          </div>

          <div className="input-group">
            {/* Removido <label> e adicionado placeholder */}
            <input type="password" name="password" onChange={handleChange} placeholder="Senha" required />
          </div>

          <div className="input-group">
            {/* Removido <label> e adicionado placeholder */}
            <input name="cnpj" onChange={handleChange} placeholder="CNPJ" required />
          </div>

          <div className="input-group">
            {/* Removido <label> e adicionado placeholder. OBS: Mantenha 'number' aqui se seu estado for 'number' */}
            <input name="number" onChange={handleChange} placeholder="WhatsApp" required />
          </div>

          {/* O botão usa a classe 'cadastro-btn' para o novo estilo azul */}
          <button type="submit" className="cadastro-btn">
            Criar Conta
          </button>
        </form>

        {/* Novo link de login no final */}
        <p className="login-link">
            Já tem uma conta? <Link to="/login">Faça login.</Link>
        </p>

      </div>
    </div>
  );
}

export default Cadastro;