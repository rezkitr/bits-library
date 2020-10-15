import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { globalStyle } from "../styles/globalStyle";
import { nameShortener } from "../helperFunction/nameShortener";
import { titleShortener } from "../helperFunction/titleShortener";

import PriceTag from "./PriceTag";

const BookCard = ({
  completeInfo,
  touchable,
  item,
  containerStyle,
  coverImgStyle,
  titleStyle,
  authorStyle,
  priceStyle,
  navigation,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (!touchable) {
            return;
          } else {
            navigation.navigate("BookDetail", { itemData: item });
          }
        }}
      >
        <View style={{ ...styles.container, ...containerStyle }}>
          <Image
            style={{ ...styles.coverImg, ...coverImgStyle }}
            source={{
              uri:
                "https://i.pinimg.com/564x/17/fe/4d/17fe4dcf3546a5804efa04b3f7879dc4.jpg",
            }}
            resizeMode="stretch"
          />
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.title, ...titleStyle }}>
              {titleShortener(item.name)}
            </Text>
            <Text style={{ ...styles.author, ...authorStyle }}>
              {completeInfo ? item.author : nameShortener(item.author)}
            </Text>
          </View>
          <PriceTag
            price={item.price}
            style={{ ...styles.price, ...priceStyle }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

BookCard.defaultProps = {
  touchable: true,
  completeInfo: false,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 98,
  },
  coverImg: {
    borderRadius: 6,
    width: "100%",
    height: 140,
  },
  infoContainer: {
    height: 60,
    marginBottom: 8,
    paddingBottom: 5,
    paddingTop: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 3,
  },
  author: {
    fontSize: 10,
    color: globalStyle.grey,
    fontWeight: "bold",
    marginTop: 6,
    textAlign: "center",
  },
  price: {
    color: globalStyle.darkGrey,
    fontWeight: "bold",
    fontSize: 11.5,
    textAlign: "center",
  },
});

export default BookCard;
