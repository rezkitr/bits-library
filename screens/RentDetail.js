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

import { books } from "../components/_dataDummy";

import Button from "../components/CustomButton";
const book = books[0];

const BookItem = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        style={styles.coverImg}
        source={{ uri: book.coverImg }}
        resizeMode="stretch"
      />
      <View style={{ paddingLeft: 10, paddingTop: 4, flex: 1 }}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Oleh: {book.author}</Text>
        <Text style={styles.price}>Rp {book.price}, 1 pcs</Text>
      </View>
    </View>
  );
};

const RentDetail = () => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 10 }}>
        {/* date */}
        <View style={{ flex: 1 }}>
          <View style={styles.dateContainer}>
            <View>
              <Text style={styles.date}>20 September 2020</Text>
              <Text style={styles.info}>Tanggal Pinjam</Text>
            </View>
            <Feather
              name="arrow-right"
              size={24}
              color={globalStyle.softGrey}
            />
            <View>
              <Text style={styles.date}>23 September 2020</Text>
              <Text style={styles.info}>Tanggal Kembali</Text>
            </View>
          </View>

          {/* item */}
          <View style={styles.itemContainer}>
            <BookItem />
          </View>

          {/* pay */}
          <View style={styles.payContainer}>
            <Text style={{ fontWeight: "bold" }}>Biaya yang sudah dibayar</Text>
            <Text style={{ fontWeight: "bold", color: globalStyle.darkGrey }}>
              Rp 30000
            </Text>
          </View>

          {/* charge */}
          <View style={styles.payContainer}>
            <View>
              <Text style={{ fontWeight: "bold", color: "red" }}>
                Denda Terlambat
              </Text>
              <Text style={{ fontSize: 12, color: globalStyle.darkGrey }}>
                1 Hari
              </Text>
            </View>
            <Text
              style={{
                fontWeight: "bold",
                color: "red",
                alignSelf: "flex-start",
              }}
            >
              Rp 5000
            </Text>
          </View>

          {/* detail payment (if charge) */}
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
                <View>
                  <Text style={{ fontSize: 12 }}>{book.title}</Text>
                  <Text style={{ fontSize: 12, color: globalStyle.darkGrey }}>
                    1 Pcs, 3 Hari
                  </Text>
                  <Text
                    style={{ position: "absolute", right: 0, fontSize: 12 }}
                  >
                    Rp {book.price}
                  </Text>
                </View>

                <View>
                  <Text style={{ fontSize: 12 }}>Denda Terlambat</Text>
                  <Text style={{ fontSize: 12, color: globalStyle.darkGrey }}>
                    1 Pcs, 3 Hari
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
        </View>
      </ScrollView>

      <Button
        title="Kembalikan Buku"
        style={{ backgroundColor: globalStyle.mustard }}
      />
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
    paddingBottom: 16,
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
