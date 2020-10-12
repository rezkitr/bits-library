import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "../components/CustomHeader";
import RentList from "../screens/RentList";

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
    </Stack.Navigator>
  );
}

export default RentListStack;
