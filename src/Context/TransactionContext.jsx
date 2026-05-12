import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  fetchTransactions,
  createTransaction,
  updateTransaction as updateTransactionAPI,
  deleteTransaction as deleteTransactionAPI,
} from "../Services/api";

const SET_TRANSACTIONS = "SET_TRANSACTIONS";
const ADD_TRANSACTION = "ADD_TRANSACTION";
const DELETE_TRANSACTION = "DELETE_TRANSACTION";
const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";

const initialState = {
  transactions: [],
};

function transactionReducer(state, action) {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };

    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    case UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload.data } : t
        ),
      };
    default:
      return state;
  }
}

const TransactionContext = createContext(undefined);

export function useTransactions() {
  const context = useContext(TransactionContext);

  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
}

export function TransactionProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const showSuccess = message => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchTransactions();
        dispatch({ type: SET_TRANSACTIONS, payload: data });
      } catch (error) {
        setError("خطا در بارگذاری تراکنش ها");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const addTransaction = async newTransaction => {
    try {
      setIsLoading(true);
      setError(null);

      const createdTransaction = await createTransaction(newTransaction);

      dispatch({
        type: ADD_TRANSACTION,
        payload: createdTransaction,
      });

      showSuccess("تراکنش شما با موفقیت ثبت شد");

      return createdTransaction;
    } catch (error) {
      setError("خطا در افزودن تراکنش");
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTransaction = async id => {
    try {
      setIsLoading(true);
      setError(null);

      await deleteTransactionAPI(id);

      dispatch({
        type: DELETE_TRANSACTION,
        payload: id,
      });
      showSuccess("تراکنش شما با موفقیت حذف شد");
    } catch (error) {
      setError("خطا در حذف تراکنش");
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTransaction = async (id, updatedData) => {
    try {
      setIsLoading(true);
      setError(null);

      const updated = await updateTransactionAPI(id, updatedData);

      dispatch({
        type: UPDATE_TRANSACTION,
        payload: { id, data: updated },
      });

      showSuccess("تراکنش شما با موفقیت ویرایش شد");

      return updated;
    } catch (error) {
      setError("خطا در ویرایش تراکنش");
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    transactions: state.transactions,
    isLoading,
    error,
    successMessage,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}
