import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import DataContext from "@/state/DataContext";
import Loan from "./components/Loan";

const LoansScreen: React.FC = () => {
  const { loans } = React.useContext(DataContext);

  return (
    <FlatList
      style={styles.container}
      data={loans}
      renderItem={({ item }) => <Loan {...item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default LoansScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
});
