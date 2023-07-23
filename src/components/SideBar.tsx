import { useState, useEffect } from "react";
import classes from "./SideBar.module.css";
import tab from "../assets/shared/mobile/icon-hamburger.svg";
import Subside from "./Subside";
import Backdrop from "./UI/Backdrop";
const SideBar: React.FC = () => {
  const [mobile, setMobile] = useState(false);
  const [show, setShow] = useState<boolean>(true);
  const tabHandler = () => {
    setShow(!tab);
  };
  useEffect(() => {
    const mobileQuery = matchMedia("(max-width:520px)");
    setMobile(mobileQuery.matches);
    const mobileChange = (event: MediaQueryListEvent) => {
      setMobile(event.matches);
    };
    mobileQuery.addListener(mobileChange);
    return () => {
      mobileQuery.removeListener(mobileChange);
    };
  }, []);
  return (
    <aside>
      <div className={classes.bg}>
        <div>
          <h3>Frontend Mentor</h3>
          <p>Feedback board</p>
        </div>
        <button type="button" role="button">
          <img src={tab} alt="tab" />
        </button>
      </div>
      {mobile ? (
        <div className={classes.subside}>
          {show && <Backdrop onClick={tabHandler} />}
          <Subside />
        </div>
      ) : (
        <Subside />
      )}
      {/* <Subside /> */}
    </aside>
  );
};

export default SideBar;
