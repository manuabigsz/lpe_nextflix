import Link from 'next/link';

export default function Header() {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-black">
      <Link href="/" passHref legacyBehavior>
        <a className="text-decoration-none">
          <h1 className="text-danger fw-bold m-0">NextFlix</h1>
        </a>
      </Link>

      <nav>
        <ul className="nav">
          <li className="nav-item">
            <Link href="/" className="nav-link text-white">Início</Link>
          </li>
          <li className="nav-item">
            <Link href="/series" className="nav-link text-white">Séries</Link>
          </li>
          <li className="nav-item">
            <Link href="/movies" className="nav-link text-white">Filmes</Link>
          </li>
          <li className="nav-item">
            <Link href="/favorites" className="nav-link text-white">Meus favoritos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
