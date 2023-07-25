import classes from "./Backdrop.module.css";
const Backdrop: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick}></div>;
};
export default Backdrop;
