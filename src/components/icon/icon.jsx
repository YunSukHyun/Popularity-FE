const Icon = ({ size, color, shape, children, handleClick }) => {
  const iconStyle = {
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
