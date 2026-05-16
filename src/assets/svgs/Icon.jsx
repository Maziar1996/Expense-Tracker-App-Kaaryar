const Icon = ({
  name,
  sizeW = 24,
  sizeH = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <svg
      width={sizeW}
      height={sizeH}
      fill={color}
      className={className}
      aria-hidden="true"
    >
      <use href={`/src/assets/svgs/sprite.svg#${name}`} />
    </svg>
  );
};
export default Icon;
