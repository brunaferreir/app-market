import React, { useState } from 'react';

// FormLogin pode receber onSubmit(email, senha)
export default function FormLogin({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Senha</label>
        <input type="password" value={password} onChange={e => setSenha(e.target.value)} required />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
}
