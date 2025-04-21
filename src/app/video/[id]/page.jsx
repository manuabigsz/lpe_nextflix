import { getVideoPorIdDB } from "@/bd/usecases/videoUseCase";

export default async function VideoPage({ params }) {
    const { id } = params;
    const video = await getVideoPorIdDB(id);

    if (!video) {
        return (
            <div className="container text-white mt-5">
                <h2>Vídeo não encontrado</h2>
            </div>
        );
    }

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

                {/* Informações + mini player */}
                <div className="col-12 col-md-8">
                    <h1 className="display-5 fw-bold">{video.titulo}</h1>
                    <div className="mb-3">
                        <span className="badge bg-danger text-uppercase me-2">{video.tipo}</span>
                        {video.duracao && (
                            <span className="text-muted small">
                                Duração: {video.duracao} min
                            </span>
                        )}
                    </div>
                    <p className="lead mb-4">
                        {video.descricao || "Sem descrição disponível para este conteúdo."}
                    </p>

                    <ul className="list-unstyled small text-muted mb-4">
                        <li>
                            <strong>Categoria ID:</strong> {video.categoria_id}
                        </li>
                        <li>
                            <strong>Data de Upload:</strong>{" "}
                            {formatarData(video.data_upload)}
                        </li>
                    </ul>

                    {/* Mini player */}
                    {video.url_video ? (
                        <div className="ratio ratio-16x9 rounded overflow-hidden shadow">
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

                    <button className="btn btn-danger mt-4 px-4 py-2">
                        <i className="bi bi-play-fill me-2"></i> Assistir agora
                    </button>
                </div>
            </div>
        </div>
    );
}
