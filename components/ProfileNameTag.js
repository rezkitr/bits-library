import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyle } from "../styles/globalStyle";
import UserContext from "../context/userContext";

const initialName = (name) => {
  const nameWords = name.split(" ");
  let nameArr = [];
  let result = "";

  if (nameWords.length >= 2) {
    nameArr = name.split(" ", 2);
  } else if (nameWords.length == 1) {
    nameArr = [name];
  }

  for (let name of nameArr) {
    result = result + name.charAt(0);
  }
  return result;
};

const ProfileNameTag = ({ size }) => {
  const value = useContext(UserContext);

  return (
    <View
      style={{
        ...styles.circle,
        width: size,
        height: size,
        borderRadius: size * 0.5,
      }}
    >
      <Text
        style={{
          fontSize: size * 0.5,
          fontWeight: "bold",
          color: globalStyle.darkGrey,
        }}
      >
        {initialName(value.user.name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: globalStyle.softGrey,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileNameTag;
