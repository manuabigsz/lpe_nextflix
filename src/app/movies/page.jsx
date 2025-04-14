import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "@/componentes/Header";

export default function Movies() {

  return (
    <div className="bg-dark text-white min-vh-100">
      <Head>
        <title>Streaming Platform</title>
      </Head>
      <Header />

      <div className="container text-center mt-4">
        Movies
      </div>
    </div>
  );
}
