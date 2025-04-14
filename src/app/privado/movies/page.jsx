import { Button } from 'react-bootstrap';
import { Suspense } from 'react';
import Link from 'next/link';
import { getVideosDB, deleteVideoDB } from '@/bd/usecases/videoUseCases';
import Loading from '@/componentes/comuns/Loading';

export const dynamic = 'force-dynamic';

export default async function Video() {
    const videos = await getVideosDB();

    const deleteVideo = async (id) => {
        'use server';
        try {
            await deleteVideoDB(id);
        } catch (err) {
            console.log('Erro: ' + err);
            throw new Error('Erro: ' + err);
        }
    }

    return (
        <div className="container py-4">
            <Suspense fallback={<Loading />}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-white">Vídeos</h1>
                    <Link href={`/privado/video/${0}/formulario`} className="btn btn-danger">
                        <i className="bi bi-file-earmark-plus"></i> Novo Vídeo
                    </Link>
                </div>

                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                    {videos.map((video) => (
                        <div key={video.id} className="col">
                            <div className="card bg-dark text-white h-100">
                                <img
                                    src={video.capa_filme}
                                    className="card-img-top"
                                    alt={video.titulo}
                                    style={{ objectFit: 'cover', height: '300px' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{video.titulo}</h5>
                                    <div className="d-flex justify-content-between mt-auto">
                                        <Link href={`/privado/video/${video.id}/formulario`} className="btn btn-info">
                                            Editar
                                        </Link>
                                        <Button
                                            variant="danger"
                                            onClick={() => deleteVideo(video.id)}
                                        >
                                            Excluir
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Suspense>
        </div>
    );
}
