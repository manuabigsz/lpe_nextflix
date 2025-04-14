import { Button, Card, Row, Col, Badge } from 'react-bootstrap';
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Vídeos</h1>
          <Link className='btn btn-primary'
            href={`/privado/video/${0}/formulario`}>
            <i className='bi bi-file-earmark-plus'></i> Novo
          </Link>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {videos.map((video) => (
            <Col key={video.id}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg="secondary">ID: {video.id}</Badge>
                    <Badge bg="info">{video.duracao} min</Badge>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{video.titulo}</Card.Title>
                  <Card.Text>
                    <strong>Categoria:</strong> {video.categoria_id}
                    <br />
                    <strong>Tipo:</strong> {video.tipo}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-top-0">
                  <div className="d-flex justify-content-between">
                    <Link className="btn btn-info btn-sm"
                      href={`/privado/video/${video.id}/formulario`}>
                      <i className="bi bi-pencil-square"></i> Editar
                    </Link>
                    <form
                      action={deleteVideo.bind(null, video.id)}
                      className='d-inline'>
                      <Button variant="danger" size="sm" type='submit'>
                        <i className="bi bi-trash"></i> Excluir
                      </Button>
                    </form>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Suspense>
    </div>
  )
}