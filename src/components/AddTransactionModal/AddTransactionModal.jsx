import TransactionModal from "../TransactionModal/TransactionModal";
import TransactionForm from "../TransactionForm/TransactionForm";

function AddTransactionModal({ onClose, onAdd }) {
  const handleSubmit = transactionData => {
    const newTransaction = {
      ...transactionData,
      id: Date.now(),
    };

    onAdd(newTransaction);

    onClose();
  };

  return (
    <TransactionModal title="افزودن تراکنش" onClose={onClose}>
      <TransactionForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitButtonText="ثبت"
      />
    </TransactionModal>
  );
}

export default AddTransactionModal;
