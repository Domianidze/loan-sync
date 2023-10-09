import React from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "@root/App";
import DataContext from "@/state/DataContext";
import UIPressable from "@/components/ui/Pressable";
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
    <View>
      {!id && (
        <Picker
          itemStyle={styles.pickerItem}
          selectedValue={dataType}
          onValueChange={(value: "loanee" | "loan") => setDataType(value)}
        >
          <Picker.Item label="Loanee" value="loanee" />
          <Picker.Item label="Loan" value="loan" />
        </Picker>
      )}
      {dataType === "loanee" ? <LoaneeForm /> : <LoanForm />}
    </View>
  );
};

export default ManageScreen;

const styles = StyleSheet.create({
  pickerItem: {
    height: 125,
  },
});
