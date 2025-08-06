import Movie from "@/types/interfaces/Movie";
import React, { useState } from "react";
import { ImageIcon, StarIcon, ClockIcon } from "./icons";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie: { title, plot, poster, year, imdb, runtime },
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Si pas de poster, on considère qu'il y a une erreur d'image
  const shouldShowFallback = !poster || imageError;
  const shouldShowPlaceholder = poster && !imageLoaded && !imageError;
  
  return (
    <div className="group rounded-xl max-w-[370px] shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 flex flex-col overflow-hidden transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        {shouldShowPlaceholder && (
          <div className="w-full h-80 bg-gray-100 dark:bg-gray-700 flex items-center justify-center animate-pulse">
            <ImageIcon />
          </div>
        )}
        
        {shouldShowFallback ? (
          <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <ImageIcon className="mb-4 text-gray-400 dark:text-gray-500" />
          </div>
        ) : (
          poster && (
            <img
              src={poster}
              width="375"
              height="200"
              className={`w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              alt={title}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          )
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-bold text-xl line-clamp-2 text-gray-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
            {title}
          </h3>
          <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">({year})</span>
          <div className="mt-3 h-20">
            <p className={`line-clamp-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed ${!plot ? 'invisible' : ''}`}>
              {plot || "Texte invisible pour prendre toute la place disponible dans la description."}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-col">
            <span className="text-amber-500 text-xs font-medium uppercase tracking-wide">Note IMDB</span>
            <div className="flex gap-x-1 items-center mt-1">
              <span className="text-2xl font-bold text-gray-950 dark:text-white group-hover:text-amber-500 transition-colors duration-300">
                {imdb?.rating}
              </span>
              <StarIcon />
            </div>
          </div>
          <div className="flex flex-col items-end">
            {runtime && (
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <ClockIcon />
                <span className="text-sm font-medium">
                  {Math.floor(runtime / 60)}h {runtime % 60}min
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
