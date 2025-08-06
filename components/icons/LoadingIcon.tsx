interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

const LoadingIcon: React.FC<IconProps> = ({ 
  width = 8, 
  height = 8, 
  className = "animate-spin rounded-full border-b-2 border-blue-600" 
}) => {
  return (
    <div 
      className={className}
      style={{ width: `${width * 4}px`, height: `${height * 4}px` }}
    />
  );
};

export default LoadingIcon;
