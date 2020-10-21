import React, { useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import RentContext from "../context/rentContext";

import TabMenuRentList from "../components/TabMenuRentList";

const RentList = ({ navigation }) => {
  const { getRentList } = useContext(RentContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getRentList();
    });

    return unsubscribe;
  }, [navigation]);

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
