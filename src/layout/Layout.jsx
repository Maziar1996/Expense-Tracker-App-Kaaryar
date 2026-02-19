import { Outlet } from "react-router-dom";
import styled from "./layout.module.css";
import Header from "../components/Header/Header";

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
