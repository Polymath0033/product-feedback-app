import classes from "./List.module.css";
import ArrowUp from "../icons/ArrowUp";
import CommentIcon from "../icons/Comment";
import type { Comment_ } from "../../types/Data";
import { Link } from "react-router-dom";
import { modifiedLink } from "../../lib/link-helper";
const List: React.FC<{
  title: string;
  category: string;
  description: string;
  upvotes: number;
  comments?: Comment_[];
  
}> = ({ title, category, description, upvotes, comments}) => {
  return (
    <>
      <Link to={`/detail/${modifiedLink(title)}`} className={classes.li}>
        <div className={classes.left_}>
          <button className={classes.button}>
            <ArrowUp />
            {upvotes}
          </button>
          <div className={classes.content}>
            <h1>{title}</h1>
            <p>{description}</p>
            <span>{category}</span>
          </div>
        </div>
        <div className={classes.right}>
          <CommentIcon />
          <span>{comments?.length === undefined ? 0 : comments?.length}</span>
        </div>
      </Link>
    </>
  );
};

export default List;
