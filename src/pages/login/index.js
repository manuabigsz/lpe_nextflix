import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  return (
    <div className="bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <Head>
        <title>Login</title>
      </Head>
      <div className="container d-flex justify-content-center">
        <div className="card bg-black p-4 text-white" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">Entrar</h2>
          <form>
            <div className="mb-3">
              <input type="email" className="form-control bg-secondary text-white border-0 p-2" placeholder="Email ou número de telefone" required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control bg-secondary text-white border-0 p-2" placeholder="Senha" required />
            </div>
            <button className="btn btn-danger w-100 fw-bold">Entrar</button>
            <div className="d-flex justify-content-between mt-3">
              <div>
                <input type="checkbox" id="remember" /> <label htmlFor="remember" className="text-muted">Lembre-se de mim</label>
              </div>
              <a href="#" className="text-muted">Precisa de ajuda?</a>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-muted">Novo por aqui? <a href="#" className="text-white">Assine agora.</a></p>
            <p className="text-muted" style={{ fontSize: "0.8rem" }}>Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô. <a href="#" className="text-primary">Saiba mais.</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
