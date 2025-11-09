import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/services/api";
import ProductsTab from "../dashboard/ProductsTab";
import SalesTab from "../dashboard/SalesTab";
import ProfileTab from "../dashboard/ProfileTab";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    revenue: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user && seller) {
      loadStats();
    }
  }, [user, seller]);

  async function checkUser() {
    try {
      const userData = await api.getUser();
      
      if (!userData) {
        navigate("/");
        return;
      }

      setUser(userData);

      const sellerData = await api.getSeller(userData.id);
      setSeller(sellerData);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }

  async function loadStats() {
    if (!seller) return;

    try {
      const produtos = await api.getProdutos(seller.id);
      const vendas = await api.getVendas(seller.id);

      const revenue = vendas.reduce((sum, sale) => sum + Number(sale.valor_total), 0);

      setStats({
        totalProducts: produtos.length,
        totalSales: vendas.length,
        revenue,
      });
    } catch (error) {
      console.log("Erro ao carregar estatísticas:", error);
    }
  }

  async function logout() {
    try {
      await api.logout();
      toast.success("Logout realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao fazer logout");
    }
  }

  if (!user || !seller) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-title">Mini Mercado - {seller.nome}</h1>
          <button onClick={logout} className="dashboard-logout">
            Sair
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total de Produtos</span>
              <span className="stat-icon">📦</span>
            </div>
            <div className="stat-value">{stats.totalProducts}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total de Vendas</span>
              <span className="stat-icon">🛒</span>
            </div>
            <div className="stat-value">{stats.totalSales}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Faturamento</span>
              <span className="stat-icon">📈</span>
            </div>
            <div className="stat-value">R$ {stats.revenue.toFixed(2)}</div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="tabs-container">
            <div className="tabs-list">
              <button
                className={`tab-button ${activeTab === "products" ? "active" : ""}`}
                onClick={() => setActiveTab("products")}
              >
                📦 Produtos
              </button>
              <button
                className={`tab-button ${activeTab === "sales" ? "active" : ""}`}
                onClick={() => setActiveTab("sales")}
              >
                🛒 Vendas
              </button>
              <button
                className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                👤 Perfil
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "products" && (
                <ProductsTab sellerId={seller.id} onUpdate={loadStats} />
              )}
              {activeTab === "sales" && (
                <SalesTab sellerId={seller.id} onUpdate={loadStats} />
              )}
              {activeTab === "profile" && (
                <ProfileTab seller={seller} onUpdate={checkUser} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
