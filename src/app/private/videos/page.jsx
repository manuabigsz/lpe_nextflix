import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getVideosDB, deleteVideoDB } from '@/bd/usecases/videoUseCase';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '@/components/comuns/Loading';
export const dynamic = 'force-dynamic';

export default async function Videos() {

    const videos = await getVideosDB();

    const deleteVideo = async (id) => {
        'use server';
        try {
            await deleteVideoDB(id);
        } catch (err) {
            console.log('Erro: ' + err);
            throw new Error('Erro: ' + err);
        }
        redirect('/private/videos');
    }

    return (
        <div style={{ padding: '20px' }}>
            <Suspense fallback={<Loading />}>
                <h1>Vídeos</h1>
                <Link className='btn btn-primary' href={`/private/videos/0/form`}>
                    <i className='bi bi-file-earmark-plus'></i> Novo
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>Capa</th>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Categoria</th>
                            <th>Tipo</th>
                            <th>Duração</th>
                            <th>Data de Upload</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video) => (
                            <tr key={video.id}>
                                <td align="center">
                                    {/* Editar vídeo */}
                                    <Link className="btn btn-info" href={`/private/videos/${video.id}/form`}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>

                                    {/* Excluir vídeo */}
                                    <form action={deleteVideo.bind(null, video.id)} className="d-inline">
                                        <Button variant="danger" type="submit">
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </form>
                                </td>

                                {/* Imagem da capa */}
                                <td>
                                    {video.capa_video ? (
                                        <img
                                            src={video.capa_video}
                                            alt={`Capa de ${video.titulo}`}
                                            style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <span>Sem capa</span>
                                    )}
                                </td>

                                <td>{video.id}</td>
                                <td>{video.titulo}</td>
                                <td>{video.categoria_id}</td>
                                <td>{video.tipo}</td>
                                <td>{video.duracao}</td>
                                <td>{new Date(video.data_upload).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Suspense>
        </div>
    );
}
