import { createContext, useContext, useEffect } from "react";
import { useApi } from "../Hooks/useApi";

const TransactionContext = createContext(undefined);

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
}

export function TransactionProvider({ children }) {
  const api = useApi();

  useEffect(() => {
    api.loadTransactions();
  }, [api.loadTransactions]);

  const value = {
    transactions: api.transactions,
    isLoading: api.isLoading,
    error: api.error,
    successMessage: api.successMessage,
    refetchTransactions: api.loadTransactions,
    clearMessages: api.clearMessages,
    addTransaction: api.addTransaction,
    deleteTransaction: api.deleteTransaction,
    updateTransaction: api.updateTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}
