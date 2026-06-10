import { formatNumber } from "../../utils/formatNumber";
import { formatPersianDate } from "../../utils/formatPersainDate";
import { useEffect, useState, useRef } from "react";
import Buttons from "../Buttons/Buttons";
import dotsIcon from "../../assets/svgs/dotsIcon.svg";
import editIcon from "../../assets/svgs/editIcon.svg";
import deleteIcon from "../../assets/svgs/deleteIcon.svg";
import styled from "./TransactionsRow.module.css";

function TransactionsRow({ data, onDelete, onEdit }) {
  const isIncome = data.type === "income";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuDirection, setMenuDirection] = useState("down");

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit();
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete();
  };

  const calculateMenuDirection = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const menuHeight = 100;

      return spaceBelow < menuHeight + 10 ? "up" : "down";
    }
    return "down";
  };

  const handleMenuToggle = () => {
    if (!isMenuOpen) {
      const direction = calculateMenuDirection();
      setMenuDirection(direction);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);
  return (
    <div className={styled.row}>
      <span className={styled.dateCell}>{formatPersianDate(data.date)}</span>

      <span className={isIncome ? styled.income : styled.empty}>
        {isIncome ? `${formatNumber(data.amount)}+` : ""}
        <span className={styled.currency}>تومان</span>
      </span>

      <span className={!isIncome ? styled.expense : styled.empty}>
        {!isIncome ? `${formatNumber(data.amount)}-` : ""}
        <span className={styled.currency}>تومان</span>
      </span>

      <span className={styled.descriptionCell} title={data.description}>
        {data.description}
      </span>

      <div className={styled.actionsCell}>
        <div className={styled.menuContainer} ref={menuRef}>
          <div ref={buttonRef}>
            <Buttons
              onClick={handleMenuToggle}
              title={""}
              label={"منو"}
              style={styled.actionMenu}
              icon={dotsIcon}
            />
          </div>

          {isMenuOpen && (
            <div
              className={`${styled.menuDropdown} ${
                menuDirection === "up" ? styled.menuUp : styled.menuDown
              }`}
            >
              <Buttons
                onClick={handleEdit}
                title={"ویرایش"}
                label={"ویرایش"}
                style={styled.editBtn}
                icon={editIcon}
              />
              <Buttons
                onClick={handleDelete}
                title={"حذف"}
                label={"حذف"}
                style={styled.trashBtn}
                icon={deleteIcon}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionsRow;
