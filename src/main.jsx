import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Home/Login/Login.jsx";
import Cadastro from "./pages/Home/Cadastro/cadastro.jsx";
import Ativar from "./pages/Home/Cadastro/ativar.jsx";
import "./index.css";
// VERIFIQUE ESTA IMPORTAÇÃO. ELA DEVE APONTAR PARA A PASTA CORRETA.
import Inicio from "./pages/Home/Inicio/inicio.jsx"; 
import CadastroProduto from "./pages/Home/cadastrar_produto/cadastrar_produto.jsx";
import ListarProdutos from "./pages/Home/listar_produto/listar_produto.jsx";
import Venda from "./pages/Home/sale/sale.jsx";
import EditarProduto from "./pages/Home/editar_produto/editar_produto.jsx";
import DetalhesProduto from "./pages/Home/detalhes_produto/detalhes_produto.jsx";
import ListarVendas from "./pages/Home/listar_vendas/listar_vendas.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} /> 
        <Route path="/ativar" element={<Ativar />} />
        {/* ROTA CORRETA PARA O COMPONENTE INICIO */}
        <Route path="/inicio" element={<Inicio />} /> 
        <Route path="/cadastrar_produto" element={<CadastroProduto />} />
        <Route path="/listar_produto" element={<ListarProdutos />} />
        <Route path="/sale" element={<Venda />} />
        <Route path="/produto/editar" element={<EditarProduto />} />
        <Route path="/produto/:id" element={<DetalhesProduto />} />
        <Route path="/listar_vendas" element={<ListarVendas />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);