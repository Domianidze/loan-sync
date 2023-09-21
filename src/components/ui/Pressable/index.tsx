import React, { PropsWithChildren } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

type TProps = {
  style?: ViewStyle | (ViewStyle | undefined)[];
  onPress?: () => void;
};

const UIPressable: React.FC<PropsWithChildren<TProps>> = ({
  children,
  style,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [pressed ? styles.containerPressed : {}, style]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

export default UIPressable;

const styles = StyleSheet.create({
  containerPressed: {
    opacity: 0.75,
  },
});
