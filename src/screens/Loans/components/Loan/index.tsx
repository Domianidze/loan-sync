import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CardView from "@/components/CardView";
import { TLoan } from "@/types/data";

const Loan: React.FC<TLoan> = ({ id, amount, loanee }) => {
  return (
    <CardView style={styles.container} id={id}>
      <View style={styles.amountContainer}>
        <MaterialIcons name="attach-money" size={32} />
        <Text style={styles.amount}>{amount}</Text>
      </View>
      <Text style={styles.loanee}>{loanee.name}</Text>
    </CardView>
  );
};

export default Loan;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  amount: {
    fontSize: 16,
  },
  loanee: {
    color: "#8E8E8F",
  },
});
