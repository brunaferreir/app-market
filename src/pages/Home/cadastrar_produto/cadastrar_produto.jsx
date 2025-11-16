  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import api from "../../../services/api";
  import "./cadastrar_produto.css";

  function CadastroProduto() {
    const [formData, setFormData] = useState({
      name: "",
      price: "",
      quantity: "",
      status: "active",
    });
    const [imageFile, setImageFile] = useState(null);

    const navigate = useNavigate();

    function handleChange(e) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleFileChange(e) {
      setImageFile(e.target.files[0]);
    }

    async function handleSubmit(e) {
      e.preventDefault();

      try {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("quantity", formData.quantity);
        data.append("status", formData.status);
        if (imageFile) {
          data.append("image", imageFile); 
        }

        const response = await api.post("/product", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Produto cadastrado com sucesso!");
        console.log(response.data);

        navigate("/inicio");
      } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar produto!");
      }
    }

    return (
      <div className="container">
        <div className="form-card">
        <form onSubmit={handleSubmit}>
          <h1>Cadastrar Produto</h1>

          <input
            name="name"
            placeholder="Nome do produto"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Preço"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            name="quantity"
            type="number"
            placeholder="Quantidade"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button type="submit">Confirmar</button>
        
        </form>
          </div>

        <div>
          <button className="botao-voltar" onClick={() => navigate("/inicio")}>
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  export default CadastroProduto;
