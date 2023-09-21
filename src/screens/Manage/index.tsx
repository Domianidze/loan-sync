import React from "react";
import { View, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "@root/App";
import DataContext from "@/state/DataContext";
import UIPressable from "@/components/ui/Pressable";
import { TLoan, TLoanee } from "@/types/data";
import getDataType from "@/util/getDataType";

type TProps = NativeStackScreenProps<RootStackParamList, "manage">;

const ManageScreen: React.FC<TProps> = ({ navigation, route }) => {
  const id = route?.params?.id;
  const dataType = getDataType(id);

  const { loanees, loans, remove } = React.useContext(DataContext);

  const [data, setData] = React.useState<TLoanee | TLoan>();

  const deleteHandler = () => {
    if (!id || !dataType) return;

    const pressHandler = () => {
      remove({ id });
      navigation.goBack();
    };

    Alert.alert(
      `Delete ${dataType}`,
      `Are you sure you want to delete this ${dataType}?`,
      [
        {
          text: "Cancel",
        },
        {
          style: "destructive",
          text: "Delete",
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
          <UIPressable onPress={deleteHandler}>
            <MaterialIcons name="delete" size={24} color={"#ff3b30"} />
          </UIPressable>
        ),
    });
  }, [id]);

  React.useEffect(() => {
    if (!id || !dataType) return;

    const data = (dataType === "loanee" ? loanees : loans).find(
      (item) => item.id === id
    );

    if (!data) return;

    setData(data);
  }, [id, dataType]);

  return <View></View>;
};

export default ManageScreen;
