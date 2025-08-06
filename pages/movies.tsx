import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import Movie from "@/types/interfaces/Movie";
import Link from "next/link";
import { LoadingIcon, ArrowLeftIcon } from "@/components/icons";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/movies");
        const result = response.data;
        setMovies(result.data);
      } catch (error: any) {
        setError(
          `Une erreur s'est produite lors du chargement des films. (${error.message})`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <LoadingIcon />
          <span className="text-lg font-medium text-gray-800 dark:text-gray-200">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 max-w-md mx-4">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-gray-800 dark:text-gray-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-950 dark:text-white mb-4">
            Collection de Films
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Découvrez notre sélection de 50 films aléatoires
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {movies.map((movie: Movie) => (
            <Link 
              key={movie._id} 
              href={`/movie/${movie._id}`}
              className="transition-transform duration-200 hover:scale-105"
            >
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 text-gray-950 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            <ArrowLeftIcon />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Movies;
