import { useState, useMemo } from "react";
import { useTransactions } from "../../Context/TransactionContext";
import TransactionsTable from "../../components/TransactionTable/TransactionsTable";
import FilterToolbar from "../../components/FilterToolbar/FilterToolbar";
import Pagination from "../../components/Pagination/Pagination";
import { processTransactions } from "../../utils/transactionFilters";
import AddTransactionModal from "../../components/AddTransactionModal/AddTransactionModal";
import EditTransactionModal from "../../components/EditTransactionModal/EditTransactionModal";
import Buttons from "../../components/Buttons/Buttons";
import Spinner from "../../components/Spinner/Spinner";
import Toast from "../../components/Toast/Toast";
import plusIcon from "../../assets/svgs/plusIcon.svg";
import styled from "./ExpensesPage.module.css";

const ITEMS_PER_PAGE = 10;

function ExpensesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    type: "all",
  });

  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredTransactions = useMemo(() => {
    return processTransactions(transactions, filters, sortBy);
  }, [transactions, filters, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const handlePageChange = pageNumber => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAdd = newTransaction => {
    addTransaction(newTransaction);
  };

  const handleUpdate = (id, updatedTransaction) => {
    updateTransaction(id, updatedTransaction);
  };

  const handleOpenEditModal = transaction => {
    setEditingTransaction(transaction);
  };

  const handleFilterChange = (newFilters, newSort) => {
    const filtersChanged =
      JSON.stringify(newFilters) !== JSON.stringify(filters);
    const sortChanged = newSort !== sortBy;

    if (filtersChanged || sortChanged) {
      setFilters(newFilters);
      setSortBy(newSort);
      setCurrentPage(1);
    }
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
          <h1 className={styled.title}>تراکنش ها</h1>
          <Buttons
            onClick={() => setShowAddModal(true)}
            title="افزودن تراکنش"
            label="افزودن تراکنش"
            style={styled.addTranBtn}
            icon={plusIcon}
          />
        </div>
        <FilterToolbar
          onChange={handleFilterChange}
          className={styled.expensesToolbar}
        />
        <div className={styled.contentWrapper}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <TransactionsTable
                transactions={currentTransactions}
                onDelete={deleteTransaction}
                onEdit={handleOpenEditModal}
              />

              <Pagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
        />
      )}

      {editingTransaction && (
        <EditTransactionModal
          mode="edit"
          onClose={() => setEditingTransaction(null)}
          onUpdate={handleUpdate}
          transaction={editingTransaction}
        />
      )}
    </>
  );
}

export default ExpensesPage;
