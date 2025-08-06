import axios from "axios";
import Movie from "@/types/interfaces/Movie";
import Comment from "@/types/interfaces/Comment";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function MovieDetail() {
  const router = useRouter();
  const { idMovie } = router.query;
  const [movie, setMovie] = useState({} as Movie);
  const [comments, setComments] = useState([] as Comment[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      if (!idMovie) return;
      try {
        const response = await axios.get(`/api/movie/${idMovie}`);
        const result = response.data;
        setMovie(result.data);
      } catch (error: any) {
        setError(
          `Une erreur s'est produite lors du chargement du film. (${error.message})`
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      if (!idMovie) return;
      try {
        const response = await axios.get(`/api/movie/${idMovie}/comments`);
        const result = response.data;
        setComments(result.data);
        console.log(result.data);
      } catch (error: any) {
        setError(
          `Une erreur s'est produite lors du chargement des commentaires. (${error.message})`
        );
      }
    };

    fetchMovies();
    fetchComments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
      <div className="container mx-auto px-6 py-8">
        {/* Bouton retour */}
        <Link
          href="/movies"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 text-gray-950 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 font-medium mb-8"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M19 12H5M12 19L5 12L12 5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Retour aux films
        </Link>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image du film */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <img 
                src={movie?.poster} 
                alt={movie?.title} 
                className="w-full max-w-md mx-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>

          {/* Informations du film */}
          <div className="lg:col-span-2 space-y-8">
            {/* En-tête */}
            <div className="bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-xl p-8">
              <h1 className="text-4xl font-bold text-gray-950 dark:text-white mb-4">
                {movie?.title}
              </h1>
              
              {/* Métadonnées */}
              <div className="flex flex-wrap gap-4 mb-6">
                {movie?.year && (
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    {movie.year}
                  </span>
                )}
                {movie?.rated && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                    {movie.rated}
                  </span>
                )}
                {movie?.runtime && (
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
                  </span>
                )}
                {movie?.imdb?.rating && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="currentColor"/>
                    </svg>
                    {movie.imdb.rating}
                  </div>
                )}
              </div>

              {/* Synopsis */}
              <div>
                <h3 className="text-lg font-semibold text-gray-950 dark:text-white mb-3">Synopsis</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {movie?.fullplot || movie?.plot}
                </p>
              </div>
            </div>

            {/* Détails */}
            <div className="grid sm:grid-cols-2 gap-6">
              {movie?.genres && listSection("Genres", movie.genres)}
              {movie?.languages && listSection("Langues", movie.languages)}
              {movie?.directors && listSection("Réalisateurs", movie.directors)}
              {movie?.cast && listSection("Acteurs principaux", movie.cast?.slice(0, 8))}
            </div>
          </div>
        </div>

        {/* Section commentaires */}
        <div className="mt-12">
          <div className="bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-6">
              Commentaires ({comments.length})
            </h2>

            {comments.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">💬</div>
                <p className="text-gray-500 dark:text-gray-400">Aucun commentaire pour ce film</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      "{comment.text}"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {comment.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {comment.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function listSection(title: string, items: string[]) {
    return (
      <div className="bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-950 dark:text-white mb-3">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {items?.slice(0, 6).map((item, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
          {items?.length > 6 && (
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-full text-sm">
              +{items.length - 6} autres
            </span>
          )}
        </div>
      </div>
    );
  }

  function list(title: string, items: string[]) {
    return (
      <div className="mt-12">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="mt-2 text-gray-600">{items?.join(", ")}</p>
      </div>
    );
  }
}
