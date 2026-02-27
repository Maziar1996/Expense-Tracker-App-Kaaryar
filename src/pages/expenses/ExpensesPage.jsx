import { useState } from "react";
import { useTransactions } from "../../Context/TransactionContext";
import TransactionsTable from "../../components/TransactionTable/TransactionsTable";
import AddTransactionButton from "../../components/AddTransactionsButton/AddTransactionButton";
import AddTransactionModal from "../../components/AddTransactionsModal/AddTransactionModal";
import styled from "./expensesPage.module.css";
function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addTransaction } = useTransactions();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddTransaction = newTransactionData => {
    addTransaction(newTransactionData);
    handleCloseModal();
  };

  return (
    <>
      <div className={styled.pageContainer}>
        <div className={styled.header}>
          <AddTransactionButton onClick={handleOpenModal} />
          <h1 className={styled.title}>تراکنش ها</h1>
        </div>

        <TransactionsTable />
      </div>

      {isModalOpen && (
        <AddTransactionModal
          onClose={handleCloseModal}
          onAdd={handleAddTransaction}
        />
      )}
    </>
  );
}

export default ExpensesPage;
