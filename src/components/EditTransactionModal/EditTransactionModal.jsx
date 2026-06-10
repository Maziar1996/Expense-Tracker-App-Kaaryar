import BaseModal from "../BaseModal/BaseModal";
import TransactionForm from "../TransactionForm/TransactionForm";

function EditTransactionModal({ onClose, onUpdate, transaction }) {
  const handleSubmit = data => {
    onUpdate(transaction.id, data);
    onClose();
  };

  return (
    <BaseModal title="ویرایش تراکنش" onClose={onClose}>
      <TransactionForm
        initialData={transaction}
        onSubmit={handleSubmit}
        onClose={onClose}
        submitText="ثبت تغییرات"
      />
    </BaseModal>
  );
}

export default EditTransactionModal;
