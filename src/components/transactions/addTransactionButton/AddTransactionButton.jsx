import PlusIcon from "../../icons/PlusIcon";
import styled from "./addTransactionButton.module.css";
function AddTransactionButton({ onClick }) {
  return (
    <button className={styled.button} onClick={onClick}>
      افزودن تراکنش
      <PlusIcon />
    </button>
  );
}
export default AddTransactionButton;
