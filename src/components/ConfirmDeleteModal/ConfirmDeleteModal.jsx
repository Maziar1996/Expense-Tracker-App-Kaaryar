import BaseModal from "../BaseModal/BaseModal";
import Buttons from "../Buttons/Buttons";
import styled from "./ConfirmDeleteModal.module.css";

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <BaseModal title="حذف تراکنش" onClose={onCancel}>
      <div className={styled.content}>
        <p className={styled.message}>از حذف تراکنش اطمینان دارید؟</p>

        <div className={styled.buttons}>
          <Buttons
            onClick={onCancel}
            title="انصراف"
            label="انصراف"
            style={styled.cancelBtn}
          />

          <Buttons
            onClick={onConfirm}
            title="حذف"
            label="حذف"
            style={styled.confirmBtn}
          />
        </div>
      </div>
    </BaseModal>
  );
}

export default ConfirmDeleteModal;
