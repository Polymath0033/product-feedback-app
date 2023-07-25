import classes from "./Roadmap.module.css";
import Back from "../components/UI/Back";
import BtnLink from "../components/UI/Button";
import Column from "../components/Column";
import { useContext } from "react";
import ProductContext from "../store/product-context";
import { useState } from "react";
const Roadmap: React.FC = () => {
  const prodCtx = useContext(ProductContext);
  const [active, setActive] = useState("planned");
  const clickHandler = (str: string) => {
    setActive(str);
  };
  const style =
    active === "planned"
      ? "#F49F85"
      : active === "in-progress"
      ? "#AD1FEA"
      : active === "live"
      ? "#62BCFA"
      : "";
  return (
    <div className={classes.roadmap}>
      <header className={classes.header}>
        <div className={classes.left}>
          <Back />
          <h2>Roadmap</h2>
        </div>
        <BtnLink to="/add-feedback" value="Add Feedback" />
      </header>
      <ul className={classes.subheader}>
        {[
          { title: "planned", summary: "Ideas prioritized for research" },
          { title: "in-progress", summary: "Currently being developed" },
          { title: "live", summary: "Released Features" },
        ].map((arr) => (
          <li
            onClick={() => clickHandler(arr.title.toLowerCase())}
            className={active === arr.title.toLowerCase() ? classes.active : ""}
            style={{ borderColor: style }}
          >
            {arr.title}(
            {prodCtx.data.filter(({ status }) => status === arr.title).length})
          </li>
        ))}
      </ul>
      <main className={classes.main}>
        {[
          { title: "planned", summary: "Ideas prioritized for research" },
          { title: "in-progress", summary: "Currently being developed" },
          { title: "live", summary: "Released Features" },
        ].map(({ title, summary }, index) => (
          <Column
            title={title}
            key={index}
            summary={summary}
            data={prodCtx.data}
            active={active}
          />
        ))}
      </main>
    </div>
  );
};
export default Roadmap;
