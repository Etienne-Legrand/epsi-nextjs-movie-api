import Movie from "@/types/interfaces/Movie";
import React from "react";
import { StarIcon, ClockIcon } from "./icons";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie: { title, plot, poster, year, imdb, runtime },
}) => {
  return (
    <div className="group rounded-xl max-w-[370px] shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 flex flex-col overflow-hidden transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={poster}
          width="375"
          height="200"
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-bold text-xl line-clamp-2 text-gray-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
            {title}
          </h3>
          <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">({year})</span>
          <div className="mt-3 h-20">
            <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {plot}
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
