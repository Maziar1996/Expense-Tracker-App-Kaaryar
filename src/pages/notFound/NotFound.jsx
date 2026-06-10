import notFoundImage from "../../assets/svgs/NotFoundImage.svg";
import styled from "./NotFound.module.css";

function NotFound() {
  return (
    <>
      <div className={styled.container}>
        <img src={notFoundImage} alt="NotFound" />
        <h2>صفحه مورد نظر یافت نشد!</h2>
      </div>
    </>
  );
}
export default NotFound;
