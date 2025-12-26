import styled from "./tableHeader.module.css";

function TableHeader() {
  return (
    <div className={`${styled.row} ${styled.header}`}>
      <span>تاریخ</span>
      <span>(تومان) درآمد</span>
      <span>(تومان) هزینه</span>
      <span>شرح</span>
    </div>
  );
}
export default TableHeader;
