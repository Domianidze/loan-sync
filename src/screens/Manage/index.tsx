import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@root/App";

type TProps = NativeStackScreenProps<RootStackParamList, "manage">;

const ManageScreen: React.FC<TProps> = ({ navigation, route }) => {
  const id = route?.params?.id;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: id ? "Edit" : "Add" });
  }, [id]);

  return <View></View>;
};

export default ManageScreen;
