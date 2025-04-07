import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-vh-100">
      
      <div className="d-flex flex-column justify-content-center align-items-center text-center py-5" style={{ backgroundImage: "url('/netflix-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", height: "90vh" }}>
        <h1 className="display-3 fw-bold">Filmes, séries e muito mais. Sem limites.</h1>
        <h4 className="mt-3">Assista onde quiser. Cancele quando quiser.</h4>
        <p className="mt-2">Pronto para assistir? Informe seu email para criar ou reiniciar sua assinatura.</p>
        <div className="d-flex">
          <input type="email" className="form-control me-2" placeholder="Email" style={{ maxWidth: "300px" }} />
          <button className="btn btn-danger">Vamos lá</button>
        </div>
      </div>
      
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold">Aproveite na TV.</h2>
            <p>Assista em Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, aparelhos de Blu-ray e outros dispositivos.</p>
          </div>
          <div className="col-md-6 text-center">
            <img src="/tv.png" alt="TV" className="img-fluid" />
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-md-6">
            <h2 className="fw-bold">Baixe séries para assistir offline.</h2>
            <p>Salve seus títulos favoritos e sempre tenha algo para assistir.</p>
          </div>
          <div className="col-md-6 text-center">
            <img src="/mobile.jpg" alt="Mobile" className="img-fluid" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-dark">
        <p className="text-muted">Netflix Clone - Feito para fins educacionais</p>
      </footer>
    </div>
  );
}
