import classes from "./SideBar.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../store/product-context";
const Subside: React.FC = () => {
  const prodCtx = useContext(ProductContext);
  return (
    <>
      <div className={classes.group}>
        {["All", "UI", "UX", "Enhancement", "Bug", "Feature"].map((arr) => (
          <button
            type="button"
            key={arr}
            className={prodCtx.type === arr.toLowerCase() ? classes.active : ""}
            onClick={() => prodCtx.typeHandler(arr.toLowerCase())}
          >
            {arr}
          </button>
        ))}
      </div>
      <div className={classes.list}>
        <span className={classes.top}>
          <h3>Roadmap</h3>
          <Link to={"/roadmap"}>View</Link>
        </span>
        <ul>
          {["planned", "in-progress", "live"].map((arr) => (
            <li key={arr}>
              <p>
                <span className={classes.dot}></span>
                {arr}
              </p>
              <h4>
                {
                  prodCtx.filterData.filter(({ status }) => status === arr)
                    .length
                }
              </h4>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Subside;
