import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "../components/CustomHeader";

import Home from "../screens/Home";
import MainBookList from "../screens/MainBookList";
import BookDetail from "../screens/BookDetail";
import RentForm from "../screens/RentForm";
import ConfirmPassword from "../screens/ConfirmPassword";
import SuccessMessage from "../screens/SuccessMessage";
import RentDetail from "../screens/RentDetail";

const Stack = createStackNavigator();

function HomeStack(props) {
  let rootProps = props;
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
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
      >
        {(props) => {
          return <Home {...props} rootProps={rootProps} />;
        }}
      </Stack.Screen>
      <Stack.Screen
        name="MainBookList"
        component={MainBookList}
        options={({ navigation }) => {
          return {
            header: () => (
              <Header
                title="Daftar Buku Terpupuler"
                iconName="chevron-left"
                navigation={navigation}
                type="back"
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
        options={({ navigation, route }) => {
          return {
            header: () => (
              <Header
                title={route.params.itemData.name}
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
        name="RentForm"
        component={RentForm}
        options={({ navigation }) => {
          return {
            header: () => (
              <Header
                title="Pinjam Buku"
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
                navTo="Home"
              />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
