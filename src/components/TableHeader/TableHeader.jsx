import styled from "./tableHeader.module.css";

function TableHeader() {
  return (
    <div className={`${styled.row} ${styled.header}`}>
      <span>تاریخ</span>
      <span>درآمد (تومان)</span>
      <span>هزینه (تومان)</span>
      <span>شرح</span>
    </div>
  );
}
export default TableHeader;
