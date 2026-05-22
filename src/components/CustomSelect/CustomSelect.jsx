import { useState, useRef, useEffect } from "react";
import styled from "./CustomSelect.module.css";

function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "انتخاب کنید",
  label,
  searchable = true,
  clearable = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find(o => o.value === value);

  function handleSelect(val) {
    onChange(val);
    setIsOpen(false);
    setSearch("");
  }

  function handleClear(e) {
    e.stopPropagation();
    onChange("");
    setSearch("");
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        setFocusedIndex(i => Math.min(i + 1, filteredOptions.length - 1));
      }

      if (e.key === "ArrowUp") {
        setFocusedIndex(i => Math.max(i - 1, 0));
      }

      if (e.key === "Enter") {
        if (filteredOptions[focusedIndex]) {
          handleSelect(filteredOptions[focusedIndex].value);
        }
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, focusedIndex, filteredOptions]);

  return (
    <div className={styled.wrapper} ref={dropdownRef}>
      {label && <label className={styled.label}>{label}</label>}

      <button
        className={styled.button}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {selectedOption ? selectedOption.label : placeholder}

        <div className={styled.icons}>
          {clearable && value && (
            <span
              className={styled.clear}
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

          <span className={styled.arrow}>
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.170067 0.170067C0.376209 -0.0360748 0.698787 -0.054815 0.926099 0.113847L0.991223 0.170067L6 5.17858L11.0088 0.170067C11.2149 -0.0360748 11.5375 -0.054815 11.7648 0.113847L11.8299 0.170067C12.0361 0.376209 12.0548 0.698787 11.8862 0.926099L11.8299 0.991223L6.41058 6.41058C6.20444 6.61672 5.88186 6.63546 5.65455 6.4668L5.58942 6.41058L0.170067 0.991223C-0.056689 0.764467 -0.056689 0.396823 0.170067 0.170067Z"
                fill="#A0CCF8"
              />
            </svg>
          </span>
        </div>
      </button>

      {isOpen && (
        <div className={styled.dropdown}>
          {searchable && (
            <input
              className={styled.search}
              placeholder="جستجو..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          )}

          <div className={styled.options}>
            {filteredOptions.map((option, index) => (
              <div
                key={option.value}
                className={`${styled.option}
                ${value === option.value ? styled.selected : ""}
                ${focusedIndex === index ? styled.focused : ""}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
