import { NextResponse } from 'next/server';
import { cadastraUsuarioDB } from '@/bd/usecases/usuarioUseCases';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log('[API] Dados recebidos para cadastro:', body);

        const usuario = await cadastraUsuarioDB(body);

        console.log('[API] Usuário cadastrado com sucesso:', usuario);

        return NextResponse.json(usuario, { status: 201 });
    } catch (error) {
        console.error('[API] Erro ao cadastrar usuário:', error);
        return NextResponse.json({ error: 'Erro ao cadastrar usuário no servidor. ', error }, { status: 500 });
    }
}