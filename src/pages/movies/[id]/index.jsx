import { useRouter } from 'next/router';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/Header';

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const movies = [
    { id: 1, title: 'Oppenheimer', type: 'movie', image: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/07/19/1448438428-4rjauid3yrcobehe2lr3e7sove.jpg' },
    { id: 2, title: 'Breaking Bad', type: 'series', image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
    { id: 3, title: 'Duna: Parte Dois', type: 'movie', image: 'https://m.media-amazon.com/images/I/51suv2M-k8L._AC_UF1000,1000_QL80_.jpg' },
    { id: 4, title: 'Stranger Things', type: 'series', image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg' }
  ];

  const movie = movies.find(m => m.id.toString() === id);

  if (!movie) {
    return <div className="text-center text-white mt-5">Filme não encontrado.</div>;
  }

  return (
    <div className="bg-dark text-white min-vh-100">
      <Head>
        <title>{movie.title} - Detalhes</title>
      </Head>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <img src={movie.image} className="img-fluid rounded" alt={movie.title} />
          </div>
          <div className="col-md-6">
            <h1 className="fw-bold">{movie.title}</h1>
            <p className="mt-3">Descrição não disponível.</p>
            <button className="btn btn-danger mt-3">Assistir agora</button>
          </div>
        </div>
      </div>
    </div>
  );
}
