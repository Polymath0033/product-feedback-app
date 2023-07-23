import classes from "./Reply.module.css";
const ReplyInput: React.FC<{
  toggleHandler: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  formInput: string;
  addReply: () => void;
}> = ({ toggleHandler, onChange, formInput, addReply }) => {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    addReply();
    toggleHandler();
  };
  return (
    <form className={classes["reply-form"]} onSubmit={(e) => submitHandler(e)}>
      <label htmlFor="reply-input"></label>
      <textarea
        name="reply-input"
        value={formInput}
        onChange={(e) => onChange(e)}
        placeholder="Hello"
      ></textarea>
      <button type="submit">Post a feeback</button>
    </form>
  );
};
export default ReplyInput;
