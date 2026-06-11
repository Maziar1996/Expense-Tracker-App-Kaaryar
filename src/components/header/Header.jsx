import { useAuth } from "../../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";

import logoImage from "../../assets/svgs/logoImage.svg";
import logoText from "../../assets/svgs/logoText.svg";
import exitIcon from "../../assets/svgs/exitIcon.svg";
import styled from "./Header.module.css";
function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styled.header}>
      <nav className={styled.nav}>
        <div className={styled.logo}>
          <img src={logoImage} alt="logo-image" />
          <img src={logoText} alt="logo-text" />
        </div>

        <div className={styled.navBar}>
          <ul className={styled.navList}>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? `${styled.link} ${styled.active}` : styled.link
                }
              >
                داشبورد
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/expenses"
                className={({ isActive }) =>
                  isActive ? `${styled.link} ${styled.active}` : styled.link
                }
              >
                لیست هزینه ها
              </NavLink>
            </li>

            <li className={styled.exitLink}></li>
          </ul>
          <div className={styled.exitContainer}>
            <button onClick={handleLogout} aria-label="خروج">
              <img src={exitIcon} alt="" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
