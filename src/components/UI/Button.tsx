import classes from "./Button.module.css";
import { Link } from "react-router-dom";
const BtnLink: React.FC<{ value: string; to: string }> = ({ value, to }) => {
  return (
    <Link className={classes.button} to={to}>
      {value}
    </Link>
  );
};
export default BtnLink;
