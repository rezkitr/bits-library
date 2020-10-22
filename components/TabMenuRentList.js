import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyle } from "../styles/globalStyle";
import { SimpleLineIcons } from "@expo/vector-icons";
import { dateFormatter } from "../helperFunction/dateFormatter";
import { nameShortener } from "../helperFunction/nameShortener";
import RentContext from "../context/rentContext";

const checkLate = (data) => {
  let lateStatus;
  let endDate = new Date(data.rentData.end_date).setHours(0, 0, 0, 0);

  if (data.rentData.status === "N") {
    let today = new Date().setHours(0, 0, 0, 0);
    lateStatus = today > endDate;
  } else {
    let returnDate = new Date(data.rentData.updated_at).setHours(0, 0, 0, 0);
    lateStatus = returnDate > endDate;
  }

  return lateStatus;
};

const RentItem = ({ data }) => {
  // console.log(data);
  const navigation = useNavigation();
  let bookNames = "";

  data.books.map((book, index) => {
    index == data.books.length - 1
      ? (bookNames = bookNames + book.name)
      : (bookNames = bookNames + book.name + ", ");
  });

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RentDetail", {
          data: { ...data, late: checkLate(data) },
        })
      }
    >
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: globalStyle.darkGrey }}>
            {dateFormatter(data.rentData.start_date, false)} -{" "}
            {dateFormatter(data.rentData.end_date, false)}
          </Text>
          {checkLate(data) ? (
            <View style={styles.lateLabel}>
              <Text style={{ color: "red" }}>Terlambat</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const OnRent = () => {
  const { listOnRent } = useContext(RentContext);

  return (
    <View style={styles.contentContainer}>
      {listOnRent.length > 0 ? (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listOnRent}
            keyExtractor={(item) => item.rentData.id.toString()}
            renderItem={({ item }) => {
              return <RentItem data={item} />;
            }}
          />
        </View>
      ) : (
        <EmptyList />
      )}
    </View>
  );
};
const Returned = () => {
  const { listReturned } = useContext(RentContext);
  return (
    <View style={styles.contentContainer}>
      {listReturned.length > 0 ? (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listReturned}
            keyExtractor={(item) => item.rentData.id.toString()}
            renderItem={({ item }) => {
              return <RentItem data={item} />;
            }}
          />
        </View>
      ) : (
        <EmptyList />
      )}
    </View>
  );
};

const EmptyList = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SimpleLineIcons
        name="social-dropbox"
        size={90}
        color={globalStyle.softGrey}
      />
      <Text style={{ color: globalStyle.lighGrey, fontSize: 16, marginTop: 8 }}>
        Buku tidak ditemukan
      </Text>
    </View>
  );
};

const TabMenuRentList = () => {
  const [activeTab, setActiveTab] = useState(1);

  const { getRentList } = useContext(RentContext);

  useEffect(() => {
    getRentList();
  });

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
    flex: 1,
    backgroundColor: "white",
  },
  lateLabel: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderColor: "red",
    marginLeft: 16,
  },
});

export default TabMenuRentList;
