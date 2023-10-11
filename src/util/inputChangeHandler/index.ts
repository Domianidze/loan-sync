import { TInputs } from "@/screens/Manage/types";

const inputChangeHandler = (
  setFunction: React.Dispatch<React.SetStateAction<TInputs>>,
  key: string,
  value: string
) => {
  setFunction((prevState) => ({
    ...prevState,
    [key]: value,
  }));
};

export default inputChangeHandler;
