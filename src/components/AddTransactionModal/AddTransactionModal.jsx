import BaseModal from "../BaseModal/BaseModal";
import TransactionForm from "../TransactionForm/TransactionForm";

function AddTransactionModal({ onClose, onAdd }) {
  const handleSubmit = data => {
    const transaction = {
      ...data,
      id: Date.now(),
    };

    onAdd(transaction);
    onClose();
  };

  return (
    <BaseModal title="افزودن تراکنش" onClose={onClose}>
      <TransactionForm
        onSubmit={handleSubmit}
        onClose={onClose}
        submitText="ثبت"
      />
    </BaseModal>
  );
}

export default AddTransactionModal;
