import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Streaming Platform</title>
      </Head>
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Bem-vindo à Plataforma de Streaming</h1>
        <p className="mt-4">Explore nossos vídeos incríveis.</p>
      </main>
    </div>
  );
}
