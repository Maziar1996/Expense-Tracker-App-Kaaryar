import { NavLink } from "react-router-dom";
import LogoIcon from "../Icons/LogoIcon";
import LogoText from "../Icons/LogoText";
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
              <NavLink to="/dashboard" className={styled.link}>
                داشبورد
              </NavLink>
            </li>

            <li>
              <NavLink to="/expenses" className={styled.link}>
                لیست هزینه ها
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
export default Header;
