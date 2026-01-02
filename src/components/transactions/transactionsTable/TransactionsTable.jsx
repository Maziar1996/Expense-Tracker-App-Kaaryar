import styled from "./transactionsTable.module.css";

import TableHeader from "../tableHeader/TableHeader";

import TransactionsRow from "../transactionRow/TransactionsRow";

import ExclamationIcon from "../../icons/ExclamationIcon";

function TransactionsTable({ transactions, onDelete }) {
  const hasTransactions = transactions.length > 0;
  return (
    <div className={styled.container}>
      {hasTransactions && <TableHeader />}

      {hasTransactions ? (
        transactions.map(item => (
          <TransactionsRow key={item.id} data={item} onDelete={onDelete} />
        ))
      ) : (
        <div className={styled.emptyMessage}>
          <span>
            <ExclamationIcon />
          </span>
          شما هنوز هیچ تراکنشی وارد نکرده اید.
        </div>
      )}
    </div>
  );
}
export default TransactionsTable;
