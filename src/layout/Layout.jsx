import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import styled from "./Layout.module.css";

function Layout() {
  return (
    <div className={styled.layout}>
      <Header />
      <main className={styled.main}>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
