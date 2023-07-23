import { ProductRequest } from "../types/Data";
import classes from "./Column.module.css";
import Card from "./UI/Card";
const Column: React.FC<{
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
        ?.map((k, index) => (
          <Card
            title={k.title}
            key={index}
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

export default Column;
