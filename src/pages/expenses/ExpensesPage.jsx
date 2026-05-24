import { useState, useMemo } from "react";
import { useTransactions } from "../../Context/TransactionContext";
import TransactionsTable from "../../components/TransactionTable/TransactionsTable";
import AddTransactionModal from "../../components/AddTransactionModal/AddTransactionModal";
import EditTransactionModal from "../../components/EditTransactionModal/EditTransactionModal";
import FilterToolbar from "../../components/FilterToolbar/FilterToolbar";
import { processTransactions } from "../../utils/transactionFilters";

import Buttons from "../../components/Buttons/Buttons";
import Spinner from "../../components/Spinner/Spinner";
import Toast from "../../components/Toast/Toast";

import Icon from "../../assets/svgs/Icon";

import styled from "./ExpensesPage.module.css";

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

  const ITEMS_PER_PAGE = 10;

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

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const isPaginationActive = filteredTransactions.length > ITEMS_PER_PAGE;

  const handlePageChange = pageNumber => {
    if (isPaginationActive && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    return [1, 2, 3, 4, 5];
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
          <Buttons
            onClick={() => setShowAddModal(true)}
            title={"افزودن تراکنش"}
            label={"افزودن تراکنش"}
            style={styled.addTranBtn}
            icon={<Icon name="PlusIcon" />}
          />

          <h1 className={styled.title}>تراکنش ها</h1>
          <div className={styled.filterToolbar}>
            <FilterToolbar onChange={handleFilterChange} />
          </div>
        </div>

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

              <div className={styled.pagination}>
                <Buttons
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || !isPaginationActive}
                  style={styled.paginationBtnChevron}
                  icon={
                    <Icon
                      color={
                        currentPage === totalPages || !isPaginationActive
                          ? "#0b32f4"
                          : "#9BA1A8"
                      }
                      name="ChevronRightIcon"
                    />
                  }
                  aria-label="صفحه قبل"
                />

                {getPageNumbers().map(pageNum => {
                  const isPageAvailable = pageNum <= totalPages;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={!isPaginationActive || !isPageAvailable}
                      className={`${styled.paginationBtn} ${
                        currentPage === pageNum &&
                        isPaginationActive &&
                        isPageAvailable
                          ? styled.active
                          : ""
                      } ${!isPaginationActive || !isPageAvailable ? styled.disabled : ""}`}
                      aria-label={`صفحه ${pageNum}`}
                      aria-current={
                        currentPage === pageNum ? "page" : undefined
                      }
                    >
                      {pageNum.toLocaleString("fa-IR")}
                    </button>
                  );
                })}

                <Buttons
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || !isPaginationActive}
                  style={styled.paginationBtnChevron}
                  icon={
                    <Icon
                      color={
                        currentPage === totalPages || !isPaginationActive
                          ? "#9BA1A8"
                          : "#0b32f4"
                      }
                      name="ChevronLeftIcon"
                    />
                  }
                  aria-label="صفحه بعد"
                />
              </div>
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
          onClose={() => setEditingTransaction(null)}
          onUpdate={handleUpdate}
          transaction={editingTransaction}
        />
      )}
    </>
  );
}

export default ExpensesPage;
