import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import { globalStyle } from "../styles/globalStyle";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckBox from "@react-native-community/checkbox";
import { dateFormatter } from "../helperFunction/dateFormatter";
import { priceFormatter } from "../helperFunction/priceFormatter";
import { dateDifference } from "../helperFunction/dateDifference";
import BookCartContext from "../context/bookCartContext";
import RentContext from "../context/rentContext";

import Button from "../components/CustomButton";
import BookItem from "../components/BookItem";
import Alert from "../components/Alert";

const RentForm = ({ navigation, route }) => {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const { bookCart, reset } = useContext(BookCartContext);
  const { createRent } = useContext(RentContext);
  const d = new Date();
  const nextDay = new Date(d);
  nextDay.setDate(d.getDate() + 1);

  const [agreed, setAgreed] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(nextDay.toISOString().split("T")[0]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setShowDatePicker(false);
    getTotal();
  });

  const onDateChange = (event, selectedDate) => {
    let endDate = new Date(selectedDate).toISOString().split("T")[0];
    setEndDate(endDate);
  };

  const getTotal = () => {
    let total = 0;

    for (const item of bookCart) {
      total = total + item.book.price * item.qty;
    }
    setTotal(total);
  };

  const toConfirm = async (data) => {
    try {
      const { status, message } = await createRent(data);

      if (status) {
        navigation.replace("SuccessMessage");
        reset();
      } else {
        navigation.navigate("RentForm", { flag: true, message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = () => {
    if (agreed) {
      navigation.navigate("ConfirmPassword", {
        title: "Proses Peminjaman",
        action: toConfirm,
        data: {
          startDate,
          endDate,
          total,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      {route.params && route.params.flag ? (
        <Alert text={route.params.message} color="#F65C5C" />
      ) : null}

      {!bookCart.length ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Feather name="shopping-cart" size={40} color="black" />
          <Text style={{ marginTop: 12, fontSize: 16 }}>
            Daftar buku kosong
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ marginBottom: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text style={styles.header}>Daftar buku yang akan dipinjam</Text>

              {/* item */}
              <View style={{ marginTop: 15 }}>
                {bookCart.map((item) => {
                  return <BookItem key={item.book.id} item={item} />;
                })}
              </View>

              {/* add book */}
              <View style={{ marginTop: 16 }}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => navigation.navigate("MainBookList")}
                >
                  <FontAwesome5
                    name="plus"
                    size={16}
                    color={globalStyle.mustard}
                  />
                  <Text style={{ color: globalStyle.mustard, marginLeft: 8 }}>
                    Tambah buku lainnya
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Date */}
              <View style={{ marginTop: 8 }}>
                <Text style={styles.header}>Atur Tanggal</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Feather
                      name="calendar"
                      size={20}
                      style={styles.dateIcon}
                    />
                    <Text style={styles.date}>
                      {dateFormatter(startDate, false)}
                    </Text>
                  </View>
                  <Feather
                    name="minus"
                    size={24}
                    color={globalStyle.lighGrey}
                    style={{ alignSelf: "center" }}
                  />
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <View style={{ flexDirection: "row" }}>
                      <Feather
                        name="calendar"
                        size={20}
                        style={{ ...styles.dateIcon, backgroundColor: "white" }}
                      />
                      <Text
                        style={{ ...styles.date, backgroundColor: "white" }}
                      >
                        {dateFormatter(endDate, false)}
                      </Text>
                      {showDatePicker && (
                        <DateTimePicker
                          testID="endDate"
                          value={new Date(endDate)}
                          mode="date"
                          minimumDate={new Date().setDate(
                            new Date().getDate() + 1
                          )}
                          onChange={onDateChange}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* detail biaya */}
              <View style={{ marginTop: 16 }}>
                <Text style={styles.header}>Detail Biaya</Text>
                <View
                  style={{
                    marginTop: 10,
                    borderBottomWidth: 0.3,
                    paddingBottom: 5,
                  }}
                >
                  {bookCart.map((item) => {
                    return (
                      <View key={item.book.id} style={{ marginBottom: 6 }}>
                        <Text>{item.book.name}</Text>
                        <Text
                          style={{ fontSize: 12, color: globalStyle.darkGrey }}
                        >
                          {item.qty} pcs
                        </Text>
                        <Text style={{ position: "absolute", right: 0 }}>
                          Rp {priceFormatter(item.book.price * item.qty)}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Total Bayar</Text>
                  <Text style={{ fontSize: 12, color: globalStyle.darkGrey }}>
                    {`${bookCart.length} Buku, ${dateDifference(
                      startDate,
                      endDate
                    )} Hari`}
                  </Text>
                  <Text style={{ position: "absolute", right: 0 }}>
                    Rp {priceFormatter(total)}
                  </Text>
                </View>
              </View>

              {/* agreement */}
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CheckBox
                  disabled={false}
                  value={agreed}
                  onValueChange={(newValue) => setAgreed(newValue)}
                />
                <Text
                  style={{
                    textAlign: "justify",
                    fontSize: 11,
                    color: globalStyle.darkGrey,
                    flex: 1,
                    paddingLeft: 10,
                  }}
                >
                  Dengan ini saya menyetujui untuk melakukan pengembalian sesuai
                  tanggal yang telah ditentukan. Apabila melewati tanggal
                  tersebut, saya bersedia membayar denda yang telah ditentukan.
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* button */}
          <View>
            <Button
              title="Lanjutkan Peminjaman"
              style={{
                backgroundColor: agreed
                  ? globalStyle.mustard
                  : globalStyle.softGrey,
              }}
              textStyle={{ color: agreed ? "white" : globalStyle.darkGrey }}
              onPress={onSubmit}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,

    backgroundColor: "white",
    justifyContent: "space-between",
    paddingBottom: "5%",
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 24,
  },

  dateIcon: {
    backgroundColor: globalStyle.softGrey,
    color: globalStyle.darkGrey,
    padding: 6,
    borderColor: globalStyle.lighGrey,
    borderWidth: 0.5,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  date: {
    color: globalStyle.darkGrey,
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderColor: globalStyle.lighGrey,
    paddingVertical: 7,
    backgroundColor: globalStyle.softGrey,
    paddingLeft: 14,
    paddingRight: 32,
  },
});

export default RentForm;
