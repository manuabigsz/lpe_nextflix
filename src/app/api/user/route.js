import { updateUsuarioDB } from '@/bd/usecases/usuarioUseCases';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        const data = await req.json();

        if (data.email !== session.user.email) {
            return NextResponse.json({ error: 'Permissão negada' }, { status: 403 });
        }

        const usuarioAtualizado = await updateUsuarioDB(data);

        return NextResponse.json(usuarioAtualizado);
    } catch (err) {
        console.error('[API] Erro no update:', err);
        return NextResponse.json({ error: 'Erro ao atualizar usuário' }, { status: 500 });
    }
}
