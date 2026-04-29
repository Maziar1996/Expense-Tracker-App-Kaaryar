import styled from "./notFound.module.css";
import NotFoundIcon from "../../components/Icons/404Icon";

function NotFound() {
  return (
    <>
      <div className={styled.container}>
        <NotFoundIcon />
        <h2>صفحه مورد نظر یافت نشد!</h2>
      </div>
    </>
  );
}
export default NotFound;
