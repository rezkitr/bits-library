import React, { useContext } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { globalStyle } from "../styles/globalStyle";
import BookCartContext from "../context/bookCartContext";

const BookItem = ({ item }) => {
  const value = useContext(BookCartContext);
  return (
    <View style={styles.itemContainer}>
      <View>
        <Image
          source={{
            uri:
              "https://i.pinimg.com/564x/17/fe/4d/17fe4dcf3546a5804efa04b3f7879dc4.jpg",
          }}
          style={styles.coverImg}
          resizeMode="stretch"
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
          paddingLeft: 15,
        }}
      >
        <View>
          <Text style={styles.title}>{item.book.name}</Text>
          <Text style={styles.author}>Oleh : {item.book.author}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View>
            <Text style={{ color: globalStyle.darkGrey }}>Jumlah</Text>
            <View style={{ flexDirection: "row", marginTop: 4 }}>
              <Feather
                name="minus"
                size={20}
                style={{ ...styles.qtyBtn, ...styles.qtyBtnMinus }}
                onPress={() => value.decreaseQty(item.book.id)}
              />
              <Text style={styles.qty}>{item.qty}</Text>
              <Feather
                name="plus"
                size={20}
                style={{ ...styles.qtyBtn, ...styles.qtyBtnPlus }}
                onPress={() => value.increaseQty(item.book.id)}
              />
            </View>
          </View>
          <View>
            <Feather
              name="trash"
              size={20}
              color={globalStyle.grey}
              onPress={() => value.deleteBook(item.book.id)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },

  coverImg: {
    width: 84,
    height: 110,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  author: {
    color: globalStyle.darkGrey,
    marginTop: 3,
  },
  qtyBtn: {
    borderWidth: 0.5,
    borderColor: globalStyle.grey,
    padding: 4,
    color: globalStyle.darkGrey,
  },
  qtyBtnPlus: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  qtyBtnMinus: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  qty: {
    paddingHorizontal: 14,
    borderTopColor: globalStyle.grey,
    borderBottomColor: globalStyle.grey,
    fontSize: 16,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    textAlignVertical: "center",
  },
});

export default BookItem;
