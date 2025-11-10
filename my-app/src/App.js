import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import SellerRegister from "./pages/SellerRegister";
import ActivateSeller from "./pages/ActivateSeller";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import ProductDetails from "./pages/ProductDetails";
import CreateSale from "./pages/CreateSale";


import "./App.css";
import "./pages/Form.css";
import "./pages/Table.css";


function App() {
  return (
    <AuthProvider>
      <Router>
        <header>
          <h1>App Market</h1>
          <nav>
            <Link to="/">Home</Link>{" | "}
            <Link to="/login">Login</Link>{" | "}
            <Link to="/register">Cadastrar</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<div>Bem-vindo ao App Market</div>} />
            <Route path="/register" element={<SellerRegister />} />
            <Route path="/activate" element={<ActivateSeller />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
            <Route path="/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
            <Route path="/products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
            <Route path="/products/:id/edit" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />

            <Route path="/sales/new" element={<ProtectedRoute><CreateSale /></ProtectedRoute>} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
