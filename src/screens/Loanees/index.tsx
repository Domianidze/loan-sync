import React from "react";
import DataContext from "@/state/DataContext";
import CardList from "@/components/CardList";
import Loanee from "./components/Loanee";

const LoaneesScreen: React.FC = () => {
  const { loanees } = React.useContext(DataContext);

  return (
    <CardList data={loanees} renderItem={({ item }) => <Loanee {...item} />} />
  );
};

export default LoaneesScreen;
