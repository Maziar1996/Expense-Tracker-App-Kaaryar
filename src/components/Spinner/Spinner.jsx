import styled from "./Spinner.module.css";
function Spinner() {
  return (
    <div className={styled.loadingPage}>
      <span className={styled.loader}></span>
      <span className={styled.text}>در حال بارگذاری...</span>
    </div>
  );
}
export default Spinner;
