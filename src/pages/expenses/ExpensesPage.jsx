import TransactionsTable from "../../components/transactions/transactionsTable/TransactionsTable";
import AddTransactionButton from "../../components/transactions/addTransactionButton/AddTransactionButton";
import AddTransactionModal from "../../components/transactions/addTransactionModal/AddTransactionModal";
import styled from "./expensesPage.module.css";
function ExpensesPage({
  transactions,
  isModalOpen,
  openModal,
  closeModal,
  addTransaction,
  onDelete,
}) {
  return (
    <>
      <div className={styled.pageContainer}>
        <div className={styled.header}>
          <AddTransactionButton onClick={openModal} />
          <h1 className={styled.title}>تراکنش ها</h1>
        </div>

        <TransactionsTable transactions={transactions} onDelete={onDelete} />

        {isModalOpen && (
          <AddTransactionModal onClose={closeModal} onAdd={addTransaction} />
        )}
      </div>
    </>
  );
}
export default ExpensesPage;
