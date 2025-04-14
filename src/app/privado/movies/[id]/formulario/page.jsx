'use client'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { addVideoDB } from '@/bd/usecases/videoUseCases';

export default function VideoFormulario() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [url_video, setUrlVideo] = useState('');
    const [categoria_id, setCategoriaId] = useState('');
    const [duracao, setDuracao] = useState('');
    const [tipo, setTipo] = useState('');
    const [capa_filme, setCapaFilme] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addVideoDB({
                titulo,
                descricao,
                url_video,
                categoria_id,
                duracao,
                tipo,
                capa_filme
            });
            router.push('/privado/video'); // Redireciona após adicionar
        } catch (err) {
            console.error('Erro: ' + err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Adicionar Novo Vídeo</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>URL do Vídeo</Form.Label>
                    <Form.Control
                        type="text"
                        value={url_video}
                        onChange={(e) => setUrlVideo(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ID da Categoria</Form.Label>
                    <Form.Control
                        type="text"
                        value={categoria_id}
                        onChange={(e) => setCategoriaId(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Duração (min)</Form.Label>
                    <Form.Control
                        type="number"
                        value={duracao}
                        onChange={(e) => setDuracao(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tipo (Filme ou Série)</Form.Label>
                    <Form.Control
                        type="text"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Capa do Filme</Form.Label>
                    <Form.Control
                        type="text"
                        value={capa_filme}
                        onChange={(e) => setCapaFilme(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Salvar</Button>
            </Form>
        </div>
    );
}
