import CheckIcon from "../icons/CheckIcon";
import classes from "./ListDropdown.module.css";
const ListDropdown: React.FC<{
  value: string;
  array: string[];
  onClick: (val: string) => void;
}> = ({ array, onClick, value }) => {
  return (
    <>
      {array.map((li) => (
        <li
          className={classes.li}
          key={li}
          role="option"
          onClick={() => onClick(li)}
        >
          {li}
          <i>{value === li ? <CheckIcon /> : ""}</i>
        </li>
      ))}
    </>
  );
};
export default ListDropdown;
