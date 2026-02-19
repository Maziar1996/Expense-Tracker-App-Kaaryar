import { useEffect } from "react";
import styled from "./addTransactionModal.module.css";
import AddTransactionForm from "../AddTransactionsForm/AddTransactionForm";
import Portal from "../Portal/Portal";
import CloseIcon from "../Icons/CloseIcon";

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
    <Portal>
      <div className={styled.overlay} onClick={onClose}>
        <div className={styled.modal} onClick={e => e.stopPropagation()}>
          <div className={styled.line} onClick={onClose}></div>
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
    </Portal>
  );
}
export default AddTransactionModal;
