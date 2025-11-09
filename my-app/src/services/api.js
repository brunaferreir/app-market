// src/services/api.js
export const API_URL = "http://127.0.0.1:5000"; // coloque seu backend aqui

export async function apiGet(route) {
  const response = await fetch(`${API_URL}${route}`);
  return response.json();
}

export async function apiPost(route, body) {
  const response = await fetch(`${API_URL}${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
}
