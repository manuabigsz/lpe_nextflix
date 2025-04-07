import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function MovieList({ filter = 'all' }) {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchMovies = async () => {
  try {
    const response = await fetch('/api/videos');
    const data = await response.json();
    console.log('Dados recebidos da API:', data);  // <-- Verifique se data é um array
    setMovies(Array.isArray(data) ? data : []);  // Garante que seja um array
  } catch (error) {
    console.error('Erro ao carregar vídeos:', error);
  } finally {
    setLoading(false);
  }
};


    fetchMovies();
  }, []);

  const filteredMovies = filter === 'all' ? movies : movies.filter(movie => movie.tipo === filter);

  const handleClick = (id) => {
    router.push(`/movies/${id}`);
  };

  if (loading) {
    return <p className="text-center mt-4">Carregando...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {filteredMovies.length === 0 ? (
          <p className="text-center">Nenhum vídeo encontrado</p>
        ) : (
          filteredMovies.map(movie => (
            <div key={movie.id} className="col-md-3">
              <div 
                className="card shadow-sm border-0 rounded-3 overflow-hidden" 
                onClick={() => handleClick(movie.id)} 
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={movie.image} className="card-img-top" alt={movie.title} style={{ height: '300px', objectFit: 'cover' }} />
                <div className="card-body text-center bg-light">
                  <h6 className="card-title text-dark mb-0">{movie.title}</h6>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
