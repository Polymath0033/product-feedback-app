import classes from "./Card.module.css";
import ArrowUp from "../icons/ArrowUp";
import Comment from "../icons/Comment";
import { Link } from "react-router-dom";
import { modifiedLink } from "../../lib/link-helper";
const Card: React.FC<{
  title: string;
  status: string;
  category: string;
  description: string;
  upvotes: number;
  commentLength: number | undefined;
}> = ({ title, status, category, description, upvotes, commentLength }) => {
  const style =
    status === "planned"
      ? "#F49F85"
      : status === "in-progress"
      ? "#AD1FEA"
      : status === "live"
      ? "#62BCFA"
      : "#000";

  return (
    <Link
      to={`/detail/${modifiedLink(title)}`}
      className={classes.card}
      style={{
        borderColor: style,
      }}
    >
      <span aria-description="status" className={classes.status}>
        <i style={{ backgroundColor: style }}></i>
        {status}
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
      <span className={classes.feature}>{category}</span>
      <div className={classes.last}>
        <button className={classes.feature} role="button">
          <i>
            <ArrowUp />
          </i>
          {upvotes}
        </button>
        <span>
          <Comment />
          {commentLength}
        </span>
      </div>
    </Link>
  );
};
export default Card;
