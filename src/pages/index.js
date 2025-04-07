import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className="bg-dark text-white min-vh-100">
      <Head>
        <title>Streaming Platform</title>
      </Head>
      <header className="d-flex justify-content-between align-items-center p-3 bg-black">
        <h1 className="text-danger fw-bold">NexFlix</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item"><a href="#" className="nav-link text-white">Início</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">Séries</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">Filmes</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">Minha Lista</a></li>
          </ul>
        </nav>
      </header>
      <main className="container text-center py-5">
        <h2 className="display-4 fw-bold">Bem-vindo à NexFlix</h2>
        <p className="lead">Explore os melhores filmes e séries.</p>
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="card bg-secondary">
              <img src="/placeholder.jpg" className="card-img-top" alt="Filme 1" />
              <div className="card-body text-center">
                <p className="card-text">Filme 1</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-secondary">
              <img src="/placeholder.jpg" className="card-img-top" alt="Filme 2" />
              <div className="card-body text-center">
                <p className="card-text">Filme 2</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-secondary">
              <img src="/placeholder.jpg" className="card-img-top" alt="Filme 3" />
              <div className="card-body text-center">
                <p className="card-text">Filme 3</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-secondary">
              <img src="/placeholder.jpg" className="card-img-top" alt="Filme 4" />
              <div className="card-body text-center">
                <p className="card-text">Filme 4</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
