import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyle } from "../styles/globalStyle";
import { FontAwesome5 } from "@expo/vector-icons";

import Button from "../components/CustomButton";

const SuccessMessage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.circleContainer}>
          <View style={styles.outerCircle}>
            <FontAwesome5 name="check" size={80} color={globalStyle.grey} />
          </View>
        </View>
        <Text
          style={{
            color: globalStyle.white,
            fontSize: 36,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Yeay!
        </Text>
        <Text style={{ color: globalStyle.white, fontSize: 20, marginTop: 10 }}>
          Buku berhasil dipinjam
        </Text>
      </View>

      <View style={{ width: "100%" }}>
        <Button
          title="Lihat Detail Pinjaman"
          style={{
            backgroundColor: globalStyle.mustard,
            paddingVertical: 12,
          }}
          onPress={() => navigation.navigate("RentDetail")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.grey,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: "5%",
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: globalStyle.white,
    borderWidth: 18,
    borderColor: globalStyle.lighGrey,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SuccessMessage;
