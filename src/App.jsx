import { useState, useEffect } from "react";
import TransactionsPage from "./pages/TransactionsPage";

function App() {
  const [transactionList, setTransactionList] = useState(() => {
    const savedData = localStorage.getItem("expenseTrackerData");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Error getting data from localStorage", error);
        return [];
      }
    }
    return [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const addTransaction = newTransaction => {
    setTransactionList(prev => [
      { ...newTransaction, id: Date.now() },
      ...prev,
    ]);
    closeModal();
  };
  const deleteTransaction = id => {
    setTransactionList(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("expenseTrackerData", JSON.stringify(transactionList));
  }, [transactionList]);
  return (
    <TransactionsPage
      transactions={transactionList}
      isModalOpen={isModalOpen}
      openModal={openModal}
      closeModal={closeModal}
      addTransaction={addTransaction}
      onDelete={deleteTransaction}
    />
  );
}
