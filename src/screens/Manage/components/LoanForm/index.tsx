import React from "react";
import { View, Alert, StyleSheet } from "react-native";
import UIPicker from "@/components/ui/Picker";
import UITextField from "@/components/ui/TextInput";
import UIButton from "@/components/ui/Button";
import inputChangeHandler from "@/util/inputChangeHandler";
import { TLoanee, TLoan } from "@/types/data";
import { TInputs } from "../../types";

type TProps = {
  data: TLoanee | TLoan | undefined;
  loanees: TLoanee[];
  onDone: (inputs: TInputs) => void;
};

const LoanForm: React.FC<TProps> = ({ data, loanees, onDone }) => {
  const [inputs, setInputs] = React.useState<TInputs>({
    loaneeId: loanees[0].id,
  });

  const doneHandler = () => {
    try {
      if (!inputs?.loaneeId) {
        throw new Error("The Loanee field is required");
      }

      if (!inputs?.amount?.length || inputs?.amount?.length < 1) {
        throw new Error("The Amount field is required");
      }

      onDone(inputs);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  React.useEffect(() => {
    if (data && "loanee" in data && "amount" in data) {
      setInputs({ loaneeId: data.loanee.id, amount: data.amount.toString() });
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <UIPicker
        items={loanees.map((loanee) => ({
          label: loanee.name,
          value: loanee.id,
        }))}
        label="Loanee"
        error="No Loanees found!"
        selectedValue={inputs.loaneeId}
        onValueChange={inputChangeHandler.bind(this, setInputs, "loaneeId")}
      />
      <UITextField
        label="Amount"
        placeholder="100"
        keyboardType="number-pad"
        returnKeyType="done"
        value={inputs.amount}
        onChangeText={inputChangeHandler.bind(this, setInputs, "amount")}
      />
      <UIButton label="Done" onPress={doneHandler} />
    </View>
  );
};

export default LoanForm;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
