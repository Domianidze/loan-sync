import React, { PropsWithChildren } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UIPressable from "@/components/ui/Pressable";

type TProps = {
  id: string;
  style?: ViewStyle;
};

const CardView: React.FC<PropsWithChildren<TProps>> = ({
  children,
  style,
  id,
}) => {
  const navigation = useNavigation<any>();

  const pressHandler = () => {
    navigation.navigate("manage", { id });
  };

  return (
    <UIPressable style={[styles.container, style]} onPress={pressHandler}>
      {children}
    </UIPressable>
  );
};

export default CardView;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 75,
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
