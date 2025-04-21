import { addFavoritoDB } from "@/bd/usecases/favoritoUseCase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
        }
        const formData = await req.formData();
        const video_id = formData.get("video_id");

        if (!video_id) {
            return NextResponse.json({ error: "ID do vídeo é obrigatório" }, { status: 400 });
        }

        const favorito = {
            usuario_id: session.user.id,
            video_id,
        };

        await addFavoritoDB(favorito);

        return NextResponse.redirect(`/video/${video_id}`);
    } catch (err) {
        console.error("Erro ao adicionar favorito:", err);
        return NextResponse.json({ error: "Erro interno ao adicionar favorito" }, { status: 500 });
    }
}
