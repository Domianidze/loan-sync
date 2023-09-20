import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type TProps = {
  onPress?: () => void;
};

const AddButton: React.FC<TProps> = ({ onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <MaterialIcons name="add" size={27.5} color="white" />
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    top: -12.5,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 25,
  },
});
