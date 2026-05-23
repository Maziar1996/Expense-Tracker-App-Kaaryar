import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../../assets/svgs/Icon";
import styled from "./Header.module.css";
import { useAuth } from "../../Context/AuthContext";
import Buttons from "../Buttons/Buttons";

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
          <Icon name="LogoIcon" className={styled.logoIcon} />
          <Icon name="LogoText" className={styled.logoText} />
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
            <Buttons
              onClick={handleLogout}
              icon={<Icon name="ExitIcon" />}
              label="خروج"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
