const API_BASE_URL = "http://localhost:3001";
const handleError = (error, persianMessage) => {
  if (error.message === "Failed to fetch") {
    throw new Error("اتصال به اینترنت برقرار نیست، دوباره تلاش کنید");
  }

  throw new Error(persianMessage);
};

export const fetchTransactions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    if (!response.ok) throw new Error("خطا در دریافت تراکنش‌ها");
    return await response.json();
  } catch (error) {
    console.error("خطا در fetchTransactions:", error);
    handleError(error, "خطا در دریافت تراکنش‌ها");
  }
};

export const createTransaction = async transactionData => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    });
    if (!response.ok) throw new Error("خطا در ایجاد تراکنش");
    return await response.json();
  } catch (error) {
    console.error("خطا در createTransaction:", error);
    handleError(error, "خطا در ایجاد تراکنش");
  }
};

export const updateTransaction = async (id, transactionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    });
    if (!response.ok) throw new Error("خطا در ویرایش تراکنش");
    return await response.json();
  } catch (error) {
    console.error("خطا در updateTransaction:", error);
    handleError(error, "خطا در ویرایش تراکنش");
  }
};

export const deleteTransaction = async id => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("خطا در حذف تراکنش");
    return true;
  } catch (error) {
    console.error("خطا در deleteTransaction:", error);
    handleError(error, "خطا در حذف تراکنش");
  }
};
