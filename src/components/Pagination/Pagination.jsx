import { useMemo } from "react";
import Buttons from "../Buttons/Buttons";
import styles from "./Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const safeTotalPages = Math.max(1, totalPages || 1);

  const safeCurrentPage = Math.min(
    Math.max(currentPage || 1, 1),
    safeTotalPages
  );

  const pageNumbers = useMemo(() => {
    if (safeTotalPages <= 5) {
      return Array.from({ length: safeTotalPages }, (_, index) => index + 1);
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, "...", safeTotalPages];
    }

    if (safeCurrentPage >= safeTotalPages - 2) {
      return [1, "...", safeTotalPages - 2, safeTotalPages - 1, safeTotalPages];
    }

    return [
      1,
      "...",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "...",
      safeTotalPages,
    ];
  }, [safeCurrentPage, safeTotalPages]);

  const handlePreviousPage = () => {
    if (safeCurrentPage > 1) {
      onPageChange(safeCurrentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (safeCurrentPage < safeTotalPages) {
      onPageChange(safeCurrentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.pagination} aria-label="صفحه‌بندی تراکنش‌ها">
      <button
        onClick={handlePreviousPage}
        disabled={safeCurrentPage === 1}
        className={styles.paginationBtnChevron}
        type="button"
        aria-label="صفحه قبل"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.10154 11.0157V12.0725C4.10154 12.1641 4.20682 12.2147 4.27791 12.1587L10.4412 7.3448C10.4936 7.30408 10.5359 7.25193 10.5651 7.19234C10.5942 7.13275 10.6094 7.06729 10.6094 7.00095C10.6094 6.93461 10.5942 6.86915 10.5651 6.80956C10.5359 6.74997 10.4936 6.69783 10.4412 6.6571L4.27791 1.84324C4.20545 1.78718 4.10154 1.83777 4.10154 1.92937V2.98621C4.10154 3.0532 4.13299 3.11746 4.18494 3.15847L9.10682 7.00027L4.18494 10.8434C4.13299 10.8844 4.10154 10.9487 4.10154 11.0157Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {pageNumbers.map((pageNum, index) => {
        if (pageNum === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className={styles.paginationEllipsis}
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const isActive = safeCurrentPage === pageNum;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`${styles.paginationBtn} ${
              isActive ? styles.active : ""
            }`}
            aria-label={`صفحه ${pageNum}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNum.toLocaleString("fa-IR")}
          </button>
        );
      })}

      <button
        onClick={handleNextPage}
        disabled={safeCurrentPage === safeTotalPages}
        className={styles.paginationBtnChevron}
        type="button"
        aria-label="صفحه بعد"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.53146 7.34442L9.69473 12.1583C9.71083 12.171 9.73019 12.1789 9.75057 12.181C9.77095 12.1832 9.79153 12.1796 9.80995 12.1706C9.82836 12.1616 9.84387 12.1476 9.85469 12.1302C9.8655 12.1128 9.87119 12.0927 9.87109 12.0722V11.0153C9.87109 10.9483 9.83965 10.8841 9.78769 10.8431L4.86583 6.99989L9.78769 3.15673C9.84101 3.11571 9.87109 3.05146 9.87109 2.98446V1.92763C9.87109 1.83603 9.76582 1.78544 9.69473 1.84149L3.53146 6.65536C3.47908 6.69622 3.4367 6.74849 3.40755 6.80819C3.37841 6.8679 3.36326 6.93346 3.36326 6.99989C3.36326 7.06633 3.37841 7.13189 3.40755 7.19159C3.4367 7.25129 3.47908 7.30356 3.53146 7.34442Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </nav>
  );
}

export default Pagination;
