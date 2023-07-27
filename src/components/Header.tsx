import classes from "./Header.module.css";
import logo from "../assets/suggestions/icon-suggestions.svg";
import Dropdown from "./Dropdown";
import { useState, useContext } from "react";
import ArrowUp from "./icons/ArrowUp";
import BtnLink from "./UI/Button";
import ProductContext from "../store/product-context";
const Header: React.FC<{
  length: number;
}> = ({ length }) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [header, setHeader] = useState<string>("most upvotes");
  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };
  const prodCtx = useContext(ProductContext);
  const clickHandler = (value: string) => {
    setHeader(value);
    dropdownHandler();
  };
  return (
    <>
      <header className={classes.header}>
        <div className={classes.left}>
          <img src={logo} alt="logo" />
          <h1>
            {length} Suggestion{length < 2 ? "" : "s"}
          </h1>
          <div className={classes.div}>
            <p onClick={dropdownHandler}>Sort by:</p>
            <span>{header}</span>
            <i
              onClick={dropdownHandler}
              style={{
                transform: dropdown === false ? `rotate(${180}deg)` : "",
              }}
            >
              <ArrowUp stroke="#fff" />
            </i>
            {dropdown && (
              <Dropdown
                onClick={clickHandler}
                onDropdown={() => setDropdown(!dropdown)}
                header={header}
                sortHandler={prodCtx.sortHandler}
                list={[
                  "most upvotes",
                  "least upvotes",
                  "most comments",
                  "least comments",
                ]}
              />
            )}
          </div>
        </div>
        <BtnLink to={"/add-feedback"} value="Add Feedback" />
      </header>
    </>
  );
};

export default Header;
