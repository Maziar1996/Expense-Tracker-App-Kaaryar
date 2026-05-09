import TransactionModal from "../TransactionModal/TransactionModal";
import TransactionForm from "../TransactionForm/TransactionForm";

function EditTransactionModal({ onClose, onUpdate, transaction }) {
  const handleSubmit = transactionData => {
    const updatedTransaction = {
      ...transactionData,
      id: transaction.id,
    };

    onUpdate(updatedTransaction.id, updatedTransaction);

    onClose();
  };

  return (
    <TransactionModal title="ویرایش تراکنش" onClose={onClose}>
      <TransactionForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        initialData={transaction}
        submitButtonText="ثبت تغییرات"
      />
    </TransactionModal>
  );
}

export default EditTransactionModal;
