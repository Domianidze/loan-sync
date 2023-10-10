import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type TProps = {
  items: { label: string; value: string }[];
  label?: string;
  error?: string;
  selectedValue?: "loanee" | "loan" | undefined;
  onValueChange?:
    | ((itemValue: "loanee" | "loan", itemIndex: number) => void)
    | undefined;
};

const UIPicker: React.FC<TProps> = ({
  items,
  label,
  error,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.picker}>
        {items.length > 0 ? (
          <Picker
            itemStyle={styles.pickerItem}
            selectedValue={selectedValue}
            onValueChange={onValueChange}
          >
            {items.map((item) => (
              <Picker.Item key={item.value} {...item} />
            ))}
          </Picker>
        ) : (
          <Text style={styles.error}>{error}</Text>
        )}
      </View>
    </View>
  );
};

export default UIPicker;

const styles = StyleSheet.create({
  label: {
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  error: {
    padding: 12,
    color: "#ff3b30",
    textAlign: "center",
  },
  picker: {
    padding: 4,
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
  pickerItem: {
    height: 116,
    fontSize: 16,
  },
});
