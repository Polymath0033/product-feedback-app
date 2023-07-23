import { useNavigate } from "react-router-dom";
import ArrowLeft from "../icons/ArrowLeft";
import classes from "./Back.module.css";
const Back: React.FC = () => {
  const navigate = useNavigate();
  const goBack: () => void = () => {
    navigate(-1);
  };
  return (
    <button className={classes.back} type="button" role="link" onClick={goBack}>
      <ArrowLeft />
      Go back
    </button>
  );
};
export default Back;
