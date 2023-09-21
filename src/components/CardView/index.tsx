import React, { PropsWithChildren } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
    <Pressable
      style={({ pressed }) => [
        pressed ? styles.containerPressed : {},
        styles.container,
        style,
      ]}
      onPress={pressHandler}
    >
      {children}
    </Pressable>
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
  containerPressed: {
    opacity: 0.75,
  },
});
