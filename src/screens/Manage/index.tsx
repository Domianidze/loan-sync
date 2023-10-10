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

type TProps = NativeStackScreenProps<RootStackParamList, "manage">;

const ManageScreen: React.FC<TProps> = ({ navigation, route }) => {
  const id = route?.params?.id;

  const { loanees, loans, remove } = React.useContext(DataContext);

  const [data, setData] = React.useState<TLoanee | TLoan>();
  const [dataType, setDataType] = React.useState<"loanee" | "loan">("loanee");

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
            <MaterialIcons name="delete" size={24} color={"#ff3b30"} />
          </UIPressable>
        ),
    });
  }, [id]);

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

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      extraHeight={200}
      extraScrollHeight={40}
    >
      {!id && (
        <UIPicker
          items={[
            { label: "Loanee", value: "loanee" },
            { label: "Loan", value: "loan" },
          ]}
          label="Type"
          selectedValue={dataType}
          onValueChange={(value: "loanee" | "loan") => setDataType(value)}
        />
      )}
      {dataType === "loanee" ? <LoaneeForm /> : <LoanForm />}
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
