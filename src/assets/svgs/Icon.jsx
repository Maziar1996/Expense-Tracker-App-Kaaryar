import sprite from "./sprite.svg";

const Icon = ({
  name,
  sizeW = 24,
  sizeH = 24,
  color = "currentColor",
  className = "",
  fill = "",
}) => {
  return (
    <svg
      width={sizeW}
      height={sizeH}
      color={color}
      className={className}
      aria-hidden="true"
      fill={fill}
    >
      <use href={`${sprite}#${name}`} />
    </svg>
  );
};

export default Icon;
