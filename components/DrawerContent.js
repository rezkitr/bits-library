import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { globalStyle } from "../styles/globalStyle";
import { Feather } from "@expo/vector-icons";
import UserContext from "../context/userContext";

import ProfileNameTag from "./ProfileNameTag";

const DrawerContent = (props) => {
  const value = useContext(UserContext);

  return (
    <View style={{ flex: 1, paddingBottom: 12 }}>
      <View style={styles.headContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AccountStack")}
        >
          <View style={styles.head}>
            <ProfileNameTag size={64} />
            <View style={{ marginLeft: 14 }}>
              <Text style={styles.name}>{value.user.name}</Text>
              <Text style={styles.email}>{value.user.email}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <DrawerItemList {...props} />
        </View>
        <DrawerItem
          label="Logout"
          labelStyle={{
            fontSize: 16,
            color: globalStyle.darkGrey,
            marginLeft: -10,
          }}
          onPress={() => value.onLogout()}
          style={{
            marginHorizontal: 20,
          }}
          icon={() => (
            <Feather name="log-out" size={24} color={globalStyle.darkGrey} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    height: 120,
    paddingLeft: 20,
    justifyContent: "center",
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  email: {
    color: globalStyle.grey,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: globalStyle.darkGrey,
    marginLeft: -10,
  },
  item: {
    borderBottomWidth: 0.3,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
});

export default DrawerContent;
