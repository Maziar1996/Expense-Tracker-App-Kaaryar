import { useState, useCallback, useReducer } from "react";
import {
  fetchTransactions,
  createTransaction as createTransactionAPI,
  updateTransaction as updateTransactionAPI,
  deleteTransaction as deleteTransactionAPI,
} from "../Services/api";

const SET_TRANSACTIONS = "SET_TRANSACTIONS";
const ADD_TRANSACTION = "ADD_TRANSACTION";
const DELETE_TRANSACTION = "DELETE_TRANSACTION";
const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";

function transactionReducer(state, action) {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return action.payload;

    case ADD_TRANSACTION:
      return [action.payload, ...state];

    case DELETE_TRANSACTION:
      return state.filter(t => t.id !== action.payload);

    case UPDATE_TRANSACTION:
      return state.map(t =>
        t.id === action.payload.id ? { ...t, ...action.payload.data } : t
      );

    default:
      return state;
  }
}

export function useApi() {
  const [transactions, dispatch] = useReducer(transactionReducer, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  const executeOperation = useCallback(
    async (
      apiFunction,
      onSuccess,
      successMsg = null,
      errorMsg = "خطا در انجام عملیات"
    ) => {
      try {
        clearMessages();

        setIsLoading(true);

        const result = await apiFunction();

        if (onSuccess) {
          onSuccess(result);
        }

        if (successMsg) {
          setSuccessMessage(successMsg);
        }

        setIsLoading(false);

        return result;
      } catch (err) {
        const errorMessage = err.message || errorMsg;
        setError(errorMessage);
        setIsLoading(false);
        throw err;
      }
    },
    [clearMessages]
  );

  const loadTransactions = useCallback(async () => {
    return executeOperation(
      () => fetchTransactions(),
      data => dispatch({ type: SET_TRANSACTIONS, payload: data }),
      null,
      "خطا در دریافت تراکنش‌ها. لطفاً اتصال به اینترنت خود را بررسی کنید"
    );
  }, [executeOperation]);

  const addTransaction = useCallback(
    async newTransaction => {
      return executeOperation(
        () => createTransactionAPI(newTransaction),
        created => dispatch({ type: ADD_TRANSACTION, payload: created }),
        "تراکنش شما با موفقیت ثبت شد",
        "خطا در افزودن تراکنش"
      );
    },
    [executeOperation]
  );

  const deleteTransaction = useCallback(
    async id => {
      return executeOperation(
        () => deleteTransactionAPI(id),
        () => dispatch({ type: DELETE_TRANSACTION, payload: id }),
        "تراکنش شما با موفقیت حذف شد",
        "خطا در حذف تراکنش"
      );
    },
    [executeOperation]
  );

  const updateTransaction = useCallback(
    async (id, updatedData) => {
      return executeOperation(
        () => updateTransactionAPI(id, updatedData),
        updated =>
          dispatch({
            type: UPDATE_TRANSACTION,
            payload: { id, data: updated },
          }),
        "تراکنش شما با موفقیت ویرایش شد",
        "خطا در ویرایش تراکنش"
      );
    },
    [executeOperation]
  );

  return {
    transactions,
    isLoading,
    error,
    successMessage,
    loadTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    clearMessages,
  };
}
