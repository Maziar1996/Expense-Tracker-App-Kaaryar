import { Link } from "react-router-dom";
import LogoIcon from "../icons/LogoIcon";
import LogoText from "../icons/LogoText";
import styled from "./header.module.css";
function Header() {
  return (
    <header className={styled.header}>
      <nav className={styled.nav}>
        <div className={styled.logo}>
          <LogoIcon />
          <LogoText />
        </div>
        <div className={styled.navBar}>
          <ul className={styled.navList}>
            <li className={styled.active}>
              <Link to="dashboard" className={styled.link}>
                داشبورد
              </Link>
            </li>

            <li>
              <Link to="expenses" className={styled.link}>
                لیست هزینه ها
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
export default Header;
