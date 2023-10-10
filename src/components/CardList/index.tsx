import React from "react";
import { FlatList, View, Text, StyleSheet, ListRenderItem } from "react-native";

type TProps = {
  data: any[] | null | undefined;
  renderItem: ListRenderItem<any> | null | undefined;
  listEmpty?: string;
};

const CardList: React.FC<TProps> = ({ data, renderItem, listEmpty }) => {
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={<Text style={styles.listEmpty}>{listEmpty}</Text>}
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
  listEmpty: {
    padding: 16,
    color: "#8E8E8F",
    textAlign: "center",
  },
});
