import CredentialsProvider from "next-auth/providers/credentials";
import { autenticaUsuarioDB } from "@/bd/usecases/usuarioUseCases";

export const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 1800,
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                senha: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.senha) {
                    return null;
                }

                let usuario = null;
                try {
                    usuario = await autenticaUsuarioDB(credentials);
                } catch (err) {
                    return null;
                }

                if (!usuario) {
                    return null;
                }
                return {
                    tipo: usuario.tipo ?? "user",
                    id: usuario.email,
                    email: usuario.email,
                    name: usuario.nome,
                    plano: usuario.plano || 'gratis',
                    randomKey: parseInt(Math.random() * 9999)
                }
            },
        }),
    ],
    callbacks: {

        async jwt({ token, user, trigger, session }) {

            if (user) {
                token.name = user.name;
                token.plano = user.plano;
                token.tipo = user.tipo;
                token.id = user.id;
                token.randomKey = user.randomKey;
            }

            if (trigger === 'update' && session?.user) {

                if (session.user.name) token.name = session.user.name;
                if (session.user.plano) token.plano = session.user.plano;
            }

            return token;
        },

        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    plano: token.plano,
                    tipo: token.tipo,
                    randomKey: token.randomKey,
                },
            };
        }
    },
};