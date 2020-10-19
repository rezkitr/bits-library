import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import BookContext from "../context/bookContext";

import BookCard from "../components/BookCard";

const MainBookList = ({ navigation }) => {
  const value = useContext(BookContext);

  useEffect(() => {
    if (value.books.length > 3 && value.books.length % 2 !== 0) {
    }
  }, [value.books]);

  return (
    <View style={styes.container}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          width: "100%",
        }}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        data={value.books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styes.cardContainer}>
              <BookCard item={item} navigation={navigation} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styes = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 20,
    backgroundColor: "white",
    flex: 1,
  },
  cardContainer: {
    marginBottom: 18,
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainBookList;
