'use server';

import { deleteVideoDB } from '@/bd/usecases/videoUseCases';
import { redirect } from 'next/navigation';

export async function deleteVideo(id) {
    try {
        await deleteVideoDB(id);
    } catch (err) {
        console.error('Erro ao deletar vídeo:', err);
        throw new Error('Erro ao deletar vídeo');
    }
    redirect('/privado/movies');
}
