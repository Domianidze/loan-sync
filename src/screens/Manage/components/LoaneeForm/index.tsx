import React from "react";
import { View, Alert, StyleSheet } from "react-native";
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

const LoaneeForm: React.FC<TProps> = ({ data, onDone }) => {
  const [inputs, setInputs] = React.useState<TInputs>({});

  const doneHandler = () => {
    try {
      if (!inputs?.name?.length || inputs?.name?.length < 1) {
        throw new Error("The Name field is required");
      }

      onDone(inputs);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  React.useEffect(() => {
    if (data && "name" in data) {
      setInputs({ name: data.name });
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <UITextField
        label="Name"
        placeholder="John Doe"
        returnKeyType="done"
        value={inputs.name}
        onChangeText={inputChangeHandler.bind(this, setInputs, "name")}
        onSubmitEditing={doneHandler}
      />
      <UIButton label="Done" onPress={doneHandler} />
    </View>
  );
};

export default LoaneeForm;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
