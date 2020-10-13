import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const Alert = ({ text, color }) => {
  const [show, setShow] = useState(true);

  const hideAlert = () => {
    setTimeout(function () {
      setShow(false);
    }, 3000);
  };

  return (
    <View>
      {show ? (
        <View style={{ ...styles.container, backgroundColor: color }}>
          <Text style={styles.text}>{text}</Text>
        </View>
      ) : null}
      {hideAlert()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Alert;
