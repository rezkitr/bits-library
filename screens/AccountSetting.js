import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
  YellowBox,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { globalStyle } from "../styles/globalStyle";
import UserContext from "../context/userContext";
import { Formik } from "formik";
import * as yup from "yup";

import Button from "../components/CustomButton";
import ProfileNameTag from "../components/ProfileNameTag";

const AccountSetting = ({ navigation }) => {
  YellowBox.ignoreWarnings([
    "Non-serializable values were found in the navigation state",
  ]);
  const value = useContext(UserContext);

  useEffect(() => {
    navigation.addListener("focus", () => {
      // navigation.dispatch(
      console.log("focuss");
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: "AccountSetting" }],
      //   })
      // );
    });
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Formik
        initialValues={{
          name: value.user.name,
          mobile: value.user.mobile,
          email: value.user.email,
          address: value.user.address,
          password: "",
          confirmedPassword: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          if (values.password.length > 0) {
            delete values.confirmedPassword;
            navigation.navigate("ConfirmPassword", {
              title: "Proses Perubahan",
              action: value.updateUser,
              data: values,
            });
          } else {
            delete values.confirmedPassword;
            navigation.navigate("ConfirmPassword", {
              title: "Proses Perubahan",
              action: value.updateUser,
              data: { ...values, password: value.user.password },
            });
          }
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: 24 }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <ProfileNameTag size={72} />
                <TouchableOpacity>
                  <Text
                    style={{
                      color: globalStyle.mustard,
                      fontWeight: "bold",
                      marginTop: 8,
                    }}
                  >
                    Ubah Foto Profil
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <Text style={styles.sectionTitle}>Informasi Pribadi</Text>
                <View style={styles.infoContainer}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>Nama</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.dataInput}
                      value={props.values.name}
                      onChangeText={props.handleChange("name")}
                    />
                    {props.touched.name && props.errors.name ? (
                      <Text style={styles.errorMsg}>{props.errors.name}</Text>
                    ) : null}
                  </View>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>No HP</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.dataInput}
                      value={props.values.mobile}
                      onChangeText={props.handleChange("mobile")}
                    />
                    {props.touched.mobile && props.errors.mobile ? (
                      <Text style={styles.errorMsg}>{props.errors.mobile}</Text>
                    ) : null}
                  </View>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>Email</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.dataInput}
                      value={props.values.email}
                      onChangeText={props.handleChange("email")}
                    />
                    {props.touched.email && props.errors.email ? (
                      <Text style={styles.errorMsg}>{props.errors.email}</Text>
                    ) : null}
                  </View>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>Alamat</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.dataInput}
                      value={props.values.address}
                      onChangeText={props.handleChange("address")}
                    />
                    {props.touched.address && props.errors.address ? (
                      <Text style={styles.errorMsg}>
                        {props.errors.address}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 12 }}>
                <Text style={styles.sectionTitle}>Ubah Kata Sandi</Text>
                <Text style={styles.label}>Kata sandi baru</Text>
                <TextInput
                  secureTextEntry
                  style={styles.dataInput}
                  value={props.values.password}
                  onChangeText={props.handleChange("password")}
                />
                {props.touched.password && props.errors.password ? (
                  <Text style={styles.errorMsg}>{props.errors.password}</Text>
                ) : null}
                <Text style={{ ...styles.label, marginTop: 6 }}>
                  Ulangi kata sandi baru
                </Text>
                <TextInput
                  secureTextEntry
                  style={styles.dataInput}
                  value={props.values.confirmedPassword}
                  onChangeText={props.handleChange("confirmedPassword")}
                />
                {props.touched.confirmedPassword &&
                props.errors.confirmedPassword ? (
                  <Text style={styles.errorMsg}>
                    {props.errors.confirmedPassword}
                  </Text>
                ) : null}
              </View>
            </ScrollView>
            <View>
              <Button
                onPress={props.handleSubmit}
                title="Simpan Perubahan"
                style={{ backgroundColor: globalStyle.mustard }}
              />
            </View>
          </View>
        )}
      </Formik>
    </TouchableWithoutFeedback>
  );
};

const ValidationSchema = yup.object({
  name: yup.string().required("Nama tidak boleh kosong"),
  mobile: yup
    .string()
    .required("No HP tidak boleh kosong")
    .min(11, "Bukan No HP"),
  email: yup.string().email("Bukan email").required("Email tidak boleh kosong"),
  address: yup.string().required("Alamat tidak boleh kosong"),
  password: yup.string().min(8, "Min. 8 karakter"),
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Konfirmasi gagal, silahkan coba lagi"),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: "5%",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: globalStyle.darkGrey,
    fontWeight: "bold",
  },
  dataInput: {
    padding: 0,
    borderBottomWidth: 0.3,
    marginBottom: 6,
    paddingBottom: 3,
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  labelContainer: {
    flex: 1,
    paddingBottom: 4,
  },
  inputContainer: {
    flex: 3,
  },
  errorMsg: {
    color: "red",
    fontSize: 10,
    marginTop: -5,
  },
});

export default AccountSetting;
