import React, { useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import RentContext from "../context/rentContext";

import TabMenuRentList from "../components/TabMenuRentList";

const RentList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TabMenuRentList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "white",
  },
});

export default RentList;
