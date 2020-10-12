import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { globalStyle } from "../styles/globalStyle";

const CustomButton = ({ title, style, textStyle, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            ...styles.btnContainer,
            ...style,
          }}
        >
          <Text style={{ ...styles.btnTitle, ...textStyle }}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 6,
    paddingVertical: 10,
  },
  btnTitle: {
    color: globalStyle.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomButton;
