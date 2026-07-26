import { CSSProperties, ReactNode } from "react";

interface IconProps {
  size?: string;
  color?: string;
  shape?: string;
  children: ReactNode;
  handleClick?: () => void;
}

const Icon = ({ size, color, shape, children, handleClick }: IconProps) => {
  const iconStyle: CSSProperties = {
    fontSize: size === undefined ? "24px" : size,
    color: color === undefined ? "#000000" : color,
    cursor: handleClick === undefined ? "auto" : "pointer",
  };

  return (
    <i
      onClick={handleClick}
      className={`material-icons-${shape === undefined ? "outlined" : shape}`}
      style={iconStyle}
    >
      {children}
    </i>
  );
};

export default Icon;
