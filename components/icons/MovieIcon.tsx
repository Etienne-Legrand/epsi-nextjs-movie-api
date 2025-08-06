interface IconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const MovieIcon: React.FC<IconProps> = ({ 
  width = 64, 
  height = 64, 
  className = "text-gray-400 dark:text-gray-500" 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 3V8M21 8H16M21 8L18 5C16.5 3.5 14.5 2.5 12 2.5C7.5 2.5 4 6 4 10.5C4 15 7.5 18.5 12 18.5C13.73 18.5 15.36 17.94 16.71 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6V12L16 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MovieIcon;
