'use client'

import { Card, Button, Row, Col } from 'react-bootstrap';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';
import { getVideosDB, deleteVideoDB } from '@/bd/usecases/videoUseCases';

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
        redirect('/privado/movies');
    }

    return (
        <div style={{ padding: '20px' }}>
            <Suspense fallback={<Loading />}>
                <h1>Vídeos</h1>
                <Link className='btn btn-primary mb-4'
                    href={`/privado/video/${0}/formulario`}>
                    <i className='bi bi-file-earmark-plus'></i> Novo
                </Link>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {videos.map((video) => (
                        <Col key={video.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{video.titulo}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Categoria: {video.categoria_id}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>Tipo:</strong> {video.tipo}<br />
                                        <strong>Duração:</strong> {video.duracao} min<br />
                                        <strong>ID:</strong> {video.id}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Link
                                            className="btn btn-info"
                                            href={`/privado/video/${video.id}/formulario`}>
                                            <i className="bi bi-pencil-square"></i> Editar
                                        </Link>
                                        <form action={deleteVideo.bind(null, video.id)} className="d-inline">
                                            <Button variant="danger" type="submit">
                                                <i className="bi bi-trash"></i> Excluir
                                            </Button>
                                        </form>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Suspense>
        </div>
    )
}
