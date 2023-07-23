// import { useState } from "react";
// const useInput = (validateInput: (val: string) => void) => {
//   const [value, setValue] = useState<string>("");
//   const [touched, setTouched] = useState<boolean>(false);
//   const valueIsValid = validateInput(value);
//   const hasError = !valueIsValid && touched;
//   const valueChangeHandler = (e: E) => {
//     setValue(e.target.value);
//   };
//   const blurHandler = () => {
//     setTouched(true);
//   };
//   const reset = () => {
//     setValue("");
//     setTouched(false);
//   };
//   return{
//     value,
//     isValid:valueIsValid,
//     hasError,
//     valueChangehandler
//   }
// };
// export default useInput;
