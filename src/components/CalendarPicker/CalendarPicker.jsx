import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import styled from "./CalendarPicker.module.css";
function CalendarPicker({ value, onChange, wrapperRef }) {
  return (
    <div ref={wrapperRef} className={styled.calendarWrapper}>
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
