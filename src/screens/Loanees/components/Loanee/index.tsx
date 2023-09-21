import React from "react";
import { Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CardView from "@/components/CardView";
import { TLoanee } from "@/types/data";

const Loanee: React.FC<TLoanee> = ({ name }) => {
  return (
    <CardView style={styles.container}>
      <MaterialIcons name="person" size={32} />
      <Text style={styles.name}>{name}</Text>
    </CardView>
  );
};

export default Loanee;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  name: {
    fontSize: 15,
  },
});
