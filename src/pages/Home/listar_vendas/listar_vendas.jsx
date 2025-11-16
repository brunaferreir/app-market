import { useEffect, useState } from "react";
import api from "../../../services/api";
import "./listar_vendas.css";
import { useNavigate } from "react-router-dom";

function ListarVendas() {
  const [vendas, setVendas] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVendas() {
      try {
        const res = await api.get("/sale");
        setVendas(res.data.vendas || []);
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar vendas!");
      }
    }

    fetchVendas();
  }, []);

  function formatarData(dateString) {
    if (!dateString) return "Data inválida";
    const data = new Date(dateString);
    return data.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  }

  return (
<div className="container">
  <div className="lista-vendas">
    <h1>Minhas Vendas</h1>

    {erro && <p className="erro">{erro}</p>}

    {vendas.length === 0 ? (
      <p className="erro">Nenhuma venda encontrada.</p>
    ) : (
      vendas.map((venda, index) => (
        <div key={index} className="venda-item">
          <div className="info">
            <p><strong>ID do Produto:</strong> {venda.product_id}</p>
            <p><strong>Nome:</strong> {venda.product_name}</p>
            <p><strong>Preço vendido:</strong> R$ {Number(venda.preco).toFixed(2)}</p>
            <p><strong>Data e hora:</strong> {formatarData(venda.date)}</p>
          </div>
        </div>
      ))
    )}

    <button className="botao-voltar" onClick={() => navigate("/inicio")}>
      ← Voltar
    </button>
  </div>
</div>

  );
}

export default ListarVendas;
