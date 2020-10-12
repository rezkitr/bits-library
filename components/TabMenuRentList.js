import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { globalStyle } from "../styles/globalStyle";

const OnRent = () => {
  return (
    <View style={styles.contentContainer}>
      <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut vero hic
        harum recusandae error minus, iste quisquam velit dolorum odit
        laboriosam id sunt voluptatibus iure, aliquam ex assumenda. Neque, iste!
      </Text>
    </View>
  );
};
const Returned = () => {
  return (
    <View style={styles.contentContainer}>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
        doloribus in quaerat minus error obcaecati, harum vero aperiam rerum
        voluptatum soluta repellendus saepe accusamus atque voluptates nesciunt
        iste sint quam?
      </Text>
    </View>
  );
};

const TabMenuRentList = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <View style={styles.tabHeaderContainer}>
        <TouchableOpacity onPress={() => setActiveTab(1)}>
          <Text
            style={{
              ...styles.tabHeaderTitle,
              color: activeTab == 1 ? globalStyle.grey : globalStyle.softGrey,
            }}
          >
            Sedang Dipinjam
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab(2)}>
          <Text
            style={{
              ...styles.tabHeaderTitle,
              color: activeTab == 2 ? globalStyle.grey : globalStyle.softGrey,
            }}
          >
            Sudah Dikembalikan
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ ...styles.indicator, left: activeTab == 1 ? 0 : "50%" }}
      ></View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScrollEndDrag={() => {
          if (activeTab == 1) {
            setActiveTab(2);
          } else {
            setActiveTab(1);
          }
        }}
      >
        {activeTab == 1 ? <OnRent /> : <Returned />}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  tabHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 0.5,
    borderBottomColor: globalStyle.softGrey,
    paddingBottom: 16,
  },
  tabHeaderTitle: {
    color: globalStyle.softGrey,
    fontWeight: "bold",
    fontSize: 15,
  },
  indicator: {
    height: 4,
    width: "50%",
    borderRadius: 3,
    backgroundColor: globalStyle.grey,
    position: "relative",
    bottom: 2,
  },
  contentContainer: {
    width: Dimensions.get("window").width - 40,
  },
});

export default TabMenuRentList;
