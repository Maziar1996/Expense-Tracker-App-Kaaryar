import { createContext, useReducer, useContext, useEffect } from "react";

const ADD_TRANSACTION = "ADD_TRANSACTION";
const DELETE_TRANSACTION = "DELETE_TRANSACTION";
const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
const STORAGE_KEY = "expense-tracker-transactions";

const initialState = {
  transactions: loadFromStorage(),
};

function transactionReducer(state, action) {
  let newItem;
  switch (action.type) {
    case ADD_TRANSACTION:
      newItem = {
        ...action.payload,
        id: action.payload.id || Date.now(),
      };
      return {
        ...state,
        transactions: [newItem, ...state.transactions],
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    case UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id
            ? { ...transaction, ...action.payload.data }
            : transaction
        ),
      };

    default:
      return state;
  }
}
function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error reading the localStorage:", error);
  }
  return [];
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
    } catch (error) {
      console.error("Error saving in localStorage:", error);
    }
  }, [state.transactions]);

  const value = {
    transactions: state.transactions,
    dispatch,

    addTransaction: newTransaction =>
      dispatch({ type: ADD_TRANSACTION, payload: newTransaction }),
    deleteTransaction: id =>
      dispatch({ type: DELETE_TRANSACTION, payload: id }),

    updateTransaction: (id, updatedData) =>
      dispatch({
        type: UPDATE_TRANSACTION,
        payload: { id, data: updatedData },
      }),
  };
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}
