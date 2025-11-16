import { useState } from "react";
import api from "../../../services/api";
import { useNavigate, Link } from "react-router-dom"; // Importamos Link
import "./style.css";

function Login() {
  // ... (Seu estado e funções permanecem inalterados) ...
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  // ATENÇÃO: É fortemente recomendado usar o Firestore, e não localStorage,
  // para persistência de dados em aplicações profissionais/reais.
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/login", { email, password });

      // Aqui, você usaria o contexto do Firebase para armazenar o token
      localStorage.setItem("token", response.data.access_token); 

      navigate("/inicio");
    } catch (error) {
      setErro("Email ou senha inválidos!");
    }
  }

  return (
    // Usa a mesma estrutura de centralização do Cadastro
    <div className="cadastro-container"> 
      {/* Usa a classe de card branco (Vamos redefinir 'login-card' para ser igual) */}
      <div className="cadastro-card"> 
        
        <h2>Entrar</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Email" // Placeholder conforme o novo estilo
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Usando a classe input-group que definimos no CSS do Cadastro
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Senha" // Placeholder
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // Usando a classe input-group
            />
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button type="submit" className="cadastro-btn">
            {/* Usamos a classe do botão de cadastro para manter a cor e estilo */}
            Entrar
          </button>
          
        </form>
        
        {/* Link "Não tem conta? Crie sua conta." */}
        <p className="login-link">
            Não tem uma conta? <Link to="/cadastro">Crie sua conta.</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;