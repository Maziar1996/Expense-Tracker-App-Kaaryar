import { useEffect } from "react";
import Buttons from "../Buttons/Buttons";
import Icon from "../../assets/svgs/Icon";
import styled from "./TransactionModal.module.css";

function TransactionModal({ title, onClose, children }) {
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
        <div className={styled.line} onClick={onClose}></div>

        <div className={styled.header}>
          <h2 className={styled.modalTitle}>{title}</h2>

          <Buttons
            onClick={onClose}
            title=""
            label="بستن"
            style={styled.closeBtn}
            icon={<Icon name="CloseIcon" />}
          />
        </div>

        {children}
      </div>
    </div>
  );
}

export default TransactionModal;
