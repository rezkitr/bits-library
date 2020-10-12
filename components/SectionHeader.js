import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyle } from "../styles/globalStyle";

const SectionHeader = ({ title, subtitle, navigation, navTo }) => {
  return (
    <>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity
        style={{ position: "absolute", right: 0 }}
        onPress={() => navigation.navigate(navTo)}
      >
        <View style={styles.link}>
          <Text style={styles.linkText}>Lihat Semua</Text>
          <MaterialIcons
            name="navigate-next"
            size={24}
            style={styles.linkText}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
    color: globalStyle.darkGrey,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: globalStyle.mustard,
    fontWeight: "bold",
  },
});

export default SectionHeader;
