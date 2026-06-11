import { useState, useId } from "react";
import { toPersianNumber } from "../../utils/numberUtils";
import DateInput from "../DateInput/DateInput";
import styled from "./TransactionForm.module.css";

function TransactionForm({ initialData = {}, onSubmit, onClose, submitText }) {
  const [date, setDate] = useState(initialData.date || "");
  const [amount, setAmount] = useState(
    initialData.amount ? String(initialData.amount) : ""
  );
  const [type, setType] = useState(initialData.type || "income");
  const [description, setDescription] = useState(initialData.description || "");
  const [errors, setErrors] = useState({});

  const id = useId();

  const handleNumberChange = e => {
    e.preventDefault();

    const englishOnly = e.target.value
      .replace(/[۰-۹]/g, d => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)])
      .replace(/\D/g, "");

    setAmount(englishOnly);

    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: undefined }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newErrors = {};

    if (!date.trim()) {
      newErrors.date = "تاریخ را وارد کنید";
    } else if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(date)) {
      newErrors.date = "فرمت تاریخ باید 1405/01/01 باشد";
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

    const transactionData = {
      ...initialData,
      date,
      amount: Number(amount.replace(/,/g, "")),
      type,
      description,
    };

    onSubmit(transactionData);
  };

  return (
    <form onSubmit={handleSubmit} className={styled.form}>
      <DateInput
        id={id + "FormDateInput"}
        htmlFor={id + "FormDateInput"}
        className={styled.dateInput}
        inputWidth="312px"
        labelText="تاریخ"
        value={date}
        onChange={setDate}
        error={errors.date}
        onErrorClear={() => setErrors(prev => ({ ...prev, date: undefined }))}
      />

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
            onChange={handleNumberChange}
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
          autoComplete="off"
        />
      </div>

      <div className={styled.buttons}>
        <button className={styled.cancelBtn} onClick={onClose}>
          انصراف
        </button>

        <button type="submit" className={styled.submitBtn}>
          {submitText}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
