import React from "react";
import { StyleSheet, View, Text } from "react-native";

import BookCard from "../components/BookCard";
import InfoStockFooter from "../components/InfoStockFooter";
import TabMenuDetail from "../components/TabMenuDetail";

const BookDetail = ({ route, navigation }) => {
  return (
    <View style={{ paddingTop: 24, flex: 1 }}>
      <BookCard
        completeAuthor
        touchable={false}
        item={route.params.itemData}
        navigation={navigation}
        containerStyle={{ width: "100%" }}
        coverImgStyle={{ width: 130, height: 180, borderRadius: 8 }}
        titleStyle={{ fontSize: 20, marginTop: 14 }}
        authorStyle={{ fontSize: 16 }}
        priceStyle={{ fontSize: 18, marginTop: 18 }}
      />
      <TabMenuDetail itemData={route.params.itemData} />

      <InfoStockFooter navigation={navigation} />
    </View>
  );
};

export default BookDetail;
