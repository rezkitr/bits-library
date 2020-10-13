import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Carousel from "../components/Carousel";
import SectionHeader from "../components/SectionHeader";
import BookListHome from "../components/BookListHome";
import Alert from "../components/Alert";

const Home = ({ navigation, route, rootProps }) => {
  console.log(rootProps.route.params.updateAccount);
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      rootProps.route.params.updateAccount = false;
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
        style={{ backgroundColor: "white" }}
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
        <View style={styles.bookListContainer}>
          <BookListHome navigation={navigation} type="popular" />
        </View>
        <View style={styles.headerContainer}>
          <SectionHeader
            title="Terbaru"
            subtitle="Baru saja diupload"
            navigation={navigation}
            navTo="MainBookList"
          />
        </View>
        <View style={styles.bookListContainer}>
          <BookListHome navigation={navigation} type="latest" />
        </View>
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
