import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { globalStyle } from "./styles/globalStyle";
import { UserProvider } from "./context/userContext";
import { BookProvider } from "./context/bookContext";
import { BookCartProvider } from "./context/bookCartContext";
import { RentProvider } from "./context/rentContext";

import MainApp from "./routes/rootStack";

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content-content"
        hidden={false}
        backgroundColor={globalStyle.darkGrey}
      />
      <View style={styles.container}>
        <UserProvider>
          <BookProvider>
            <BookCartProvider>
              <RentProvider>
                <MainApp />
              </RentProvider>
            </BookCartProvider>
          </BookProvider>
        </UserProvider>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.white,
  },
});
