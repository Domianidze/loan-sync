import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardType,
  ReturnKeyType,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";

type TProps = {
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyType;
  value?: string;
  onChangeText?: ((text: string) => void) | undefined;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
};

const UITextField: React.FC<TProps> = ({
  label,
  placeholder,
  keyboardType,
  returnKeyType,
  value,
  onChangeText,
  onSubmitEditing,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default UITextField;

const styles = StyleSheet.create({
  container: {},
  label: {
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    padding: 16,
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
