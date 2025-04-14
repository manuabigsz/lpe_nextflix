
import { getVideoPorIdDB } from '@/bd/usecases/videoUseCases';
import { notFound } from 'next/navigation';

export default async function DetalheVideo({ params }) {
  const { id } = params;
  const video = await getVideoPorIdDB(id);

  if (!video) return notFound();

  return (
    <div style={{ padding: '20px' }}>
      <h1>{video.titulo}</h1>
      <img src={video.capa_filme} alt="Capa do Filme" style={{ maxWidth: '300px', marginBottom: '20px' }} />
      <p><strong>Descrição:</strong> {video.descricao}</p>
      <p><strong>Categoria:</strong> {video.categoria_id}</p>
      <p><strong>Duração:</strong> {video.duracao} min</p>
      <p><strong>Tipo:</strong> {video.tipo}</p>
      <p><strong>Data de Upload:</strong> {new Date(video.data_upload).toLocaleDateString()}</p>
      <h3>Prévia do Vídeo:</h3>
      <video width="640" height="360" controls>
        <source src={video.url_video} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
    </div>
  );
}
