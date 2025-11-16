import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./listar_produto.css";

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get("/product");
        setProdutos(response.data.produtos || []);
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar produtos!");
      }
    }
    fetchProdutos();
  }, []);

  const handleVerDetalhes = (id) => {
    navigate(`/produto/${id}`);
  };

  const handleEditar = (produto) => {
    navigate(`/produto/editar`, { state: { produto } });
  };

  const handleInativar = async (id) => {
    if (window.confirm("Tem certeza que deseja inativar este produto?")) {
      try {
        await api.put(`/product/${id}`, { status: "inactive" });
        alert("Produto inativado com sucesso!");
        setProdutos((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: "inactive" } : p))
        );
      } catch (error) {
        console.error(error);
        alert("Erro ao inativar produto!");
      }
    }
  };

  return (
    <div className="container">
      <div className="lista-produtos">
        <h1>Meus Produtos</h1>

        {erro && <p className="erro">{erro}</p>}

        {produtos.length === 0 ? (
          <p className="erro">Nenhum produto encontrado.</p>
        ) : (
          produtos.map((produto) => (
            <div key={produto.id} className="produto-item">
              <div className="produto-info">
                {/* Foto do produto */}
                {produto.image_url ? (
                  <img
                    src={produto.image_url}
                    alt={produto.name}
                    className="produto-imagem"
                  />
                ) : (
                  <div className="imagem-placeholder">📦</div>
                )}
                <span
                  className={
                    produto.status === "inactive" ? "inativo" : "ativo"
                  }
                >
                  {produto.name}
                </span>
              </div>

              <div className="botoes">
                <button onClick={() => handleEditar(produto)}>Editar</button>
                <button
                  className="inativar"
                  onClick={() => handleInativar(produto.id)}
                  disabled={produto.status === "inactive"}
                >
                  {produto.status === "inactive" ? "Inativo" : "Inativar"}
                </button>
                <button onClick={() => handleVerDetalhes(produto.id)}>
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div>
        <button className="botao-voltar" onClick={() => navigate("/inicio")}>
          ← Voltar
        </button>
      </div>
    </div>
  );
}

export default ListarProdutos;
