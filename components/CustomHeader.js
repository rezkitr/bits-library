import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { globalStyle } from "../styles/globalStyle";

const CustomHeader = ({
  navigation,
  title,
  iconName,
  type,
  search,
  navTo,
  style,
  iconColor,
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Feather
        name={iconName}
        style={{ ...styles.menubarIcon, ...iconColor }}
        size={28}
        onPress={() => {
          if (type === "menu") {
            navigation.openDrawer();
          } else {
            if (!navTo) {
              navigation.pop();
            } else {
              navigation.navigate(navTo);
            }
          }
        }}
      />
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {search ? (
        <Feather name="search" style={styles.searchIcon} size={26} />
      ) : null}
    </View>
  );
};

CustomHeader.defaultProps = {
  search: true,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.grey,
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    color: globalStyle.white,
    fontSize: 16,
  },
  menubarIcon: {
    color: globalStyle.white,
    position: "absolute",
    left: 24,
  },
  searchIcon: {
    color: globalStyle.white,
    position: "absolute",
    right: 24,
  },
});

export default CustomHeader;
