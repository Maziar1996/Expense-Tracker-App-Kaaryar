import { formatNumber } from "../../utils/formatNumber";
import { formatPersianDate } from "../../utils/formatPersainDate";
import { useEffect, useState, useRef } from "react";
import Buttons from "../Buttons/Buttons";
import Icon from "../../assets/svgs/Icon";
import styled from "./TransactionsRow.module.css";
function TransactionsRow({ data, onDelete, onEdit }) {
  const isIncome = data.type === "income";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit();
  };
  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete();
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
          <Buttons
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            title={""}
            label={"منو"}
            style={styled.actionMenu}
            icon={<Icon name="DotsVector" sizeW={5} sizeH={15} />}
          />

          {isMenuOpen && (
            <div className={styled.menuDropdown}>
              <Buttons
                onClick={handleEdit}
                title={"ویرایش"}
                label={"ویرایش"}
                style={styled.editBtn}
                icon={<Icon name="EditIcon" />}
              />
              <Buttons
                onClick={handleDelete}
                title={"حذف"}
                label={"حذف"}
                style={styled.trashBtn}
                icon={<Icon name="TrashIcon" />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionsRow;
