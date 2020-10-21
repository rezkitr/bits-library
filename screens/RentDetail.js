import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { globalStyle } from "../styles/globalStyle";
import { dateFormatter } from "../helperFunction/dateFormatter";
import { priceFormatter } from "../helperFunction/priceFormatter";
import { dateDifference } from "../helperFunction/dateDifference";

import { books } from "../components/_dataDummy";

import Button from "../components/CustomButton";
const book = books[0];

const BookItem = ({ data }) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 12 }}>
      <Image
        style={styles.coverImg}
        source={{
          uri:
            "https://i.pinimg.com/564x/17/fe/4d/17fe4dcf3546a5804efa04b3f7879dc4.jpg",
        }}
        resizeMode="stretch"
      />
      <View style={{ paddingLeft: 10, paddingTop: 4, flex: 1 }}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.author}>Oleh: {data.author}</Text>
        <Text style={styles.price}>
          Rp {priceFormatter(data.subtotal)}, {data.qty} pcs
        </Text>
      </View>
    </View>
  );
};

const RentDetail = ({ route }) => {
  const { rentData, books, late } = route.params.data;
  const [showDetail, setShowDetail] = useState(false);

  const getLateDuration = (data) => {
    let duration;
    if (data.status === "N") {
      let today = new Date();
      duration = dateDifference(data.end_date, today);
    } else {
      duration = dateDifference(data.end_date, data.updated_at);
    }

    return duration;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 10 }}>
        {/* date */}
        <View style={{ flex: 1 }}>
          <View style={styles.dateContainer}>
            <View>
              <Text style={styles.date}>
                {dateFormatter(rentData.start_date)}
              </Text>
              <Text style={styles.info}>Tanggal Pinjam</Text>
            </View>
            <Feather
              name="arrow-right"
              size={24}
              color={globalStyle.softGrey}
            />
            <View>
              <Text style={styles.date}>
                {dateFormatter(rentData.end_date)}
              </Text>
              <Text style={styles.info}>Tanggal Kembali</Text>
            </View>
          </View>

          {/* item */}
          <View style={styles.itemContainer}>
            {books.map((item) => {
              return <BookItem key={item.book_id} data={item} />;
            })}
          </View>

          {/* pay */}
          <View style={styles.payContainer}>
            <Text style={{ fontWeight: "bold" }}>Biaya yang sudah dibayar</Text>
            <Text style={{ fontWeight: "bold", color: globalStyle.darkGrey }}>
              Rp {priceFormatter(rentData.total)}
            </Text>
          </View>

          {/* charge */}
          {late ? (
            <View style={styles.payContainer}>
              <View>
                <Text style={{ fontWeight: "bold", color: "red" }}>
                  Denda Terlambat
                </Text>
                <Text style={{ fontSize: 12, color: globalStyle.darkGrey }}>
                  {getLateDuration(rentData)} Hari
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "red",
                  alignSelf: "flex-start",
                }}
              >
                Rp {priceFormatter(5000)}
              </Text>
            </View>
          ) : null}

          {/* detail payment (if charge) */}
          {late && rentData.status == "F" ? (
            <View>
              <TouchableOpacity onPress={() => setShowDetail(!showDetail)}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      marginRight: 4,
                      fontSize: 12,
                      fontWeight: "bold",
                      color: globalStyle.mustard,
                    }}
                  >
                    Detail Pembayaran
                  </Text>
                  <Entypo
                    name="chevron-right"
                    size={20}
                    color={globalStyle.mustard}
                    style={{
                      transform: showDetail
                        ? [{ rotate: "90deg" }]
                        : [{ rotate: "0deg" }],
                    }}
                  />
                </View>
              </TouchableOpacity>
              {showDetail ? (
                <View style={{ marginTop: 8 }}>
                  {books.map((item) => {
                    return (
                      <View style={{ marginBottom: 5 }} key={item.book_id}>
                        <Text style={{ fontSize: 12 }}>{item.name}</Text>
                        <Text
                          style={{ fontSize: 12, color: globalStyle.darkGrey }}
                        >
                          {item.qty} Pcs,{" "}
                          {dateDifference(
                            rentData.start_date,
                            rentData.end_date
                          )}{" "}
                          Hari
                        </Text>
                        <Text
                          style={{
                            position: "absolute",
                            right: 0,
                            fontSize: 12,
                          }}
                        >
                          Rp {priceFormatter(item.subtotal)}
                        </Text>
                      </View>
                    );
                  })}

                  <View>
                    <Text style={{ fontSize: 12 }}>Denda Terlambat</Text>
                    <Text style={{ fontSize: 12, color: globalStyle.darkGrey }}>
                      {getLateDuration(rentData)} Hari
                    </Text>
                    <Text
                      style={{ position: "absolute", right: 0, fontSize: 12 }}
                    >
                      Rp {book.price}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      </ScrollView>

      {rentData.status === "N" ? (
        <Button
          title="Kembalikan Buku"
          style={{ backgroundColor: globalStyle.mustard }}
        />
      ) : (
        <Button
          title="Sudah Dikembalikan"
          style={{ backgroundColor: globalStyle.mustard }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: "5%",
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: globalStyle.softGrey,
    paddingBottom: 12,
  },
  date: {
    fontWeight: "bold",
    color: globalStyle.darkGrey,
  },
  itemContainer: {
    marginTop: 16,
    marginBottom: 18,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: globalStyle.softGrey,
  },
  info: {
    marginTop: 4,
    color: globalStyle.grey,
    fontSize: 12,
  },
  coverImg: {
    width: 72,
    height: 96,
  },
  title: {
    fontWeight: "bold",
  },
  author: {
    color: globalStyle.darkGrey,
    fontSize: 12,
    marginTop: 3,
  },
  price: {
    position: "absolute",
    bottom: 4,
    left: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
  payContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});

export default RentDetail;
