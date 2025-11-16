import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./inicio.css";

function Inicio() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({
    totalProdutos: 0,
    totalVendas: 0,
    produtosAtivos: 0,
  });
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const produtosRes = await api.get("/product");
        const produtos = produtosRes.data.produtos || [];
        const ativos = produtos.filter((p) => p.status !== "inactive").length;

        const vendasRes = await api.get("/sale");
        const vendas = vendasRes.data.vendas || [];

        setDados({
          totalProdutos: produtos.length,
          totalVendas: vendas.length,
          produtosAtivos: ativos,
        });
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar dados do dashboard!");
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="container">
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p>Bem-vindo ao sistema de gestão de estoque!</p>

        {erro && <p className="erro">{erro}</p>}

        {/* 🔹 CARD ÚNICO NOVO */}
        <div className="info-card-unico">
          <h3>Visão Geral do Sistema</h3>

          <div className="info-linhas">
            <div className="linha">
              <span>Total de Produtos:</span>
              <strong>{dados.totalProdutos}</strong>
            </div>

            <div className="linha">
              <span>Produtos Ativos:</span>
              <strong>{dados.produtosAtivos}</strong>
            </div>

            <div className="linha">
              <span>Total de Vendas:</span>
              <strong>{dados.totalVendas}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 TODOS OS BOTÕES ESTÃO AQUI, INTACTOS */}
      <div className="acoes">
        <h2>Funções do Sistema</h2>
        <div className="botoes-acoes">
          <button onClick={() => navigate("/cadastrar_produto")}>
            Cadastrar Produto
          </button>

          <button onClick={() => navigate("/listar_produto")}>
            Listar Produtos
          </button>

          <button onClick={() => navigate("/sale")}>
            Registrar Venda
          </button>

          <button onClick={() => navigate("/listar_vendas")}>
            Listar Vendas
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
