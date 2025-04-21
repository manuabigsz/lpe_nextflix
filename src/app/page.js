import { getVideosDB } from "@/bd/usecases/videoUseCase";

export default async function Home() {
  const videos = await getVideosDB();

  const filmes = videos.filter(video => video.tipo === 'filme');
  const series = videos.filter(video => video.tipo === 'serie');

  const Card = ({ video }) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={video.capa_video}
          className="card-img-top"
          alt={video.titulo}
          style={{ height: '280px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title text-center">{video.titulo}</h5>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-light">Home</h1>

      {filmes.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-3 text-light">Filmes</h2>
          <div className="row">
            {filmes.map((video) => (
              <Card key={video.id} video={video} />
            ))}
          </div>
        </section>
      )}

      {series.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-3 text-light">Séries</h2>
          <div className="row">
            {series.map((video) => (
              <Card key={video.id} video={video} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
