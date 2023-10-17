import React from "react";
import { View, Alert, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "@root/App";
import DataContext from "@/state/DataContext";
import UIPressable from "@/components/ui/Pressable";
import UIPicker from "@/components/ui/Picker";
import getDataType from "@/util/getDataType";
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
  const [dataType, setDataType] = React.useState<"loanee" | "loan">("loanee");

  const addHandler = (inputs: TInputs) => {
    add({
      type: dataType,
      ...inputs,
    });
    navigation.navigate("home", { screen: `${dataType}s` });
  };

  const editHandler = (inputs: TInputs) => {
    if (!id) return;

    edit({ id, ...inputs });
    navigation.goBack();
  };

  const removeHandler = () => {
    if (!id || !dataType) return;

    const pressHandler = () => {
      remove({ id });
      navigation.goBack();
    };

    Alert.alert(
      `Remove ${dataType}`,
      `Are you sure you want to remove this ${dataType}?`,
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
  }, [id, dataType]);

  React.useEffect(() => {
    if (!id) return;

    const dataType = getDataType(id);

    if (!dataType) return;

    setDataType(dataType);

    const data = (dataType === "loanee" ? loanees : loans).find(
      (item) => item.id === id
    );

    if (!data) return;

    setData(data);
  }, [id, dataType]);

  const Form = dataType === "loanee" ? LoaneeForm : LoanForm;

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
            selectedValue={dataType}
            onValueChange={(value) => setDataType(value)}
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
