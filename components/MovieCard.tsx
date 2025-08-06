import Movie from "@/types/interfaces/Movie";
import React from "react";

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
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                    fill="#f59e0b"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {runtime && (
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M12 7V12L14.5 14.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
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
