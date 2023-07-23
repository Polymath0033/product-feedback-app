import classes from "./Comment.module.css";
import { Comment_ } from "../types/Data";
import CommentList from "./UI/CommentList";
//import { useState } from "react";
const Comment: React.FC<{
  data?: Comment_[];
}> = ({ data }) => {
  return (
    <ul className={classes.comment__list}>
      {data?.map((data_, index) => (
        <CommentList
          id={data_.id}
          key={index}
          content={data_.content}
          username={data_.user.username}
          name={data_.user.name}
          image={data_.user.image}
          replies={data_.replies}
        />
      ))}
    </ul>
  );
};

export default Comment;
