import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { globalStyle } from "../styles/globalStyle";
import UserContext from "../context/userContext";

import Button from "../components/CustomButton";
import ProfileNameTag from "../components/ProfileNameTag";

const ConfirmPassword = ({ navigation, route }) => {
  const value = useContext(UserContext);
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "AccountSetting" }],
      })
    );
    // try {
    //   if (value.onConfirm(value.user.email, password)) {
    //     route.params.action(value.user.id, route.params.data);
    //     navigation.navigate("RootStack");
    //     // navigation.reset({
    //     //   index: 0,
    //     //   routes: [{ name: "Home" }],
    //     // });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "82%",
            flex: 2,
          }}
        >
          <ProfileNameTag size={72} />
          <Text style={styles.greeting}>{`Hai ${value.user.name}`}</Text>
          <Text style={styles.info}>Masukkan kata sandi untuk melanjutkan</Text>

          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
          <TouchableOpacity style={{ width: "100%" }}>
            <Text
              style={{
                alignSelf: "flex-end",
                marginTop: 20,
                color: globalStyle.darkGrey,
                fontWeight: "bold",
              }}
            >
              Lupa Kata Sandi?
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
          }}
        >
          <Button
            title={route.params.title}
            style={{
              backgroundColor: globalStyle.mustard,
            }}
            onPress={onSubmit}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingBottom: "5%",
  },
  greeting: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 14,
  },
  info: {
    color: globalStyle.darkGrey,
    fontSize: 16,
    marginTop: 10,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: globalStyle.lighGrey,
    width: "100%",
    marginTop: 20,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});

export default ConfirmPassword;
