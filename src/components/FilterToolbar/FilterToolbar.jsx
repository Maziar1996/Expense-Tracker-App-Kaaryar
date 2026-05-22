import { useState, useEffect } from "react";
import DateInput from "../DateInput/DateInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import styled from "./FilterToolbar.module.css";

function FilterToolbar({ onChange, showSort = true }) {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    type: "all",
  });

  const [sortBy, setSortBy] = useState("");

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
    <div className={styled.toolbar}>
      <div className={styled.dateFilters}>
        <DateInput
          className={styled.dateInput}
          labelText={"از تاریخ"}
          value={filters.fromDate}
          placeholder="انتخاب کنید"
          onChange={date => setFilters(prev => ({ ...prev, fromDate: date }))}
        />

        <DateInput
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
    </div>
  );
}

export default FilterToolbar;
