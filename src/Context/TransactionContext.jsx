import {
  createContext,
  useReducer,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import {
  fetchTransactions,
  createTransaction,
  updateTransaction as updateTransactionAPI,
  deleteTransaction as deleteTransactionAPI,
} from "../Services/api";

import useFetch from "../Hooks/useFetch";

// Action Types
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

  const [successMessage, setSuccessMessage] = useState(null);

  const {
    data: fetchedTransactions,
    isLoading: isFetchingTransactions,
    error: fetchError,
  } = useFetch(fetchTransactions, true);

  useEffect(() => {
    if (fetchedTransactions) {
      dispatch({ type: SET_TRANSACTIONS, payload: fetchedTransactions });
    }
  }, [fetchedTransactions]);

  const {
    isLoading: isCreating,
    error: createError,
    execute: executeCreate,
  } = useFetch(createTransaction, false);

  const {
    isLoading: isUpdating,
    error: updateError,
    execute: executeUpdate,
  } = useFetch(updateTransactionAPI, false);

  const {
    isLoading: isDeleting,
    error: deleteError,
    execute: executeDelete,
  } = useFetch(deleteTransactionAPI, false);

  const showSuccess = message => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const addTransaction = useCallback(
    async newTransaction => {
      try {
        const createdTransaction = await executeCreate(newTransaction);

        dispatch({
          type: ADD_TRANSACTION,
          payload: createdTransaction,
        });

        showSuccess("تراکنش شما با موفقیت ثبت شد");
        return createdTransaction;
      } catch (error) {
        console.error("خطا در افزودن تراکنش:", error);
        throw error;
      }
    },
    [executeCreate]
  );

  const deleteTransaction = useCallback(
    async id => {
      try {
        await executeDelete(id);

        dispatch({
          type: DELETE_TRANSACTION,
          payload: id,
        });

        showSuccess("تراکنش شما با موفقیت حذف شد");
      } catch (error) {
        console.error("خطا در حذف تراکنش:", error);
        throw error;
      }
    },
    [executeDelete]
  );

  const updateTransaction = useCallback(
    async (id, updatedData) => {
      try {
        const updated = await executeUpdate(id, updatedData);

        dispatch({
          type: UPDATE_TRANSACTION,
          payload: { id, data: updated },
        });

        showSuccess("تراکنش شما با موفقیت ویرایش شد");
        return updated;
      } catch (error) {
        console.error("خطا در ویرایش تراکنش:", error);
        throw error;
      }
    },
    [executeUpdate]
  );

  const isLoading =
    isFetchingTransactions || isCreating || isUpdating || isDeleting;

  const error = fetchError || createError || updateError || deleteError;

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
