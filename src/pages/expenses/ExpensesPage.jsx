import { useState } from "react";
import { useTransactions } from "../../Context/TransactionContext";
import TransactionsTable from "../../components/TransactionTable/TransactionsTable";
import AddTransactionModal from "../../components/AddTransactionModal/AddTransactionModal";
import EditTransactionModal from "../../components/EditTransactionModal/EditTransactionModal";
import Buttons from "../../components/Buttons/Buttons";
import Spinner from "../../components/Spinner/Spinner";
import Toast from "../../components/Toast/Toast";
import Icon from "../../assets/svgs/Icon";
import styled from "./ExpensesPage.module.css";

function ExpensesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    isLoading,
    error,
    successMessage,
    clearMessages,
  } = useTransactions();

  const handleAdd = newTransaction => {
    addTransaction(newTransaction);
  };

  const handleUpdate = (id, updatedTransaction) => {
    updateTransaction(id, updatedTransaction);
  };

  const handleOpenEditModal = transaction => {
    setEditingTransaction(transaction);
  };

  return (
    <>
      <Toast
        message={error || successMessage}
        type={error ? "error" : "success"}
        onClose={clearMessages}
        duration={3000}
      />

      <div className={styled.pageContainer}>
        <div className={styled.header}>
          <Buttons
            onClick={() => setShowAddModal(true)}
            title={"افزودن تراکنش"}
            label={"افزودن تراکنش"}
            style={styled.addTranBtn}
            icon={<Icon name="PlusIcon" />}
          />
          <h1 className={styled.title}>تراکنش ها</h1>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <TransactionsTable
            transactions={transactions}
            onDelete={deleteTransaction}
            onEdit={handleOpenEditModal}
          />
        )}
      </div>

      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
        />
      )}

      {editingTransaction && (
        <EditTransactionModal
          onClose={() => setEditingTransaction(null)}
          onUpdate={handleUpdate}
          transaction={editingTransaction}
        />
      )}
    </>
  );
}

export default ExpensesPage;
