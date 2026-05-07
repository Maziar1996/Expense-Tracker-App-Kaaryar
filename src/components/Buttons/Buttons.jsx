function Buttons({ style, onClick, label, title, icon }) {
  return (
    <div>
      <button className={style} onClick={onClick} aria-label={label}>
        {title}
        {icon}
      </button>
    </div>
  );
}
export default Buttons;
