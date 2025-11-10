import React, { useState } from 'react';

// FormLogin pode receber onSubmit(email, senha)
export default function FormLogin({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, senha);
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
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
}
