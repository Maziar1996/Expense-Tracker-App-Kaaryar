import styeld from "./notFound.module.css";
import NotFoundIcon from "../../components/icons/404Icon";
import Header from "../../components/header/Header";
function NotFound() {
  return (
    <>
      <Header />
      <div className={styeld.container}>
        <NotFoundIcon />
        <h2>صفحه مورد نظر یافت نشد!</h2>
      </div>
    </>
  );
}
export default NotFound;
