import { useEffect } from "react";
import styled from "./addTransactionModal.module.css";
import AddTransactionForm from "./../addTransactionForm/AddTransactionForm";
import CloseIcon from "../../icons/CloseIcon";

function AddTransactionModal({ onClose, onAdd }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = e => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className={styled.overlay}>
      <div className={styled.modal} onClick={e => e.stopPropagation()}>
        <div className={styled.line}></div>
        <div className={styled.header}>
          <h2 className={styled.modalTitle}>افزودن تراکنش</h2>
          <button
            className={styled.closeBtn}
            onClick={onClose}
            aria-label="بستن"
          >
            <CloseIcon />
          </button>
        </div>
        <AddTransactionForm onAdd={onAdd} onCancel={onClose} />
      </div>
    </div>
  );
}
export default AddTransactionModal;
