import { useCalendar } from "../../Hooks/useCalendar";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import {
  formatPersianDate,
  sanitizePersianDateTyping,
} from "../../utils/formatPersainDate";
import calendarIcon from "../../assets/svgs/calendarIcon.svg";
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
  clearable = true,
  inputWidth,
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

  function handleClear(e) {
    e.stopPropagation();
    onChange("");
    if (onErrorClear) onErrorClear();
  }

  return (
    <div className={`${styled.dateInputWrapper} ${className || ""}`}>
      <label htmlFor={htmlFor}>{labelText}</label>

      <div
        className={`${styled.inputWrapper} ${inputWidth ? styled.fixedWidth : ""}`}
      >
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

        {clearable && value && (
          <span
            className={styled.clearIcon}
            onClick={handleClear}
            title="پاک کردن"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8299 1.17011C12.0567 0.943355 12.0567 0.576645 11.8299 0.349889C11.6032 0.123133 11.2365 0.123133 11.0097 0.349889L6 5.35977L0.990311 0.349889C0.763555 0.123133 0.396845 0.123133 0.170089 0.349889C-0.0566671 0.576645 -0.0566671 0.943355 0.170089 1.17011L5.17997 6.18L0.170089 11.1899C-0.0566671 11.4166 -0.0566671 11.7834 0.170089 12.0101C0.396845 12.2369 0.763555 12.2369 0.990311 12.0101L6 7.00023L11.0097 12.0101C11.2365 12.2369 11.6032 12.2369 11.8299 12.0101C12.0567 11.7834 12.0567 11.4166 11.8299 11.1899L6.82003 6.18L11.8299 1.17011Z"
                fill="#A0CCF8"
              />
            </svg>
          </span>
        )}

        <Buttons
          onClick={toggleCalendar}
          title=""
          label="انتخاب تاریخ از تقویم"
          type="button"
          style={styled.calendarIcon}
          icon={calendarIcon}
        />

        {error && <span className={styled.errorText}>{error}</span>}
      </div>

      {showCalendar && (
        <CalendarPicker
          value={parseDateString(value)}
          onChange={handleDateSelect}
          wrapperRef={calendarWrapperRef}
        />
      )}
    </div>
  );
}

export default DateInput;
