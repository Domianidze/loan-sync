import React, { PropsWithChildren } from "react";
import getDataType from "@/util/getDataType";
import {
  TLoanee,
  TLoan,
  TAddParams,
  TEditParams,
  TRemoveParams,
} from "@/types/data";

import DUMMY_DATA from "@/data/DUMMY_DATA";

const DataContext = React.createContext<{
  loanees: TLoanee[];
  loans: TLoan[];
  add: ({}: TAddParams) => void;
  edit: ({}: TEditParams) => void;
  remove: ({}: TRemoveParams) => void;
}>({
  loanees: [],
  loans: [],
  add: () => {},
  edit: () => {},
  remove: () => {},
});

export const DataContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [loanees, setLoanees] = React.useState<TLoanee[]>([]);
  const [loans, setLoans] = React.useState<TLoan[]>([]);

  const add = ({ type, name, amount, loaneeId }: TAddParams) => {
    if (type === "loanee") {
      if (!name) return;

      setLoanees((prevState) => {
        const id = `le${prevState[0] ? +prevState[0].id + 1 : 1}`;

        return [{ id, name }, ...prevState];
      });
    } else {
      const loanee = loanees.find((item) => item.id === loaneeId);

      if (!amount || !loanee) return;

      setLoans((prevState) => {
        const id = `l${prevState[0] ? +prevState[0].id + 1 : 1}`;

        return [{ id, amount, loanee }, ...prevState];
      });
    }
  };

  const edit = ({ id, name, amount, loaneeId }: TEditParams) => {
    const dataType = getDataType(id);

    if (dataType === "loanee") {
      const loanee = loanees.findIndex((item) => item.id === id);

      if (!name || loanee === -1) return;

      setLoanees((prevState) => {
        const newState = [...prevState];

        newState[loanee] = { ...newState[loanee], name };

        return newState;
      });
    } else {
      const loanee = loanees.find((item) => item.id === loaneeId);
      const loan = loans.findIndex((item) => item.id === id);

      if (!amount || !loanee || loan === -1) return;

      setLoans((prevState) => {
        const newState = [...prevState];

        newState[loan] = { ...newState[loan], amount, loanee };

        return newState;
      });
    }
  };

  const remove = ({ id }: TRemoveParams) => {
    const dataType = getDataType(id);
    const setData = dataType === "loanee" ? setLoanees : setLoans;

    setData((prevState: any[]) =>
      prevState.filter((item: TLoan | TLoanee) => item.id !== id)
    );
  };

  return (
    <DataContext.Provider
      value={{
        loanees,
        loans,
        add,
        edit,
        remove,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
