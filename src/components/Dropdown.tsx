import CheckIcon from "./icons/CheckIcon";
import Backdrop from "./UI/Backdrop";
import classes_ from "./UI/ListDropdown.module.css";
import classes from "./Dropdown.module.css";
const Dropdown: React.FC<{
  list: string[];
  header: string;
  onDropdown: () => void;
  onClick: (value: string) => void;
  sortHandler: (sort: string) => void;
}> = ({ list, onDropdown, onClick, header, sortHandler }) => {
  const clickHandler = (e: string) => {
    onClick(e);
    sortHandler(e);
  };
  return (
    <>
      <Backdrop onClick={onDropdown} />
      <ul className={classes.lists}>
        {list.map((li) => (
          <li onClick={() => clickHandler(li)} key={li} className={classes_.li}>
            {li} <i>{header === li ? <CheckIcon /> : ""}</i>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Dropdown;
