import { getVideoPorIdDB } from "@/bd/usecases/videoUseCase";
import { getCategoriaPorCodigoDB } from "@/bd/usecases/categoriaUseCase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";

export default async function VideoPage({ params }) {
    const { id } = params;
    const session = await getServerSession(authOptions);

    const video = await getVideoPorIdDB(id);
    if (!video) {
        return (
            <div className="container text-white mt-5">
                <h2>Vídeo não encontrado</h2>
            </div>
        );
    }

    const categoria = await getCategoriaPorCodigoDB(video.categoria_id);

    const formatarData = (dataStr) => {
        const data = new Date(dataStr);
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };


    return (
        <div className="container-fluid bg-black text-white py-5 px-3 px-md-5 min-vh-100">
            <div className="row gy-4 align-items-start">
                {/* Capa do vídeo */}
                <div className="col-12 col-md-4">
                    <img
                        src={video.capa_video}
                        alt={video.titulo}
                        className="img-fluid rounded shadow"
                        style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    />
                </div>

                {/* Info + mini player */}
                <div className="col-12 col-md-8">
                    <h1 className="display-5 fw-bold">{video.titulo}</h1>
                    <div className="mb-3 d-flex align-items-center flex-wrap gap-3">
                        <span className="badge bg-danger text-uppercase">{video.tipo}</span>
                        {video.duracao && (
                            <span className="text-secondary small">
                                Duração: {video.duracao} min
                            </span>
                        )}
                        {categoria && (
                            <span className="text-secondary small">
                                Categoria: {categoria.nome}
                            </span>
                        )}
                        <span className="text-secondary small">
                            Data de Upload: {formatarData(video.data_upload)}
                        </span>
                    </div>

                    <p className="lead mb-4">
                        {video.descricao || "Sem descrição disponível para este conteúdo."}
                    </p>

                    {/* Mini player */}
                    {video.url_video ? (
                        <div className="ratio ratio-16x9 rounded overflow-hidden shadow mb-4">
                            <iframe
                                src={video.url_video}
                                title={video.titulo}
                                allowFullScreen
                                className="border-0"
                            ></iframe>
                        </div>
                    ) : (
                        <p className="text-warning">Vídeo não disponível.</p>
                    )}

                    {/* Botões */}
                    <div className="d-flex gap-3 flex-wrap">
                        <button className="btn btn-danger px-4 py-2">
                            <i className="bi bi-play-fill me-2"></i> Assistir agora
                        </button>

                        {session && (
                            <form method="POST" action={`/api/favoritos`}>
                                <input type="hidden" name="video_id" value={video.id} />
                                <button type="submit" className="btn btn-outline-light px-4 py-2">
                                    <i className="bi bi-heart me-2"></i> Adicionar aos Favoritos
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
