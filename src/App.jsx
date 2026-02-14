import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import ExpensesPage from "./pages/expenses/ExpensesPage";
import NotFound from "./pages/NotFound/NotFound";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="expenses"
            element={
              <ExpensesPage
                transactions={transactionList}
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={closeModal}
                addTransaction={addTransaction}
                onDelete={deleteTransaction}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
