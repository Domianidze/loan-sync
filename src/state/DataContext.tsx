import React, { PropsWithChildren } from "react";
import axios from "axios";
import { API_URL } from "@env";
import {
  TLoanee,
  TLoan,
  TAddParams,
  TEditParams,
  TRemoveParams,
} from "@/types/data";

const DataContext = React.createContext<{
  loanees: TLoanee[];
  loans: TLoan[];
  loading: boolean;
  add: ({}: TAddParams) => void;
  edit: ({}: TEditParams) => void;
  remove: ({}: TRemoveParams) => void;
}>({
  loanees: [],
  loans: [],
  loading: false,
  add: () => {},
  edit: () => {},
  remove: () => {},
});

export const DataContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [loanees, setLoanees] = React.useState<TLoanee[]>([]);
  const [loans, setLoans] = React.useState<TLoan[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const add = async ({ type, name, amount, loaneeId }: TAddParams) => {
    if (type === "loanee") {
      if (!name) return;

      try {
        setLoading(true);

        const { data } = await axios.post(`${API_URL}/loanees.json`, { name });

        setLoanees((prevState) => {
          // const id = `le${prevState[0] ? +prevState[0].id + 1 : 1}`;

          return [{ id: data.name, type, name }, ...prevState];
        });

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    } else {
      const loanee = loanees.find((item) => item.id === loaneeId);

      if (!amount || !loanee) return;

      try {
        setLoading(true);

        const { data } = await axios.post(`${API_URL}/loans.json`, {
          loanee,
          amount,
        });

        setLoans((prevState) => {
          // const id = `l${prevState[0] ? +prevState[0].id + 1 : 1}`;

          return [{ id: data.name, type, amount, loanee }, ...prevState];
        });

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    }
  };

  const edit = async ({ id, type, name, amount, loaneeId }: TEditParams) => {
    if (type === "loanee") {
      const loanee = loanees.findIndex((item) => item.id === id);

      if (!name || loanee === -1) return;

      try {
        setLoading(true);

        await axios.put(`${API_URL}/loanees/${id}.json`, {
          name,
        });

        setLoanees((prevState) => {
          const newState = [...prevState];

          newState[loanee] = { ...newState[loanee], name };

          return newState;
        });

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    } else {
      const loanee = loanees.find((item) => item.id === loaneeId);
      const loan = loans.findIndex((item) => item.id === id);

      if (!amount || !loanee || loan === -1) return;

      try {
        setLoading(true);

        await axios.put(`${API_URL}/loans/${id}.json`, {
          amount,
          loanee,
        });

        setLoans((prevState) => {
          const newState = [...prevState];

          newState[loan] = { ...newState[loan], amount, loanee };

          return newState;
        });

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    }
  };

  const remove = async ({ id, type }: TRemoveParams) => {
    const setData = type === "loanee" ? setLoanees : setLoans;

    try {
      setLoading(true);

      await axios.delete(`${API_URL}/${type}s/${id}.json`);

      setData((prevState: any[]) =>
        prevState.filter((item: TLoan | TLoanee) => item.id !== id)
      );

      setLoading(false);
    } catch (error: any) {
      console.error(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const { data: loaneesData } = await axios.get(
          `${API_URL}/loanees.json`
        );
        const { data: loansData } = await axios.get(`${API_URL}/loans.json`);

        const loanees: TLoanee[] = [];
        const loans: TLoan[] = [];

        for (const key in loaneesData) {
          loanees.push({
            id: key,
            type: "loanee",
            name: loaneesData[key].name,
          });
        }

        for (const key in loansData) {
          const loan = loaneesData[key];

          loans.push({
            id: key,
            type: "loan",
            amount: loan.amount,
            loanee: loan.loanee,
          });
        }

        setLoanees(loanees);
        setLoans(loans);

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        loanees,
        loans,
        loading,
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
