import { useState, useRef, useEffect } from "react";
export function useCalendar(onDateChange) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarWrapperRef = useRef(null);

  const parseDateString = dateStr => {
    if (!dateStr || dateStr.length < 8) return null;
    const [year, month, day] = dateStr.split("/").map(Number);
    if (!year || !month || !day) return null;
    return { year, month, day };
  };

  const formatDateObject = dateObj => {
    if (!dateObj) return "";
    const year = dateObj.year;
    const month = String(dateObj.month).padStart(2, "0");
    const day = String(dateObj.day).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const toggleCalendar = () => {
    setShowCalendar(prev => !prev);
  };

  const handleDateSelect = selectedDate => {
    if (selectedDate) {
      const formattedDate = formatDateObject(selectedDate);
      onDateChange(formattedDate);
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        calendarWrapperRef.current &&
        !calendarWrapperRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return {
    showCalendar,
    calendarWrapperRef,
    toggleCalendar,
    handleDateSelect,
    parseDateString,
  };
}
