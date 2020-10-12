import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const DetailBanner = ({ itemData }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.coverImg} source={{ uri: itemData.coverImg }} />
      <Text style={styles.title}>{itemData.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    alignItems: "center",
  },
  coverImg: {
    borderRadius: 8,
    height: 220,
    width: 140,
  },
});

export default DetailBanner;
