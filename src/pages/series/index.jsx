import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "@/components/Header";
import { MovieList } from "@/components/MoviesList";
import { useState } from "react";

export default function Series() {

  return (
    <div className="bg-dark text-white min-vh-100">
      <Head>
        <title>Streaming Platform</title>
      </Head>
      <Header />

      <div className="container text-center mt-4">
       

        <MovieList filter={"series"} />
      </div>
    </div>
  );
}
