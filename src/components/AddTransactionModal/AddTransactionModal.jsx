import { useState } from "react";
import { toPersianNumber } from "../../utils/numberUtils";
import { useCalendar } from "../../Hooks/useCalendar";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import {
  formatPersianDate,
  sanitizePersianDateTyping,
} from "../../utils/formatPersainDate";
import Icon from "../../assets/svgs/Icon";
import TransactionModal from "../TransactionModal/TransactionModal";
import Buttons from "../Buttons/Buttons";
import styled from "./AddTransactionModal.module.css";

function AddTransactionModal({ onClose, onAdd }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const {
    showCalendar,
    calendarWrapperRef,
    toggleCalendar,
    handleDateSelect,
    parseDateString,
  } = useCalendar(newDate => {
    setDate(newDate);

    setErrors(prev => ({ ...prev, date: undefined }));
  });

  const handleDateInputChange = e => {
    const cleaned = sanitizePersianDateTyping(e.target.value);
    if (cleaned.length > 10) return;
    setDate(cleaned);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newErrors = {};

    if (!date.trim()) {
      newErrors.date = "تاریخ را وارد کنید";
    } else if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(date)) {
      newErrors.date = "فرمت تاریخ باید 1405/01/01 باشد";
    } else {
      const [, m, d] = date.split("/");
      if (+m < 1 || +m > 12) newErrors.date = "ماه نامعتبر است";
      if (+d < 1 || +d > 31) newErrors.date = "روز نامعتبر است";
    }

    if (!amount.trim()) {
      newErrors.amount = "مبلغ را وارد کنید";
    } else if (
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
      id: Date.now(),
      date,
      amount: Number(amount.replace(/,/g, "")),
      type,
      description,
    };

    onAdd(newTransaction);
    onClose();
  };

  return (
    <TransactionModal title="افزودن تراکنش" onClose={onClose}>
      <form onSubmit={handleSubmit} className={styled.form}>
        <div className={styled.dateFieldWrapper}>
          <label htmlFor="inputDate" className={styled.label}>
            تاریخ
          </label>
          <div className={styled.inputGroup}>
            <input
              type="text"
              id="inputDate"
              autoComplete="off"
              value={formatPersianDate(date)}
              onChange={handleDateInputChange}
              className={styled.input}
              placeholder=""
              onClick={toggleCalendar}
            />

            <Buttons
              onClick={toggleCalendar}
              title={""}
              label={"انتخاب تاریخ از تقویم"}
              type="button"
              style={styled.calendarIcon}
              icon={<Icon name="CalendarIcon" />}
            />

            {showCalendar && (
              <CalendarPicker
                value={parseDateString(date)}
                onChange={handleDateSelect}
                wrapperRef={calendarWrapperRef}
              />
            )}

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
              autoComplete="off"
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
          <Buttons
            onClick={onClose}
            title={"انصراف"}
            label={"انصراف"}
            type="button"
            style={styled.cancelBtn}
          />

          <button type="submit" className={styled.submitBtn}>
            ثبت
          </button>
        </div>
      </form>
    </TransactionModal>
  );
}

export default AddTransactionModal;
