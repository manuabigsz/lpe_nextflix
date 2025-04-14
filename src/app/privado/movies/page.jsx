import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';
import { getVideosDB, deleteVideoDB } from '@/bd/usecases/videoUseCases';
import VideoClient from './video_client';

export const dynamic = 'force-dynamic';

export default async function Video() {
  const videos = await getVideosDB();

  async function deleteVideo(id) {
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
    <Suspense fallback={<Loading />}>
      <VideoClient videos={videos} onDelete={deleteVideo} />
    </Suspense>
  );
}