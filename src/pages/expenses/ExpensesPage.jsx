import { useState } from "react";
import { useTransactions } from "../../Context/TransactionContext";
import TransactionsTable from "../../components/TransactionTable/TransactionsTable";
import AddTransactionModal from "../../components/AddTransactionsModal/AddTransactionModal";
import Buttons from "../../components/Buttons/Buttons";
import Icon from "../../assets/svgs/Icon";
import styled from "./ExpensesPage.module.css";
function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { transactions, addTransaction, deleteTransaction, updateTransaction } =
    useTransactions();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddTransaction = newTransactionData => {
    addTransaction(newTransactionData);
    handleCloseModal();
  };

  const handleOpenEditModal = transaction => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };
  const handleEditTransaction = updatedData => {
    updateTransaction(editingTransaction.id, updatedData);
    handleCloseEditModal();
  };

  return (
    <>
      <div className={styled.pageContainer}>
        <div className={styled.header}>
          <Buttons
            onClick={handleOpenModal}
            title={"افزودن تراکنش"}
            label={"افزودن تراکنش"}
            style={styled.addTranBtn}
            icon={<Icon name="PlusIcon" />}
          />
          <h1 className={styled.title}>تراکنش ها</h1>
        </div>

        <TransactionsTable
          transactions={transactions}
          onDelete={deleteTransaction}
          onEdit={handleOpenEditModal}
        />
      </div>
      {isModalOpen && (
        <AddTransactionModal
          onClose={handleCloseModal}
          onAdd={handleAddTransaction}
        />
      )}
      {isEditModalOpen && (
        <AddTransactionModal
          onClose={handleCloseEditModal}
          onAdd={handleEditTransaction}
          initialData={editingTransaction}
          isEditMode={true}
        />
      )}
    </>
  );
}

export default ExpensesPage;
