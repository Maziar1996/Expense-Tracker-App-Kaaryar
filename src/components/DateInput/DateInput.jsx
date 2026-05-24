import { useCalendar } from "../../Hooks/useCalendar";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import {
  formatPersianDate,
  sanitizePersianDateTyping,
} from "../../utils/formatPersainDate";
import Icon from "../../assets/svgs/Icon";
import Buttons from "../Buttons/Buttons";
import styled from "./DateInput.module.css";

function DateInput({
  value,
  onChange,
  placeholder = "",
  error,
  id,
  className,
  onErrorClear,
  labelText = "",
  htmlFor = "",
}) {
  const {
    showCalendar,
    calendarWrapperRef,
    toggleCalendar,
    handleDateSelect,
    parseDateString,
  } = useCalendar(newDate => {
    onChange(newDate);
    if (onErrorClear) onErrorClear();
  });

  const handleInputChange = e => {
    const cleaned = sanitizePersianDateTyping(e.target.value);
    if (cleaned.length > 10) return;
    onChange(cleaned);
  };

  return (
    <div className={`${styled.dateInputWrapper} ${className || ""}`}>
      <label htmlFor={htmlFor}>{labelText}</label>
      <input
        type="text"
        id={id}
        autoComplete="off"
        value={formatPersianDate(value)}
        onChange={handleInputChange}
        className={`${styled.input} ${error ? styled.inputError : ""}`}
        placeholder={placeholder}
        onClick={toggleCalendar}
      />

      <Buttons
        onClick={toggleCalendar}
        title=""
        label="انتخاب تاریخ از تقویم"
        type="button"
        style={styled.calendarIcon}
        icon={<Icon name="CalendarIcon" />}
      />

      {showCalendar && (
        <CalendarPicker
          value={parseDateString(value)}
          onChange={handleDateSelect}
          wrapperRef={calendarWrapperRef}
        />
      )}

      {error && <span className={styled.errorText}>{error}</span>}
    </div>
  );
}

export default DateInput;
