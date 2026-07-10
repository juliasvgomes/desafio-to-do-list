'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setErro('');
    setCarregando(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/tarefas`,
      },
    });

    setCarregando(false);

    if (error) {
      setErro('Erro ao enviar link: ' + error.message);
    } else {
      setEnviado(true);
    }
  }

  if (enviado) {
    return (
      <div className="page">
        <div className="container">
          <div className="card card--center">
            <p className="eyebrow">Quase lá</p>
            <h1 className="title" style={{ fontSize: '1.5rem' }}>Verifique seu e-mail</h1>
            <p className="message" style={{ marginTop: '1rem' }}>
              Enviamos um link de login para <strong>{email}</strong>.
              Clique no link para acessar suas tarefas.
            </p>
            <hr className="divider" />
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => { setEnviado(false); setEmail(''); }}
            >
              Usar outro e-mail
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <Link href="/" className="eyebrow" style={{ textDecoration: 'none' }}>
            ← Voltar
          </Link>
          <h1 className="title">Entrar</h1>
          <p className="subtitle">
            Sem senha — enviamos um link mágico para o seu e-mail.
          </p>
        </div>

        <div className="card">
          <form className="form" onSubmit={fazerLogin}>
            <div>
              <label htmlFor="email" className="eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Seu e-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="input"
                required
                autoFocus
              />
            </div>

            {erro && <p className="error">{erro}</p>}

            <button type="submit" className="btn btn--primary" disabled={carregando}>
              {carregando ? 'Enviando...' : 'Enviar link de login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
