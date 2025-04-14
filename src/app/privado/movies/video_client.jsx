'use client';

import { Button, Card, Row, Col, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import Loading from '@/componentes/comuns/Loading';

export default function VideoClient({ videos, onDelete }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      router.refresh();
    } catch (err) {
      console.log('Erro: ' + err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
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
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleDelete(video.id)}
                  >
                    <i className="bi bi-trash"></i> Excluir
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}