import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/services/api";
import "./FormLogin.css";

const FormLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login() {
    let dados = {
      email: email,
      senha: password
    };

    try {
      const response = await api.login(dados);
      console.log(response);
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Erro ao fazer login");
    }
  }

  async function cadastrar() {
    let dados = {
      email: email,
      senha: password,
      nome: nome,
      telefone: telefone
    };

    try {
      const response = await api.cadastrar(dados);
      console.log(response);
      toast.success("Cadastro realizado! Faça login para continuar.");
      setIsLogin(true);
    } catch (error) {
      toast.error(error.message || "Erro ao cadastrar");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login();
      } else {
        await cadastrar();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-login-container">
      <div className="form-login-card">
        <div className="form-login-header">
          <h1 className="form-login-title">Mini Mercado</h1>
          <p className="form-login-subtitle">
            {isLogin ? "Faça login na sua conta" : "Crie sua conta"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-login-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="nome">Nome do Estabelecimento</label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone/WhatsApp</label>
                <input
                  id="telefone"
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                  maxLength={20}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="form-login-button" disabled={loading}>
            {loading ? "Processando..." : isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <div className="form-login-footer">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="form-login-toggle"
          >
            {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
