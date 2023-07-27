import { ProductRequest } from "../types/Data";
import classes from "./Column.module.css";
import { useContext } from "react";
import ProductContext from "../store/product-context";
import Card from "./UI/Card";
const Section: React.FC<{
  title: string;
  summary: string;
  data: ProductRequest[];
}> = ({ title, summary, data }) => {
  return (
    <section className={classes.column}>
      <h1 role="columnheader">
        {title} ({data?.filter(({ status }) => status === title).length})
      </h1>
      <p>{summary}</p>

      {data
        ?.filter(({ status }) => status === title)
        ?.map((k) => (
          <Card
            title={k.title}
            key={k.title}
            category={k.category}
            status={title}
            description={k.description}
            upvotes={k.upvotes}
            commentLength={k.comments?.length}
          />
        ))}
    </section>
  );
};
const Column: React.FC<{
  title: string;
  summary: string;
  data: ProductRequest[];
  active: string;
}> = ({ title, summary, data, active }) => {
  const prodCtx = useContext(ProductContext);

  return (
    <>
      {prodCtx.mobile ? (
        <>
          {active === title ? (
            <Section title={title} summary={summary} data={data} />
          ) : (
            ""
          )}
        </>
      ) : (
        <Section title={title} summary={summary} data={data} />
      )}
    </>
  );
};

export default Column;
