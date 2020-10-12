import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "../components/CustomHeader";

import AccountSetting from "../screens/AccountSetting";
import ConfirmPassword from "../screens/ConfirmPassword";
import Home from "./homeStack";

const Stack = createStackNavigator();

function AccountSettingStack() {
  return (
    <Stack.Navigator initialRouteName="AccountSetting">
      <Stack.Screen
        name="AccountSetting"
        component={AccountSetting}
        options={({ navigation }) => {
          return {
            header: () => (
              <Header
                title="Pengaturan"
                iconName="chevron-left"
                navigation={navigation}
                type="back"
                search={false}
                navTo="Home"
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="ConfirmPassword"
        component={ConfirmPassword}
        options={({ navigation }) => {
          return {
            header: () => (
              <Header
                title=""
                iconName="chevron-left"
                navigation={navigation}
                type="back"
                search={false}
                style={{ backgroundColor: "white" }}
                iconColor={{ color: "black" }}
              />
            ),
          };
        }}
      />
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => {
          return {
            header: () => (
              <Header
                title="Bits Library"
                iconName="menu"
                navigation={navigation}
                type="menu"
              />
            ),
          };
        }}
      /> */}
    </Stack.Navigator>
  );
}

export default AccountSettingStack;
