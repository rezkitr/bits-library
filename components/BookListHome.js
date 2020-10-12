import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";

import BookContext from "../context/bookContext";

import BookCard from "./BookCard";

const BookListHome = ({ navigation, type }) => {
  const value = useContext(BookContext);

  return (
    <View style={{ marginTop: 16 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={value.books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <BookCard
              item={item}
              containerStyle={{ marginRight: 14 }}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default BookListHome;
