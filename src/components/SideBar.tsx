import { useState, useContext } from "react";
import classes from "./SideBar.module.css";
import tab from "../assets/shared/mobile/icon-hamburger.svg";
import cancel from "../assets/shared/mobile/icon-close.svg";
import Subside from "./Subside";
import ProductContext from "../store/product-context";
const SideBar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const tabHandler = () => {
    setShow(!show);
  };
  const prodCtx = useContext(ProductContext);
  return (
    <aside>
      <div className={classes.bg}>
        <div>
          <h3>Frontend Mentor</h3>
          <p>Feedback board</p>
        </div>
        <button type="button" role="button" onClick={tabHandler}>
          <img
            src={show ? cancel : tab}
            alt={show ? "close-icon" : "hamburger-icon"}
          />
        </button>
      </div>
      {prodCtx.mobile ? (
        <>
          {show && (
            <div className={classes.backdrop} onClick={tabHandler}></div>
          )}
          {show && (
            <div className={classes.subside}>
              <Subside onClick={tabHandler} />
            </div>
          )}
        </>
      ) : (
        <Subside />
      )}
    </aside>
  );
};

export default SideBar;
