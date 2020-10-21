import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { globalStyle } from "../styles/globalStyle";
import RentContext from "../context/rentContext";
import { dateFormatter } from "../helperFunction/dateFormatter";
import { nameShortener } from "../helperFunction/nameShortener";

const OnRent = () => {
  const { listOnRent } = useContext(RentContext);

  return (
    <View style={styles.contentContainer}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listOnRent}
          keyExtractor={(item) => item.rentData.id.toString()}
          renderItem={({ item }) => {
            let bookNames = "";
            item.books.map((book, index) => {
              index == item.books.length - 1
                ? (bookNames = bookNames + book.name)
                : (bookNames = bookNames + book.name + ", ");
            });
            return (
              <TouchableOpacity>
                <View
                  style={{
                    paddingVertical: 14,
                    borderBottomWidth: 0.3,
                    borderBottomColor: globalStyle.lighGrey,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      marginBottom: 6,
                    }}
                  >
                    {nameShortener(bookNames, 42)}
                  </Text>
                  <Text style={{ color: globalStyle.darkGrey }}>
                    {dateFormatter(item.rentData.start_date, false)} -{" "}
                    {dateFormatter(item.rentData.end_date, false)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
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
