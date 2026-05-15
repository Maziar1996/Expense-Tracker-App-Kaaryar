import { useEffect } from "react";
import Icon from "../../assets/svgs/Icon";
import styled from "./Toast.module.css";
import Buttons from "../Buttons/Buttons";

function Toast({ message, type = "success", onClose, duration }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`${styled.toast} ${styled[type]}`}>
      <div className={styled.content}>
        <span className={styled.message}>{message}</span>
      </div>
      <button onClick={onClose} aria-label="بستن" className={styled.closeBtn}>
        X
      </button>
    </div>
  );
}

export default Toast;
