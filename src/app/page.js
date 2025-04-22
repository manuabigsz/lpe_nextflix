import { getVideosDB } from "@/bd/usecases/videoUseCase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import Link from "next/link";
import VideoCard from "@/components/VideoCard";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || session?.user?.email || "usuário";

  const videos = JSON.parse(JSON.stringify(await getVideosDB()));

  const filmes = videos.filter(video => video.tipo === 'filme');
  const series = videos.filter(video => video.tipo === 'serie');

  const SliderSection = ({ title, items }) => (
    <section className="mb-5">
      <h3 className="text-white mb-3">{title}</h3>
      <div className="d-flex overflow-auto gap-3 pb-2">
        {items.map(video => (
          <VideoCard key={video.id} video={video} compact />
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
