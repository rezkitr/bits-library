import React, { useContext } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import BookContext from "../context/bookContext";

import BookCard from "../components/BookCard";

const MainBookList = ({ navigation }) => {
  const value = useContext(BookContext);

  return (
    <View style={styes.container}>
      <FlatList
        style={{
          width: Dimensions.get("window").width - 40,
        }}
        columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
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
    alignItems: "center",
    paddingTop: 24,
    backgroundColor: "white",
    flex: 1,
  },
  cardContainer: {
    marginBottom: 18,
    flexDirection: "column",
  },
});

export default MainBookList;
