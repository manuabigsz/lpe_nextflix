import { getVideosDB } from "@/bd/usecases/videoUseCase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
export default async function Home() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || session?.user?.email || "usuário";

  const videos = await getVideosDB();
  const filmes = videos.filter(video => video.tipo === 'filme');
  const series = videos.filter(video => video.tipo === 'serie');

  const SliderSection = ({ title, items }) => (
    <section className="mb-5">
      <h3 className="text-white mb-3">{title}</h3>
      <div className="d-flex overflow-auto gap-3 pb-2">
        {items.map(video => (
          <div
            key={video.id}
            className="card bg-dark text-white border-0"
            style={{
              minWidth: "200px",
              maxWidth: "200px",
              flex: "0 0 auto",
              transition: "transform 0.3s ease",
            }}
          >
            <img
              src={video.capa_video}
              className="card-img-top"
              alt={video.titulo}
              style={{ height: "280px", objectFit: "cover" }}
            />
            <div className="card-body px-2 py-3">
              <h6 className="card-title text-truncate">{video.titulo}</h6>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="container-fluid px-4 py-4 bg-black min-vh-100">
      <h1 className="text-white mb-5">Bem-vindo de volta, {userName}!</h1>
      {filmes.length > 0 && <SliderSection title="Filmes" items={filmes} />}
      {series.length > 0 && <SliderSection title="Séries" items={series} />}
    </div>
  );
}
