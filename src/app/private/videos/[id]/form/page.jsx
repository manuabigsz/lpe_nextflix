// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getVideoPorIdDB, updateVideoDB } from '@/bd/usecases/videoUseCase';
// import { Button, Form } from 'react-bootstrap';

// export default function EditarVideo({ params }) {
//     const router = useRouter();
//     const [video, setVideo] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             const videoData = await getVideoPorIdDB(params.id);
//             setVideo(videoData);
//         };
//         fetchData();
//     }, [params.id]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const updatedVideo = {
//             id: params.id,
//             titulo: formData.get('titulo'),
//             descricao: formData.get('descricao'),
//             url_video: formData.get('url_video'),
//             categoria_id: formData.get('categoria_id'),
//             duracao: formData.get('duracao'),
//             capa_video: formData.get('capa_video'),
//             tipo: formData.get('tipo'),
//         };

//         try {
//             await updateVideoDB(updatedVideo);
//             router.push('/private/videos');
//         } catch (err) {
//             console.log('Erro ao atualizar o vídeo: ' + err);
//         }
//     };

//     if (!video) return <p>Carregando...</p>;

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Editar Vídeo</h1>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group>
//                     <Form.Label>Título</Form.Label>
//                     <Form.Control type="text" name="titulo" defaultValue={video.titulo} />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Descrição</Form.Label>
//                     <Form.Control type="text" name="descricao" defaultValue={video.descricao} />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>URL do Vídeo</Form.Label>
//                     <Form.Control type="text" name="url_video" defaultValue={video.url_video} />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Código da Categoria</Form.Label>
//                     <Form.Control type="text" name="categoria_id" defaultValue={video.categoria_id} />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Duração</Form.Label>
//                     <Form.Control type="number" name="duracao" defaultValue={video.duracao} />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Capa do Vídeo</Form.Label>
//                     <Form.Control type="text" name="capa_video" defaultValue={video.capa_video} />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Tipo</Form.Label>
//                     <Form.Control type="text" name="tipo" defaultValue={video.tipo} />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">Salvar</Button>
//             </Form>
//         </div>
//     );
// }
