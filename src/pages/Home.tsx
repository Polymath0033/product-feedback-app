import Header from "../components/Header";
import SideBar from "../components/SideBar";
import classes from "./Home.module.css";
import List from "../components/UI/List";
import BtnLink from "../components/UI/Button";
import Empty from "../assets/suggestions/illustration-empty.svg";
import { useContext } from "react";
import ProductContext from "../store/product-context";
const Home: React.FC = () => {
  const prodCtx = useContext(ProductContext);
  return (
    <>
      <div className={classes.div}>
        <SideBar />
        <main className={classes.main}>
          <Header
            length={
              prodCtx.filterData?.filter(
                ({ status }) => status === "suggestion"
              ).length
            }
          />
          {prodCtx.filterData?.length === 0 ? (
            <section className={classes.empty}>
              <img src={Empty} alt="Empty Avatar" />
              <div>
                <h1>There is no feedback yet</h1>
                <p>
                  Got a suggestion? Found a bug that needs to be squashed? We
                  love hearing about new ideas to improve our app.
                </p>
              </div>
              <BtnLink to={"/add-feedback"} value="Add Feedback" />
            </section>
          ) : (
            <ul className={classes.ul}>
              {prodCtx.filterData
                ?.filter(({ status }) => status === "suggestion")
                .map((product) => (
                  <List
                    title={product.title}
                    category={product.category}
                    description={product.description}
                    upvotes={product.upvotes}
                    comments={product.comments}
                    key={product.id}
                    id={product.id}
                  />
                ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
