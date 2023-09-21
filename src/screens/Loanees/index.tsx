import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import DataContext from "@/state/DataContext";
import Loanee from "./components/Loanee";

const LoaneesScreen: React.FC = () => {
  const { loanees } = React.useContext(DataContext);

  return (
    <FlatList
      style={styles.container}
      data={loanees}
      renderItem={({ item }) => <Loanee {...item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default LoaneesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
});
