import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import UserContext from "../context/userContext";

import Login from "../screens/Login";
import Main from "./drawer";

const Stack = createStackNavigator();

const RootStack = () => {
  const value = useContext(UserContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!value.loginStatus ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        ) : value.loginStatus.status ? (
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
