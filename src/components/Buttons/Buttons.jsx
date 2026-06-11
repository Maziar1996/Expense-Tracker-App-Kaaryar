function Buttons({ style, onClick, label, title, icon, type, disabled }) {
  return (
    <button
      className={style}
      onClick={onClick}
      aria-label={label}
      type={type}
      disabled={disabled}
    >
      {title}
      {icon && <img src={icon} alt="" />}
    </button>
  );
}
export default Buttons;
