function Buttons({ style, onClick, label, title, icon, type, disabled }) {
  return (
    <div>
      <button
        className={style}
        onClick={onClick}
        aria-label={label}
        type={type}
        disabled={disabled}
      >
        {title}
        {icon}
      </button>
    </div>
  );
}
export default Buttons;
