import classes from "../Comment.module.css";
import { Reply_ } from "../../types/Data";
import Reply from "../Reply";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../../store/product-context";
import ReplyInput from "../ReplyInpt";
import json from "../../lib/data.json";
import { modifiedImage } from "../../lib/image-helper";
import { modifiedLink } from "../../lib/link-helper";
const { currentUser } = json;
const CommentList: React.FC<{
  id: string | number;
  name: string;
  username: string;
  image: string;
  content: string;
  replies?: Reply_[];
}> = ({ name, username, image, content, replies, id }) => {
  const title_ = useParams();
  const prodCtx = useContext(ProductContext);
  const filterData = prodCtx.data.find(
    ({ title }) => modifiedLink(title) === title_.feedback
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
      <div className={classes["mobile-top"]}>
        <div className={classes.left__}>
          <img src={modifiedImage(image)} alt={username} />
          <div className={classes.name}>
            <h4>{name}</h4>
            <p>@{username}</p>
          </div>
        </div>
        <button type="button" onClick={toggleHandler}>
          Reply
        </button>
      </div>
      <div className={classes.down}>
        <div className={classes["comment-div1"]}></div>
        <div className={classes.para_graph}>
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
        <div className={classes.div_3}></div>
      </div>
    </li>
  );
};
export default CommentList;
