import React from "react";
import { Link } from "react-router-dom";
import '../App.css'

export default function Dashboard() {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/products">Meus Produtos</Link></li>
          <li><Link to="/products/new">Cadastrar Produto</Link></li>
          <li><Link to="/sales/new">Registrar Venda</Link></li>
        </ul>
      </nav>
      <p>Relatórios e monitoramento de estoque (implemente gráficos conforme necessidade)</p>
    </div>
  );
}
