import classes from "./AddFeedback.module.css";
import edit from "../assets/shared/icon-edit-feedback.svg";
import Back from "../components/UI/Back";
import ArrowUp from "../components/icons/ArrowUp";
import { useState, useReducer, useContext, Reducer } from "react";
import Backdrop from "../components/UI/Backdrop";
import ListDropdown from "../components/UI/ListDropdown";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductContext from "../store/product-context";
import { modifiedLink } from "../lib/link-helper";
let formIsValid = false;
type Action = { type: "feature" } | { type: "roadmap" } | { type: "" };
interface InitialState {
  feature: boolean;
  roadmap: boolean;
}
const initialState: InitialState = { feature: false, roadmap: false };
//@ts-ignore
const reducer: Reducer<InitialState, Action> = (state, action) => {
  if (action.type === "feature") {
    return { ...state, feature: !state.feature };
  } else if (action.type === "roadmap") {
    return { ...state, roadmap: !state.roadmap };
  } else {
    return state;
  }
};
const EditFeedback: React.FC = () => {
  const params = useParams();
  const prodCtx = useContext(ProductContext);
  const filter = prodCtx.data.filter(
    ({ title }) => modifiedLink(title) === params.edit
  );
  let value_ = "";
  let status_ = "";
  let title_ = "";
  let description_ = "";
  let id: string | number = "";
  for (const fil_ of filter) {
    value_ = fil_.category;
    status_ = fil_.status;
    title_ = fil_.title;
    description_ = fil_.description;
    id = fil_.id;
  }
  const [value, setValue] = useState<string>(value_);
  const [status, setStatus] = useState<string>(status_);
  const [title, setTitle] = useState<{ val: string; isValid: boolean }>({
    val: title_,
    isValid: false,
  });
  const [description, setDescription] = useState<{
    val: string;
    isValid: boolean;
  }>({ val: description_, isValid: false });
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const featureDropdown = () => {
    dispatch({ type: "feature" });
  };
  const categoryHandler: (val: string) => void = (val) => {
    setValue(val);
    featureDropdown();
    dispatch({ type: "feature" });
  };
  const roadmapDropdown = () => {
    dispatch({ type: "roadmap" });
  };
  const statusHandler: (val: string) => void = (val) => {
    setStatus(val);
    roadmapDropdown();
    dispatch({ type: "roadmap" });
  };
  const validateForm = () => {
    if (title.val === "") {
      setTitle({ ...title, isValid: true });
      return false;
    }
    if (description.val === "") {
      setDescription({ ...description, isValid: true });
      return false;
    }
    return true;
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      formIsValid = true;
      return;
    }
    const payload: {
      title: string;
      status: string;
      description: string;
      id: string | number;
    } = {
      title: title.val,
      status: status.toLowerCase(),
      description: description.val,
      id: id,
    };
    console.log(payload);
    prodCtx.editFeedback(title_, payload);
    navigate("/");
    console.log(prodCtx.data);
  };
  const cancelHandler = () => {
    setTitle({ val: title_, isValid: false });
    setStatus(status_);
    setDescription({ val: description_, isValid: false });
    setValue(value_);
  };
  const deleteHandler = () => {
    prodCtx.deleteFeedback(title_);
    navigate("/");
  };
  return (
    <main className={classes.main}>
      <Back />
      {filter.map((edit_) => (
        <section className={classes.section} key={edit_.id}>
          <img src={edit} alt="edit" />
          <h1>{title.val}</h1>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className={classes["form-control"]}>
              <label htmlFor="title">Feed title</label>
              <span>Add a short, descriptive headline</span>
              <input
                type="text"
                value={title.val}
                onChange={(e) => setTitle({ ...title, val: e.target.value })}
                name="title"
                title="title"
                className={title.isValid === true ? classes.invalid : ""}
              />
            </div>
            <div className={classes["form-control"]}>
              <label>category</label>
              <span>Choose a category for your feedback</span>
              <button
                className={classes.feature}
                type="button"
                onClick={featureDropdown}
                title="category"
              >
                {value}
                <i
                  style={{
                    transform:
                      state.feature === false ? `rotate(${180}deg)` : "",
                  }}
                >
                  <ArrowUp />
                </i>
                {state.feature === true && (
                  <Backdrop onClick={() => featureDropdown} />
                )}
                {state.feature && (
                  <ul role="listbox" title="category">
                    <ListDropdown
                      array={["Feature", "UI", "UX", "Enhancement", "Bug"]}
                      value={value}
                      onClick={categoryHandler}
                    />
                  </ul>
                )}
              </button>
            </div>
            <div className={classes["form-control"]}>
              <label>Update status</label>
              <span>Change feature state</span>
              <button
                className={classes.feature}
                type="button"
                onClick={roadmapDropdown}
                title="status"
              >
                {status}
                <i
                  style={{
                    transform:
                      state.roadmap === false ? `rotate(${180}deg)` : "",
                  }}
                >
                  <ArrowUp />
                </i>
                {state.roadmap === true && (
                  <Backdrop onClick={() => roadmapDropdown} />
                )}
                {state.roadmap && (
                  <ul role="listbox" title="status">
                    <ListDropdown
                      array={["Suggestion", "Planned", "In-Progress", "Live"]}
                      value={status}
                      onClick={statusHandler}
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
                name="detail"
                onChange={(e) =>
                  setDescription({ ...description, val: e.target.value })
                }
                value={description.val}
                className={description.isValid === true ? classes.invalid : ""}
              ></textarea>
              {description.isValid === true ? (
                <span className={classes["invalid-span"]}>Can't be empty</span>
              ) : (
                ""
              )}
            </div>
            <div className={classes["edit-bottom"]}>
              <button type="button" onClick={deleteHandler}>
                delete
              </button>
              <div>
                <button type="reset" onClick={cancelHandler}>
                  Cancel
                </button>
                <button type="submit">Save changes</button>
              </div>
            </div>
          </form>
        </section>
      ))}
    </main>
  );
};
export default EditFeedback;
