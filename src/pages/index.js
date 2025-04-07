import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "@/components/Header";
import { MovieList } from "@/components/MoviesList";
import { useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="bg-dark text-white min-vh-100">
      <Head>
        <title>Streaming Platform</title>
      </Head>
      <Header />

      <div className="container text-center mt-4">
        <div className="btn-group mb-3">
          <button 
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`} 
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`btn ${filter === 'movies' ? 'btn-primary' : 'btn-secondary'}`} 
            onClick={() => setFilter('movies')}
          >
            Filmes
          </button>
          <button 
            className={`btn ${filter === 'series' ? 'btn-primary' : 'btn-secondary'}`} 
            onClick={() => setFilter('series')}
          >
            Séries
          </button>
        </div>

        <MovieList filter={filter} />
      </div>
    </div>
  );
}
