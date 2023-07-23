import classes from "./Roadmap.module.css";
import Back from "../components/UI/Back";
import BtnLink from "../components/UI/Button";
import Column from "../components/Column";
import { useContext } from "react";
import ProductContext from "../store/product-context";
const Roadmap: React.FC = () => {
  const prodCtx = useContext(ProductContext);
  return (
    <div className={classes.roadmap}>
      <header className={classes.header}>
        <div className={classes.left}>
          <Back />
          <h2>Roadmap</h2>
        </div>
        <BtnLink to="/add-feedback" value="Add Feedback" />
      </header>
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
          />
        ))}
      </main>
    </div>
  );
};
export default Roadmap;
