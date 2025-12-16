import styled from "./transactions.module.css";
import { transactions } from "../../dataBase/transactions";
import TableHeader from "./TableHeader";
import TransactionsRow from "./TransactionsRow.jsx";

function TransactionsTable() {
  return (
    <div className={styled.container}>
      <h2 className={styled.title}>تراکنش ها</h2>

      <div className={styled.table}>
        <TableHeader />
        {transactions.map(item => (
          <TransactionsRow key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
export default TransactionsTable;
