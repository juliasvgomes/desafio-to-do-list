import Link from 'next/link';

export default function Home() {
  return (
    <div className="page">
      <div className="container">
        <div className="card hero">
          <div className="hero-icon" aria-hidden="true">☑</div>
          <p className="eyebrow">Desafio To-Do List</p>
          <h1 className="title">Suas tarefas,<br />sem complicação.</h1>
          <p className="subtitle">
            Anote o que precisa fazer, marque como concluído e acompanhe seu progresso — tudo em um só lugar.
          </p>

          <div className="hero-actions">
            <Link href="/login" className="btn btn--primary">
              Começar agora
            </Link>
            <Link href="/tarefas" className="btn btn--ghost">
              Ver minhas tarefas
            </Link>
          </div>
        </div>

        <p className="meta" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          feito com Next.js + Supabase
        </p>
      </div>
    </div>
  );
}
