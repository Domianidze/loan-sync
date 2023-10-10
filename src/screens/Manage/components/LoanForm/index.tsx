import React from "react";
import { View, StyleSheet } from "react-native";
import DataContext from "@/state/DataContext";
import UIPicker from "@/components/ui/Picker";
import UITextField from "@/components/ui/TextInput";
import UIButton from "@/components/ui/Button";

const LoanForm: React.FC = () => {
  const { loanees } = React.useContext(DataContext);

  return (
    <View style={styles.container}>
      <UIPicker
        items={loanees.map((loanee) => ({
          label: loanee.name,
          value: loanee.id,
        }))}
        label="Loanee"
        error="No Loanees found!"
      />
      <UITextField
        label="Amount"
        placeholder="100"
        keyboardType="number-pad"
        returnKeyType="done"
      />
      <UIButton label="Done" />
    </View>
  );
};

export default LoanForm;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
