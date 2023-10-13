import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import DataContext from "@/state/DataContext";

const Loading: React.FC = () => {
  const { loading } = React.useContext(DataContext);

  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: " rgba(0, 0, 0, 0.50)",
    zIndex: 99,
  },
});
