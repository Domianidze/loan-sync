import React from "react";
import { View, Alert, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "@root/App";
import DataContext from "@/state/DataContext";
import UIPressable from "@/components/ui/Pressable";
import UIPicker from "@/components/ui/Picker";
import { TLoan, TLoanee } from "@/types/data";
import LoaneeForm from "./components/LoaneeForm";
import LoanForm from "./components/LoanForm";
import { TInputs } from "./types";

type TProps = NativeStackScreenProps<RootStackParamList, "manage">;

const ManageScreen: React.FC<TProps> = ({ navigation, route }) => {
  const id = route?.params?.id;

  const { loanees, loans, add, edit, remove } = React.useContext(DataContext);

  const [data, setData] = React.useState<TLoanee | TLoan>();
  data;
  const [type, setType] = React.useState<"loanee" | "loan">("loanee");

  const addHandler = (inputs: TInputs) => {
    8;
    add({
      type: type,
      ...inputs,
    });
    navigation.navigate("home", { screen: `${type}s` });
  };

  const editHandler = (inputs: TInputs) => {
    if (!data) return;

    edit({ id: data.id, type: data.type, ...inputs });
    navigation.goBack();
  };

  const removeHandler = () => {
    if (!data) return;

    const pressHandler = () => {
      remove({ id: data.id, type: data.type });
      navigation.goBack();
    };

    Alert.alert(
      `Remove ${data.type}`,
      `Are you sure you want to remove this ${data.type}?`,
      [
        {
          text: "Cancel",
        },
        {
          style: "destructive",
          text: "Remove",
          onPress: pressHandler,
        },
      ]
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: id ? "Edit" : "Add",
      headerRight: () =>
        id && (
          <UIPressable onPress={removeHandler}>
            <MaterialIcons name="delete" size={24} color={"#FF3B30"} />
          </UIPressable>
        ),
    });
  }, [data]);

  React.useEffect(() => {
    if (!id) return;

    const data = [...loanees, ...loans].find((item) => item.id === id);

    if (!data) return;

    setData(data);
    setType(data.type);
  }, [id, type]);

  const Form = type === "loanee" ? LoaneeForm : LoanForm;

  return (
    <KeyboardAwareScrollView extraHeight={200} extraScrollHeight={20}>
      <View style={styles.container}>
        {!id && (
          <UIPicker
            items={[
              { label: "Loanee", value: "loanee" },
              { label: "Loan", value: "loan" },
            ]}
            label="Type"
            selectedValue={type}
            onValueChange={(value) => setType(value)}
          />
        )}
        <Form
          data={data}
          loanees={loanees}
          onDone={id ? editHandler : addHandler}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ManageScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
});
