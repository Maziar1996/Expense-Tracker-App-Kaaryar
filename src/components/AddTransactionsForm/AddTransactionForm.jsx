import { useState } from "react";
import styled from "./addTransactionForm.module.css";
import { toPersianNumber } from "../../utils/numberUtils";
import {
  formatPersianDate,
  sanitizePersianDateTyping,
} from "../../utils/formatPersainDate";
import CalendarIcon from "../Icons/CalendarIcon";
function AddTransactionForm({ onAdd, onCancel }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();

    const newErrors = {};

    if (!date.trim()) {
      newErrors.date = "تاریخ را وارد کنید";
    } else if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(date)) {
      newErrors.date = "فرمت تاریخ باید 1404/6/20 باشد";
    } else {
      const [, m, d] = date.split("/");
      if (+m < 1 || +m > 12) newErrors.date = "ماه نامعتبر است";
      if (+d < 1 || +d > 31) newErrors.date = "روز نامعتبر است";
    }

    if (!amount.trim()) newErrors.amount = "مبلغ را وارد کنید";
    else if (
      isNaN(amount.replace(/,/g, "")) ||
      Number(amount.replace(/,/g, "")) <= 0
    ) {
      newErrors.amount = "مبلغ باید عدد مثبت باشد";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const newTransaction = {
      date,
      amount: Number(amount.replace(/,/g, "")),
      type,
      description,
    };

    onAdd(newTransaction);

    setDate("");
    setAmount("");
    setDescription("");
    setType("income");
  };

  return (
    <form onSubmit={handleSubmit} className={styled.form}>
      <div className={styled.dateFieldWrapper}>
        <label htmlFor="inputDate" className={styled.label}>
          تاریخ
        </label>
        <div className={styled.inputGroup}>
          <input
            type="text"
            id="inputDate"
            value={formatPersianDate(date)}
            onChange={e => {
              const cleaned = sanitizePersianDateTyping(e.target.value);
              if (cleaned.length > 10) return;
              setDate(cleaned);
            }}
            className={styled.input}
            placeholder=""
          />
          <button type="button" className={styled.calendarIcon}>
            <CalendarIcon />
          </button>
          {errors.date && (
            <span className={styled.errorText}>{errors.date}</span>
          )}
        </div>
      </div>

      <div className={styled.amountFieldWrapper}>
        <label htmlFor="inputAmount" className={styled.label}>
          مبلغ (تومان)
        </label>
        <div className={styled.inputGroup}>
          <input
            type="text"
            inputMode="numeric"
            id="inputAmount"
            value={toPersianNumber(amount)}
            onChange={e => {
              const englishOnly = e.target.value
                .replace(/[۰-۹]/g, d => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)])
                .replace(/\D/g, "");
              setAmount(englishOnly);
            }}
            className={styled.input}
          />
          {errors.amount && (
            <span className={styled.errorText}>{errors.amount}</span>
          )}
        </div>
      </div>
      <div className={styled.radioGroup}>
        <label className={styled.label}>نوع تراکنش</label>
        <label className={styled.radioLabel}>
          <input
            type="radio"
            name="type"
            value="income"
            checked={type === "income"}
            onChange={e => setType(e.target.value)}
          />
          <span>درآمد</span>
        </label>
        <label className={styled.radioLabel}>
          <input
            type="radio"
            name="type"
            value="expense"
            checked={type === "expense"}
            onChange={e => setType(e.target.value)}
          />
          <span>هزینه</span>
        </label>
      </div>
      <div className={styled.transDesc}>
        <label htmlFor="descriptionInput" className={styled.label}>
          شرح
        </label>
        <input
          type="text"
          id="descriptionInput"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={styled.input}
          dir="rtl"
        />
      </div>

      <div className={styled.buttons}>
        <button type="button" className={styled.cancelBtn} onClick={onCancel}>
          انصراف
        </button>
        <button type="submit" className={styled.submitBtn}>
          ثبت
        </button>
      </div>
    </form>
  );
}
export default AddTransactionForm;
