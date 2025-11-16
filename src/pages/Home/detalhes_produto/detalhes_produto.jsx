import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./detalhes_produto.css";

function DetalhesProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await api.get(`/product/${id}`);
        setProduto(response.data.produto || response.data);
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar detalhes do produto!");
      }
    }

    fetchProduto();
  }, [id]);

  if (erro) {
    return (
      <div className="container">
        <p className="erro">{erro}</p>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="container">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="detalhes-produto">
        <h1>Detalhes do Produto</h1>

        <div className="info">
          <p>
            <strong>ID:</strong> {produto.id}
          </p>
          <p>
            <strong>Nome:</strong> {produto.name}
          </p>
          <p>
            <strong>Preço:</strong> R$ {Number(produto.price).toFixed(2)}
          </p>
          <p>
            <strong>Quantidade:</strong> {produto.quantity}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {produto.status === "active" ? "Ativo" : "Inativo"}
          </p>
        </div>

        <div className="botoes">
          <button onClick={() => navigate("/listar_produto")}>Voltar</button>
        </div>
      </div>
    </div>
  );
}

export default DetalhesProduto;