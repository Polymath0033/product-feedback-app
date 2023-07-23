import classes from "../Comment.module.css";
import useImage from "../../hooks/use-image";
import { Reply_ } from "../../types/Data";
import Reply from "../Reply";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../../store/product-context";
import ReplyInput from "../ReplyInpt";
import json from "../../lib/data.json";
const { currentUser } = json;
const CommentList: React.FC<{
  id: string | number;
  name: string;
  username: string;
  image: string;
  content: string;
  replies?: Reply_[];
}> = ({ name, username, image, content, replies, id }) => {
  const image_ = useImage();
  const title_ = useParams();
  const prodCtx = useContext(ProductContext);
  const filterData = prodCtx.data.find(
    ({ title }) => title === title_.feedback
  );
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

    prodCtx.addReply(reply, filterData?.title, id);
    setFormInput("");
  };

  return (
    <li className={classes.comment__list_li}>
      <div className={classes["image-wrapper"]}>
        <img src={image_.image(image)} alt={username} />
      </div>
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
        <p className={classes.paragraph}>{content}</p>
        <Reply replies={replies} title={filterData?.title} id={id} />
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
export default CommentList;
