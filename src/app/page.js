import { getVideosDB } from "@/bd/usecases/videoUseCase";

export default async function Home() {
  const videos = await getVideosDB();

  const filmes = videos.filter(video => video.tipo === 'filme');
  const series = videos.filter(video => video.tipo === 'serie');

  return (
    <div>
      <h1>Home</h1>

      {filmes.length > 0 && (
        <div>
          <h2>Filmes</h2>
          <div className="row">
            {filmes.map((video) => (
              <div key={video.id} className="col-12 col-md-4 mb-4">
                <div className="card">
                  <img src={video.capa_video} className="card-img-top" alt={video.titulo} />
                  <div className="card-body">
                    <h5 className="card-title">{video.titulo}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {series.length > 0 && (
        <div>
          <h2>Séries</h2>
          <div className="row">
            {series.map((video) => (
              <div key={video.id} className="col-12 col-md-4 mb-4">
                <div className="card">
                  <img src={video.capa_video} className="card-img-top" alt={video.titulo} />
                  <div className="card-body">
                    <h5 className="card-title">{video.titulo}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
