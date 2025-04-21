import { NextResponse } from 'next/server';
import { cadastraUsuarioDB } from '@/bd/usecases/usuarioUseCases';

export async function POST(req) {
    try {
        const body = await req.json();

        const usuario = await cadastraUsuarioDB(body);


        return NextResponse.json(usuario, { status: 201 });
    } catch (error) {
        console.error('[API] Erro ao cadastrar usuário:', error);
        return NextResponse.json({ error: 'Erro ao cadastrar usuário no servidor. ', error }, { status: 500 });
    }
}