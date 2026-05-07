import Icon from "../../assets/svgs/Icon";
import styled from "./NotFound.module.css";

function NotFound() {
  return (
    <>
      <div className={styled.container}>
        <Icon name="NotFound404Icon" className={styled.notFoundIcon} />

        <h2>صفحه مورد نظر یافت نشد!</h2>
      </div>
    </>
  );
}
export default NotFound;
