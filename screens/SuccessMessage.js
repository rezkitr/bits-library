import React, { useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { globalStyle } from "../styles/globalStyle";
import { FontAwesome5 } from "@expo/vector-icons";
import RentContext from "../context/rentContext";

import Button from "../components/CustomButton";

const SuccessMessage = ({ navigation, route }) => {
  const { text, buttonText, navTo, id } = route.params;
  const { getRentDetail } = useContext(RentContext);

  const [loading, setLoading] = useState(false);

  useFocusEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", function () {
      return true;
    });
  }, []);

  const toRentDetail = async () => {
    try {
      const data = await getRentDetail(id);

      navigation.navigate(navTo, {
        data: { ...data, late: false },
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          {text}
        </Text>
      </View>

      <View style={{ width: "100%" }}>
        <Button
          title={buttonText}
          style={{
            backgroundColor: globalStyle.mustard,
            paddingVertical: 12,
          }}
          onPress={() => {
            navigation.popToTop();
            if (navTo !== "RentDetail") {
              navigation.navigate(navTo);
            } else {
              toRentDetail();
            }
          }}
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
