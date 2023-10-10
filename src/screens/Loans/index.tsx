import React from "react";
import DataContext from "@/state/DataContext";
import CardList from "@/components/CardList";
import Loan from "./components/Loan";

const LoansScreen: React.FC = () => {
  const { loans } = React.useContext(DataContext);

  return (
    <CardList
      data={loans}
      renderItem={({ item }) => <Loan {...item} />}
      listEmpty="No Loans yet."
    />
  );
};

export default LoansScreen;
