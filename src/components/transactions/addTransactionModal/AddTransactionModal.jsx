import { useEffect } from "react";
import styled from "./addTransactionModal.module.css";
import AddTransactionForm from "./../addTransactionForm/AddTransactionForm";

function AddTransactionModal({ onClose, onAdd }) {
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className={styled.overlay} onClick={onClose}>
      <div className={styled.modal} onClick={e => e.stopPropagation()}>
        <div className={styled.line}></div>
        <div className={styled.header}>
          <h2 className={styled.modalTitle}>افزودن تراکنش</h2>
          <button
            className={styled.closeBtn}
            onClick={onClose}
            aria-label="بستن"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <AddTransactionForm onAdd={onAdd} onCancel={onClose} />
      </div>
    </div>
  );
}
export default AddTransactionModal;
