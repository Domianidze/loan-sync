import React from "react";
import UIPressable from "../Pressable";
import { Text, StyleSheet } from "react-native";

type TProps = {
  label?: string;
  onPress?: () => void;
};

const UIButton: React.FC<TProps> = ({ label, onPress }) => {
  return (
    <UIPressable style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </UIPressable>
  );
};

export default UIButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#007AFF",
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
  label: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
