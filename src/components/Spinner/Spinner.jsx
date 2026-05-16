import styled from "./Spinner.module.css";
function Spinner() {
  return (
    <div className={styled.loadingPage}>
      <span className={styled.loader}></span>
    </div>
  );
}
export default Spinner;
