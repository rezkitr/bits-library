import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "../components/CustomHeader";
import RentList from "../screens/RentList";
import RentDetail from "../screens/RentDetail";
import ConfirmPassword from "../screens/ConfirmPassword";
import SuccessMessage from "../screens/SuccessMessage";

const Stack = createStackNavigator();

function RentListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RentList"
        component={RentList}
        options={({ navigation }) => {
          return {
            header: () => (
              <Header
                title="Daftar Pinjaman"
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
        name="RentDetail"
        component={RentDetail}
        options={({ navigation }) => {
          return {
            header: () => (
              <Header
                title="Detail Pinjaman"
                iconName="chevron-left"
                navigation={navigation}
                type="back"
                search={false}
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
      <Stack.Screen
        name="SuccessMessage"
        component={SuccessMessage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default RentListStack;
