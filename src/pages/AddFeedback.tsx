import add from "../assets/shared/icon-new-feedback.svg";
import Back from "../components/UI/Back";
import classes from "./AddFeedback.module.css";
import ArrowUp from "../components/icons/ArrowUp";
import { useState, useContext } from "react";
import Backdrop from "../components/UI/Backdrop";
import ListDropdown from "../components/UI/ListDropdown";
import { ProductRequest } from "../types/Data";
import { useNavigate } from "react-router-dom";
import ProductContext from "../store/product-context";
let formIsValid = false;
const AddFeedback: React.FC = () => {
  const productCtx = useContext(ProductContext);
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [value, setValue] = useState<string>("Feature");
  const [title, setTitle] = useState<{ val: string; isValid: boolean }>({
    val: "",
    isValid: false,
  });
  const [detail, setDetail] = useState<{ val: string; isValid: boolean }>({
    val: "",
    isValid: false,
  });
  const clickHandler = (value: string) => {
    setValue(value);
    setDropdown(!dropdown);
  };
  const validateForm = () => {
    if (title.val.length !== 0) {
      setTitle({ ...title, isValid: true });
      return false;
    }
    if (detail.val.length < 10) {
      setDetail({ ...detail, isValid: true });
      return false;
    }
    return true;
  };
  const cancelHandler = () => {
    setTitle({ val: "", isValid: false });
    setValue("Feature");
    setDetail({ val: "", isValid: false });
  };
  const submitHandler: (e: React.FormEvent) => void = (e) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   formIsValid = true;
    //   return;
    // }
    const payload: ProductRequest = {
      id: new Date().toISOString(),
      upvotes: 0,
      category: value.toLowerCase(),
      title: title.val.charAt(0).toUpperCase() + title.val.slice(1),
      description: detail.val,
      status: "suggestion",
    };
    productCtx.addFeedback(payload);

    navigate("/");
  };
  return (
    <main className={classes["main"]}>
      <Back />
      <section className={classes.section}>
        <img src={add} alt="Add feedback" />
        <h1>Create new feedback</h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className={classes["form-control"]}>
            <label htmlFor="title">Feedback title</label>
            <span>Add a short, descriptive headline</span>
            <input
              type="text"
              name="title"
              title="title"
              value={title.val}
              onChange={(e) => setTitle({ ...title, val: e.target.value })}
            />
          </div>
          <div className={classes["form-control"]}>
            <label>category</label>
            <span>Choose a category for your feedback</span>
            <button className={classes.feature} type="button" title="category">
              {value}
              <i
                onClick={() => setDropdown(!dropdown)}
                style={{
                  transform: dropdown === false ? `rotate(${180}deg)` : "",
                }}
              >
                <ArrowUp />
              </i>
              {dropdown === true && (
                <Backdrop onClick={() => setDropdown(false)} />
              )}
              {dropdown && (
                <ul role="listbox" title="category">
                  <ListDropdown
                    array={["Feature", "UI", "UX", "Enhancement", "Bug"]}
                    value={value}
                    onClick={clickHandler}
                  />
                </ul>
              )}
            </button>
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="detail">Feedback details</label>
            <span>
              Include any specific comments on what should be improved, added,
              etc.
            </span>
            <textarea
              title="detail"
              value={detail.val}
              onChange={(e) => setDetail({ ...detail, val: e.target.value })}
              name="detail"
            ></textarea>
          </div>
          <div className={classes.button}>
            <button type="reset" onClick={cancelHandler}>
              Cancel
            </button>
            <button type="submit">Add feedback</button>
          </div>
        </form>
      </section>
    </main>
  );
};
export default AddFeedback;
