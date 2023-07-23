import useImage from "../../hooks/use-image";
import classes_ from "../Reply.module.css";
import classes from "../Comment.module.css";
import { useState, useContext } from "react";
import ReplyInput from "../ReplyInpt.tsx";
import ProductContext from "../../store/product-context.tsx";
import jsonData from "../../lib/data.json";
const { currentUser } = jsonData;
import { Reply_ } from "../../types/Data.ts";
const ReplyList: React.FC<{
  image: string;
  username: string;
  name: string;
  content: string;
  replyingTo: string;
  title: string | undefined;
  commentId: string | number | undefined;
}> = ({ image, username, name, content, replyingTo, title, commentId }) => {
  const image__ = useImage();
  const prodCtx = useContext(ProductContext);
  const [toggleReply, setToggleReply] = useState<boolean>(false);
  const toggleHandler = () => {
    setToggleReply((prevState) => (prevState = !toggleReply));
  };
  const [formInput, setFormInput] = useState<string>("");
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormInput(e.target.value);
  };
  const submitHandler = () => {
    const reply: Reply_ = {
      content: formInput,
      replyingTo: username,
      user: currentUser,
    };
    prodCtx.addReply(reply, title, commentId);
  };
  return (
    <li>
      <img src={image__.image(image)} alt={username} />
      <div className={classes.comment__container}>
        <div className={classes.header}>
          <div className={classes.name}>
            <h4>{name}</h4>
            <p>@{username}</p>
          </div>
          <button type="button" onClick={toggleHandler}>
            Reply
          </button>
        </div>
        <p className={classes.paragraph}>
          <span className={classes_["replying-to"]}>@{replyingTo}</span>
          {content}
        </p>
        {toggleReply && (
          <ReplyInput
            onChange={changeHandler}
            formInput={formInput}
            toggleHandler={toggleHandler}
            addReply={submitHandler}
          />
        )}
      </div>
    </li>
  );
};
export default ReplyList;
