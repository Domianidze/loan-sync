import React from "react";
import { View, StyleSheet } from "react-native";
import UITextField from "@/components/ui/TextInput";
import UIButton from "@/components/ui/Button";

const LoaneeForm: React.FC = () => {
  return (
    <View style={styles.container}>
      <UITextField label="Name" placeholder="John Doe" returnKeyType="done" />
      <UIButton label="Done" />
    </View>
  );
};

export default LoaneeForm;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
