import classes from "./Feedback.module.css";
import List from "../components/UI/List";
import Comment from "../components/Comment";
import Back from "../components/UI/Back";
import { Link } from "react-router-dom";
import { Comment_, User } from "../types/Data";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import data from "../lib/data.json";
import ProductContext from "../store/product-context";
import { modifiedLink } from "../lib/link-helper";
const data_ = data;
const Feedback: React.FC = () => {
  const user: User = data_.currentUser;
  const productCtx = useContext(ProductContext);

  const [comment, setComment] = useState<{ val: string; isValid: boolean }>({
    val: "",
    isValid: false,
  });
  const params = useParams();
  const filter = productCtx.data.filter(
    ({ title }) => modifiedLink(title) === params.feedback
  );
  const findData = productCtx.data.find(
    ({ title }) => modifiedLink(title) === params.feedback
  );

  const maxChar = 250;
  const handleComment = (e: React.KeyboardEvent) => {
    const textarea = e.target as HTMLTextAreaElement;
    setComment((prevState) => {
      if (textarea.value.length < maxChar) {
        prevState.val = textarea.value;
      } else {
        prevState.val = textarea.value.substring(0, maxChar);
      }
      return { ...prevState };
    });
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.val == "") {
      setComment({ ...comment, isValid: true });
      return;
    }
    const payload: Comment_ = {
      id: new Date().toISOString(),
      content: comment.val,
      user: user,
    };
    productCtx.addComment(findData?.title, payload);
    setComment({ val: "", isValid: false });
  };
  return (
    <div className={classes.container}>
      <header className={classes.top}>
        <Back />
        <Link
          to={`/edit/${params.feedback}`}
          className={classes.edit}
          type="button"
        >
          Edit Feedback
        </Link>
      </header>
      <main className={classes.section}>
        {filter?.map(
          ({ title, category, description, upvotes, id, comments }) => (
            <List
              key={id}
              title={title}
              category={category}
              description={description}
              upvotes={upvotes}
              comments={comments}
            />
          )
        )}
        <section>
          {filter?.map(({ comments, id }) => (
            <>
              <h1 className={classes.h1} key={id}>
                {comments?.length} comment
                {comments?.length === undefined ? "" : "s"}
              </h1>
              <Comment data={comments} key={id} />
            </>
          ))}
        </section>
        <form
          className={classes["add-comment"]}
          onSubmit={(e) => submitHandler(e)}
        >
          <label htmlFor="add-comment" className={classes.h1}>
            Add comment
          </label>
          <textarea
            name="add-comment"
            placeholder="Type comment here"
            value={comment.val}
            onChange={(e) => setComment({ ...comment, val: e.target.value })}
            onKeyDown={(e) => handleComment(e)}
          ></textarea>
          <div className={classes.footer}>
            <p>
              {maxChar - comment.val.length} character{maxChar <= 1 ? "" : "s"}{" "}
              left
            </p>
            <button type="submit" disabled={comment.val.length > 250}>
              Post comment
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
export default Feedback;
