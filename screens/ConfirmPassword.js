import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { globalStyle } from "../styles/globalStyle";
import { Formik } from "formik";
import * as yup from "yup";
import UserContext from "../context/userContext";

import Button from "../components/CustomButton";
import ProfileNameTag from "../components/ProfileNameTag";
import Alert from "../components/Alert";

const ConfirmPassword = ({ navigation, route }) => {
  const value = useContext(UserContext);

  const [falsePassword, setFalsePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {falsePassword ? <Alert text="Password salah" color="#F65C5C" /> : null}
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={globalStyle.darkGrey} />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={{
              password: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                if (await value.onConfirm(value.user.email, values.password)) {
                  await route.params.action(value.user.id, route.params.data);
                  setFalsePassword(true);
                  navigation.popToTop();
                  navigation.navigate("HomeStack", {
                    screen: "Home",
                    updateAccount: true,
                  });
                } else {
                  setLoading(false);
                  setFalsePassword(false);
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {(props) => (
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
                  <Text
                    style={styles.greeting}
                  >{`Hai ${value.user.name}`}</Text>
                  <Text style={styles.info}>
                    Masukkan kata sandi untuk melanjutkan
                  </Text>

                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry
                    value={props.values.password}
                    onChangeText={props.handleChange("password")}
                  />
                  {props.touched.password && props.errors.password ? (
                    <Text style={styles.errorMsg}>{props.errors.password}</Text>
                  ) : null}
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
                    onPress={props.handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const ValidationSchema = yup.object({
  password: yup.string().required("Silahkan masukkan password"),
});

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
  errorMsg: {
    color: "red",
    fontSize: 10,
    alignSelf: "flex-start",
    marginTop: 4,
  },
});

export default ConfirmPassword;
