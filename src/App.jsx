import { useState } from "react";
import TransactionsPage from "./pages/TransactionsPage";

import { transactions } from "./dataBase/transactions";

function App() {
  const [transactionList, setTransactionList] = useState(transactions);

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

export default App;
