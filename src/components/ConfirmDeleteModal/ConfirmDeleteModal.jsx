import { useEffect } from "react";
import Buttons from "../Buttons/Buttons";
import Icon from "../../assets/svgs/Icon";
import styled from "./ConfirmDeleteModal.module.css";

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = e => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onCancel]);

  return (
    <>
      <div className={styled.overlay} onClick={onCancel}>
        <div className={styled.modal} onClick={e => e.stopPropagation()}>
          <div className={styled.line} onClick={onCancel}></div>
          <div className={styled.deleteWrapper}>
            <h3 className={styled.title}>حذف تراکنش</h3>
            <Buttons
              onClick={onCancel}
              title={""}
              label={"بستن"}
              style={styled.closeBtn}
              icon={<Icon name="CloseIcon" />}
            />
          </div>
          <p className={styled.message}>از حذف تراکنش اطمینان دارید؟</p>

          <div className={styled.buttons}>
            <Buttons
              onClick={onCancel}
              title={"انصراف"}
              label={"انصراف"}
              style={styled.cancelBtn}
            />
            <Buttons
              onClick={onConfirm}
              title={"حذف"}
              label={"حذف"}
              style={styled.confirmBtn}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfirmDeleteModal;
