import { useState } from "react";
import TransactionsRow from "../TransactionRow/TransactionsRow";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import Icon from "../../assets/svgs/Icon";
import styled from "./TransactionsTable.module.css";

function TransactionsTable({ transactions = [], onDelete, onEdit }) {
  const [deleteId, setDeleteId] = useState(null);
  const hasTransactions = transactions.length > 0;

  const handleDeleteClick = id => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    onDelete(deleteId);
    setDeleteId(null);
  };
  return (
    <div className={styled.container}>
      {hasTransactions && (
        <div className={`${styled.row} ${styled.header}`}>
          <span>تاریخ</span>
          <span>درآمد (تومان)</span>
          <span>هزینه (تومان)</span>
          <span>شرح</span>
        </div>
      )}

      {hasTransactions ? (
        transactions.map((item, index) => (
          <TransactionsRow
            key={item.id || `transaction-${index}`}
            data={item}
            onDelete={() => handleDeleteClick(item.id)}
            onEdit={() => onEdit(item)}
          />
        ))
      ) : (
        <div className={styled.emptyMessage}>
          <span>
            <Icon name="ExclamationIcon" />
          </span>
          شما هنوز هیچ تراکنشی وارد نکرده اید.
        </div>
      )}

      {deleteId !== null && (
        <ConfirmDeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
export default TransactionsTable;
