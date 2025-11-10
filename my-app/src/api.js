// api.js - helper central para chamadas à API
const BASE_URL = "https://marketsystem-g01s.onrender.com"; // <<-- coloque a URL do Render aqui

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    let body = null;
    try { body = JSON.parse(text); } catch {}
    const err = new Error(body?.message || res.statusText || "Erro na requisição");
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return res.status === 204 ? null : res.json();
}

export default {
  createSeller: (data) => request("/api/sellers", { method: "POST", body: JSON.stringify(data) }),
  activateSeller: (data) => request("/api/sellers/activate", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => request("/api/auth/login", { method: "POST", body: JSON.stringify(data) }),
  createProduct: (data) => request("/api/products", { method: "POST", body: JSON.stringify(data) }),
  listProducts: () => request("/api/products"),
  getProduct: (id) => request(`/api/products/${id}`),
  updateProduct: (id, data) => request(`/api/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  inactivateProduct: (id) => request(`/api/products/${id}/inactivate`, { method: "PATCH" }),
  createSale: (data) => request("/api/sales", { method: "POST", body: JSON.stringify(data) }),
};
