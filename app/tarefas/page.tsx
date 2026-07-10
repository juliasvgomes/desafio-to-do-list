'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

type Tarefa = {
  id: string;
  titulo: string;
  concluida: boolean;
  created_at: string;
};

export default function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState<{ id: string; email?: string } | null>(null);

  useEffect(() => {
    async function iniciar() {
      const { data: { user } } = await supabase.auth.getUser();
      setUsuario(user);

      if (!user) {
        setCarregando(false);
        return;
      }

      await buscarTarefas();
    }

    iniciar();
  }, []);

  async function buscarTarefas() {
    const { data, error } = await supabase
      .from('tarefas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar tarefas:', error);
    } else {
      setTarefas(data || []);
    }
    setCarregando(false);
  }

  async function adicionarTarefa(e: React.FormEvent) {
    e.preventDefault();
    if (!novaTarefa.trim() || !usuario) return;

    const { data, error } = await supabase
      .from('tarefas')
      .insert([{ titulo: novaTarefa, user_id: usuario.id }])
      .select();

    if (error) {
      console.error('Erro ao adicionar tarefa:', error);
      return;
    }

    setTarefas((atuais) => [...(data || []), ...atuais]);
    setNovaTarefa('');
  }

  async function marcarComoConcluida(id: string, statusAtual: boolean) {
    const { error } = await supabase
      .from('tarefas')
      .update({ concluida: !statusAtual })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar tarefa:', error);
      return;
    }

    setTarefas((atuais) =>
      atuais.map((t) => (t.id === id ? { ...t, concluida: !statusAtual } : t))
    );
  }

  async function sair() {
    await supabase.auth.signOut();
    setUsuario(null);
    setTarefas([]);
  }

  if (carregando) {
    return (
      <div className="page">
        <p className="loading">Carregando...</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="page">
        <div className="container">
          <div className="card card--center">
            <p className="eyebrow">Acesso restrito</p>
            <h1 className="title" style={{ fontSize: '1.5rem' }}>Faça login primeiro</h1>
            <p className="message" style={{ margin: '1rem 0 1.5rem' }}>
              Você precisa estar logado para ver e gerenciar suas tarefas.
            </p>
            <Link href="/login" className="btn btn--accent">
              Ir para o login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const concluidas = tarefas.filter((t) => t.concluida).length;
  const total = tarefas.length;
  const progresso = total > 0 ? (concluidas / total) * 100 : 0;

  return (
    <div className="page page--top">
      <div className="container container--wide">
        <div className="topbar">
          <Link href="/" className="eyebrow" style={{ textDecoration: 'none' }}>
            ← Início
          </Link>
          <button onClick={sair} className="btn btn--ghost btn--sm">
            Sair
          </button>
        </div>

        <div className="header">
          <p className="eyebrow">Sua lista</p>
          <h1 className="title">Minhas Tarefas</h1>
          <p className="meta">{usuario.email}</p>

          {total > 0 && (
            <div className="progress-wrap">
              <div className="progress-label">
                <span>Progresso</span>
                <span>{concluidas} de {total} concluídas</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progresso}%` }} />
              </div>
            </div>
          )}
        </div>

        <form className="form-row section" onSubmit={adicionarTarefa}>
          <input
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="O que você precisa fazer?"
            className="input"
          />
          <button type="submit" className="btn btn--primary">
            Adicionar
          </button>
        </form>

        {tarefas.length === 0 ? (
          <div className="empty">
            Nenhuma tarefa por aqui ainda.<br />
            <span style={{ opacity: 0.6 }}>Adicione a primeira acima ↑</span>
          </div>
        ) : (
          <ul className="task-list">
            {tarefas.map((tarefa) => (
              <li
                key={tarefa.id}
                className={`task-item${tarefa.concluida ? ' done' : ''}`}
              >
                <input
                  type="checkbox"
                  className="task-check"
                  checked={tarefa.concluida}
                  onChange={() => marcarComoConcluida(tarefa.id, tarefa.concluida)}
                  aria-label={`Marcar "${tarefa.titulo}" como concluída`}
                />
                <span className={`task-text${tarefa.concluida ? ' done' : ''}`}>
                  {tarefa.titulo}
                </span>
                {tarefa.concluida && (
                  <span className="task-stamp">FEITO</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
