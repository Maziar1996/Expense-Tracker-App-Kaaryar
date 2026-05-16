function Buttons({ style, onClick, label, title, icon, type }) {
  return (
    <div>
      <button
        className={style}
        onClick={onClick}
        aria-label={label}
        type={type}
      >
        {title}
        {icon}
      </button>
    </div>
  );
}
export default Buttons;
