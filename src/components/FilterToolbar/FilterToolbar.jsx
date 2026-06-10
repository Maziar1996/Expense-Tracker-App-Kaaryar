import { useState, useEffect, useId } from "react";
import DateInput from "../DateInput/DateInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import styled from "./FilterToolbar.module.css";

function FilterToolbar({ onChange, showSort = true, className = "" }) {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    type: "all",
  });

  const [sortBy, setSortBy] = useState("");
  const id = useId;

  useEffect(() => {
    onChange(filters, sortBy);
  }, [filters, sortBy, onChange]);

  const sortOptions = [
    { value: "date-desc", label: "جدیدترین" },
    { value: "date-asc", label: "قدیمی‌ترین" },
    { value: "amount-desc", label: "بیشترین مبلغ" },
    { value: "amount-asc", label: "کمترین مبلغ" },
  ];

  return (
    <div className={`${styled.toolbar} ${className}`}>
      <DateInput
        id={id + "dateInput1"}
        htmlFor={id + "dateInput1"}
        className={styled.dateInput}
        labelText={"از تاریخ"}
        value={filters.fromDate}
        placeholder="انتخاب کنید"
        onChange={date => setFilters(prev => ({ ...prev, fromDate: date }))}
      />

      <DateInput
        id={id + "dateInput2"}
        htmlFor={id + "dateInput2"}
        className={styled.dateInput}
        labelText={"تا تاریخ"}
        value={filters.toDate}
        placeholder="انتخاب کنید"
        onChange={date => setFilters(prev => ({ ...prev, toDate: date }))}
      />

      {showSort && (
        <CustomSelect
          label="ترتیب نمایش"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="انتخاب کنید"
          searchable={false}
          className={styled.customSelectWrapper}
        />
      )}
    </div>
  );
}

export default FilterToolbar;
