import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./editar_produto.css";

function EditarProduto() {
  const navigate = useNavigate();
  const location = useLocation();
  const produto = location.state?.produto;


  const [formData, setFormData] = useState({
    id: produto?.id || "",
    name: produto?.name || "",
    price: produto?.price || "",
    quantity: produto?.quantity || "",
    status: produto?.status || "active",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/product/${formData.id}`, formData);
      alert("Produto atualizado com sucesso!");
      navigate("/listar_produto");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar produto!");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="editar-produto">
        <h1>Editar Produto</h1>

        <input
          type="text"
          name="name"
          placeholder="Nome do produto"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Preço"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantidade"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>

        <div className="botoes">
          <button type="submit">Salvar Alterações</button>
          <button
            type="button"
            className="cancelar"
            onClick={() => navigate("/listar_produto")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarProduto;