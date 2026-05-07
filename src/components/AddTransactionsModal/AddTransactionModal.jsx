import { useEffect } from "react";
import AddTransactionForm from "../AddTransactionsForm/AddTransactionForm";
import Buttons from "../Buttons/Buttons";
import Icon from "../../assets/svgs/Icon";
import styled from "./AddTransactionModal.module.css";

function AddTransactionModal({
  onClose,
  onAdd,
  initialData = null,
  isEditMode = false,
}) {
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
          <h2 className={styled.modalTitle}>
            {isEditMode ? "ویرایش تراکنش" : "افزودن تراکنش"}
          </h2>

          <Buttons
            onClick={onClose}
            title={""}
            label={"بستن"}
            style={styled.closeBtn}
            icon={<Icon name="CloseIcon" />}
          />
        </div>
        <AddTransactionForm
          onAdd={onAdd}
          onCancel={onClose}
          initialData={initialData}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
}
export default AddTransactionModal;
