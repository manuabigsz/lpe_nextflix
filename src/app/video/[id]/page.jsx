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

    return (
        <div className="container py-5 text-white">
            <div className="row align-items-center">
                <div className="col-12 col-md-5 mb-4 mb-md-0">
                    <img
                        src={video.capa_video}
                        alt={video.titulo}
                        className="img-fluid rounded shadow"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                </div>
                <div className="col-12 col-md-7">
                    <h1 className="mb-3">{video.titulo}</h1>
                    <span className="badge bg-danger me-2 text-uppercase">
                        {video.tipo}
                    </span>
                    <p className="mt-3" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                        {video.descricao || "Sem descrição disponível para este conteúdo."}
                    </p>
                    <button className="btn btn-primary mt-3">
                        <i className="bi bi-play-fill me-2"></i> Assistir
                    </button>
                </div>
            </div>
        </div>
    );
}
