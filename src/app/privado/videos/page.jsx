
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
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
<Link className='btn btn-primary'
href={`/privado/videos/${0}/formulario`}>
<i className='bi bi-file-earmark-plus'></i> Novo
</Link>
<Table striped bordered hover>
<thead>
<tr>
  <th style={{ textAlign: 'center' }}>Ações</th>
  <th>Capa</th>
  <th>Código</th>
  <th>Título</th>
  <th>Categoria</th>
  <th>Tipo</th>
  <th>Duração</th>
</tr>
</thead>
<tbody>
{videos.map((video) => (
  <tr key={video.id}>
    <td align="center">
      <Link className="btn btn-info" href={`/privado/videos/${video.id}/formulario`}>
        <i className="bi bi-pencil-square"></i>
      </Link>
      <form action={deleteVideo.bind(null, video.id)} className='d-inline'>
        <Button variant="danger" type='submit'>
          <i className="bi bi-trash"></i>
        </Button>
      </form>
      <Link className="btn btn-secondary ms-1" href={`/privado/videos/${video.id}`}>
        <i className="bi bi-eye"></i>
      </Link>
    </td>
    <td>
      <img src={video.capa_filme} alt="Capa" style={{ width: '100px', height: 'auto' }} />
    </td>
    <td>{video.id}</td>
    <td>{video.titulo}</td>
    <td>{video.categoria_id}</td>
    <td>{video.tipo}</td>
    <td>{video.duracao} min</td>
  </tr>
))}
</tbody>

</Table>
</Suspense>
</div>
 )
}