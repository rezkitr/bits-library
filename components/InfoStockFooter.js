import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyle } from "../styles/globalStyle";

import Button from "./CustomButton";

const InfoStockFooter = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: globalStyle.darkGrey, fontSize: 16 }}>Stok</Text>
        <View
          style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}
        >
          <Text style={styles.stock}>18</Text>
          <Text style={styles.availTag}>Tersedia</Text>
        </View>
      </View>
      <View style={{ alignSelf: "center" }}>
        <Button
          onPress={() => navigation.navigate("RentForm")}
          title="Pinjam Buku"
          style={{
            backgroundColor: globalStyle.mustard,
            paddingHorizontal: 30,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 68,
    borderTopColor: globalStyle.lighGrey,
    borderTopWidth: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stock: {
    fontWeight: "bold",
    color: globalStyle.darkGrey,
    fontSize: 16,
  },
  availTag: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    color: globalStyle.darkGrey,
    backgroundColor: globalStyle.lighGrey,
  },
});

export default InfoStockFooter;
