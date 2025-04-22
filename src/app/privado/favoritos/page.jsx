import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import { getFavoritosPorUsuarioDB } from "@/bd/usecases/favoritoUseCase";
import { getVideoPorIdDB } from "@/bd/usecases/videoUseCase";
import VideoCard from "@/components/VideoCard";

export default async function FavoritosPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return (
            <div className="container text-white mt-5">
                <h2>Você precisa estar logado para ver seus favoritos.</h2>
            </div>
        );
    }

    const favoritos = await getFavoritosPorUsuarioDB(session.user.id);

    if (!favoritos || favoritos.length === 0) {
        return (
            <div className="container text-white mt-5">
                <h2>Você ainda não adicionou nenhum vídeo aos favoritos.</h2>
            </div>
        );
    }

    const videos = await Promise.all(
        favoritos.map(fav => getVideoPorIdDB(fav.video_id))
    );

    const plainVideos = JSON.parse(JSON.stringify(videos));

    return (
        <div className="container text-white mt-5">
            <h2 className="mb-4">Meus Favoritos</h2>
            <div className="row">
                {plainVideos.map((video) => (
                    <div key={video.id} className="col-md-4 mb-4">
                        <VideoCard video={video} />
                    </div>
                ))}
            </div>
        </div>
    );
}
