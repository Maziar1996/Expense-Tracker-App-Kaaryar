import { useEffect, useRef, useState } from "react";
import Buttons from "../Buttons/Buttons";
import closeIcon from "../../assets/svgs/closeIcon.svg";
import styled from "./BaseModal.module.css";

function TransactionModal({ title, onClose, children }) {
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startY = useRef(0);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEsc = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handlePointerDown = e => {
    startY.current = e.clientY;
    setIsDragging(true);

    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = e => {
    if (!isDragging) return;

    const diff = e.clientY - startY.current;

    if (diff > 0) {
      setTranslateY(diff);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);

    if (translateY > 120) {
      setTranslateY(window.innerHeight);

      setTimeout(() => {
        onClose();
      }, 250);
    } else {
      setTranslateY(0);
    }
  };

  return (
    <div className={styled.overlay}>
      <div
        className={styled.modal}
        onClick={e => e.stopPropagation()}
        style={{
          transform: `translateY(${translateY}px)`,
          transition: isDragging ? "none" : "transform 0.25s ease",
        }}
      >
        <div
          className={styled.line}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />

        <div className={styled.header}>
          <h2 className={styled.modalTitle}>{title}</h2>

          <Buttons
            onClick={onClose}
            title=""
            label="بستن"
            style={styled.closeBtn}
            icon={closeIcon}
            type="button"
          />
        </div>

        {children}
      </div>
    </div>
  );
}

export default TransactionModal;
