import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function CalendarPicker({ value, onChange, wrapperRef }) {
  return (
    <div
      ref={wrapperRef}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        zIndex: 1000,
        marginTop: "8px",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
        padding: "8px",
      }}
    >
      <Calendar
        value={value}
        onChange={onChange}
        calendar={persian}
        locale={persian_fa}
      />
    </div>
  );
}

export default CalendarPicker;
