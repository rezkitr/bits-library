import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useFonts, Cookie_400Regular } from "@expo-google-fonts/cookie";
import { globalStyle } from "../styles/globalStyle";
import UserContext from "../context/userContext";

import Button from "../components/CustomButton";
import Alert from "../components/Alert";

const Login = ({ navigation }) => {
  let [fontsLoaded] = useFonts({ Cookie_400Regular });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const value = useContext(UserContext);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#17C3B2" />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {value.loginStatus && !value.loginStatus.status ? (
            <Alert text={value.loginStatus.message} color="#F65C5C" />
          ) : null}
          <View style={styles.container}>
            <Text style={styles.brand}>bits library</Text>

            <View style={styles.formContainer}>
              <TextInput
                autoCompleteType="off"
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity>
                <Text style={styles.pwdForget}>Lupa Kata Sandi?</Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: "70%" }}>
              <Button
                title="Masuk"
                color={globalStyle.grey}
                onPress={() => {
                  value.onLogin(email, password);
                  value.onRetryLogin();
                }}
                style={{ backgroundColor: globalStyle.mustard }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brand: {
    fontFamily: "Cookie_400Regular",
    fontSize: 58,
    color: globalStyle.grey,
  },
  formContainer: {
    marginTop: 40,
    marginBottom: 50,
    width: "70%",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: globalStyle.grey,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
  },
  pwdForget: {
    color: globalStyle.grey,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Login;
