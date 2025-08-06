interface IconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const ClockIcon: React.FC<IconProps> = ({ 
  width = 16, 
  height = 16, 
  className = "flex-shrink-0" 
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
  );
};

export default ClockIcon;
