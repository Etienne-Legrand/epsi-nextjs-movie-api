import axios from "axios";
import Movie from "@/types/interfaces/Movie";
import Comment from "@/types/interfaces/Comment";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { LoadingIcon, ArrowLeftIcon, StarIcon, ImageIcon } from "@/components/icons";

export default function MovieDetail() {
  const router = useRouter();
  const { idMovie } = router.query;
  const [movie, setMovie] = useState({} as Movie);
  const [comments, setComments] = useState([] as Comment[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

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
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Bouton retour */}
        <Link
          href="/movies"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 text-gray-950 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 font-medium mb-8"
        >
          <ArrowLeftIcon />
          Retour aux films
        </Link>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image du film */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {movie?.poster && !imageError ? (
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="w-full max-w-md mx-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full max-w-md mx-auto h-[540px] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                  <ImageIcon width={64} height={64} className="mb-4 text-gray-400 dark:text-gray-500" />
                </div>
              )}
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
                    <StarIcon width={16} height={16} />
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
