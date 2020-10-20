import React, { useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { globalStyle } from "../styles/globalStyle";

import Carousel from "../components/Carousel";
import SectionHeader from "../components/SectionHeader";
import BookListHome from "../components/BookListHome";
import Alert from "../components/Alert";

import BookContext from "../context/bookContext";

const Home = ({ navigation, rootProps }) => {
  const { books } = useContext(BookContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      if (rootProps.route.params) {
        rootProps.route.params.updateAccount = false;
      }
    });
    return unsubscribe;
  });

  return (
    <>
      {rootProps.route.params && rootProps.route.params.updateAccount ? (
        <Alert text="Perubahan berhasil disimpan" color="#72B3F3" />
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white", flex: 1 }}
      >
        <Carousel />
        <View style={styles.headerContainer}>
          <SectionHeader
            title="Terpopuler"
            subtitle="Sedang ramai dipinjam"
            navigation={navigation}
            navTo="MainBookList"
          />
        </View>
        {books.length ? (
          <View style={styles.bookListContainer}>
            <BookListHome navigation={navigation} type="popular" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <ActivityIndicator color={globalStyle.darkGrey} />
          </View>
        )}

        <View style={styles.headerContainer}>
          <SectionHeader
            title="Terbaru"
            subtitle="Baru saja diupload"
            navigation={navigation}
            navTo="MainBookList"
          />
        </View>
        {books.length ? (
          <View style={styles.bookListContainer}>
            <BookListHome navigation={navigation} type="latest" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <ActivityIndicator color={globalStyle.darkGrey} />
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 20,
    marginBottom: 4,
  },
  bookListContainer: {
    paddingLeft: 20,
    marginBottom: 30,
  },
});

export default Home;
