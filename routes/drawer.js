import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";
import { globalStyle } from "../styles/globalStyle";
import { Feather } from "@expo/vector-icons";

import HomeStack from "./homeStack";
import RentStack from "./rentStack";
import AccountStack from "./accountStack";

import DrawerContent from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{
        width: Dimensions.get("window").width * 0.8,
      }}
      drawerContentOptions={{
        activeBackgroundColor: globalStyle.softGrey,
        itemStyle: {
          paddingLeft: 10,
          paddingVertical: 10,
          margin: 0,
        },
        labelStyle: {
          fontSize: 16,
          color: globalStyle.darkGrey,
          marginLeft: -10,
        },
        style: {
          backgroundColor: "white",
        },
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        options={{
          title: "Beranda",
          drawerLabel: "Beranda",
          drawerIcon: () => (
            <Feather name="home" size={24} color={globalStyle.darkGrey} />
          ),
          swipeEnabled: false,
        }}
      >
        {(props) => <HomeStack {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="RentStack"
        component={RentStack}
        options={{
          title: "Daftar Pinjaman",
          drawerLabel: "Daftar Pinjaman",
          drawerIcon: () => (
            <Feather name="book-open" size={24} color={globalStyle.darkGrey} />
          ),
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          title: "Pengaturan Akun",
          drawerLabel: "Pengaturan Akun",
          drawerIcon: () => (
            <Feather name="settings" size={24} color={globalStyle.darkGrey} />
          ),
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
