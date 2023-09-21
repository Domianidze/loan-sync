import React from "react";
import { FlatList, View, StyleSheet, ListRenderItem } from "react-native";

type TProps = {
  data: ArrayLike<any> | null | undefined;
  renderItem: ListRenderItem<any> | null | undefined;
};

const CardList: React.FC<TProps> = ({ data, renderItem }) => {
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
});
