import styled from "./transactionsRow.module.css";
import { formatNumber } from "../../utils/formatNumber";
import { formatPersianDate } from "../../utils/formatPersainDate";
import DeleteButton from "../DeleteButton/DeleteButton";

function TransactionsRow({ data, onDelete }) {
  const isIncome = data.type === "income";

  return (
    <div className={styled.row}>
      <span className={styled.dateCell}>{formatPersianDate(data.date)}</span>

      <span className={isIncome ? styled.income : styled.empty}>
        {isIncome ? `${formatNumber(data.amount)}+` : ""}
        <span className={styled.currency}>تومان</span>
      </span>

      <span className={!isIncome ? styled.expense : styled.empty}>
        {!isIncome ? `${formatNumber(data.amount)}-` : ""}
        <span className={styled.currency}>تومان</span>
      </span>

      <span className={styled.descriptionCell}>{data.description}</span>

      <div className={styled.actionsCell}>
        <DeleteButton onDelete={() => onDelete(data.id)} />
      </div>
    </div>
  );
}

export default TransactionsRow;
