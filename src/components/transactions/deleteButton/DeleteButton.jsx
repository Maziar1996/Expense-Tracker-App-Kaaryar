import { TrashIcon } from "../../icons/Index";
import styled from "./deleteButton.module.css";

function DeleteButton({ onDelete }) {
  return (
    <button
      className={styled.button}
      onClick={onDelete}
      aria-label="حذف تراکنش"
    >
      <TrashIcon />
    </button>
  );
}
export default DeleteButton;
