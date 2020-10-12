import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { globalStyle } from "../styles/globalStyle";

const TabMenuDetail = ({ itemData }) => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setActiveTab(1)}>
          <Text
            style={{
              ...styles.tabTitle,
              color:
                activeTab == 1 ? globalStyle.darkGrey : globalStyle.lighGrey,
            }}
          >
            Sinopsis
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab(2)}>
          <Text
            style={{
              ...styles.tabTitle,
              color:
                activeTab == 2 ? globalStyle.darkGrey : globalStyle.lighGrey,
            }}
          >
            Tentang Buku
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.tabActiveIndicator,
          left: activeTab == 1 ? 20 : "21%",
          width: activeTab == 1 ? "14%" : "23%",
        }}
      ></View>

      <View
        style={{
          marginHorizontal: 20,
          marginTop: 8,
          flex: 1,
        }}
      >
        {activeTab == 1 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.synopsis}>{itemData.sinopsis}</Text>
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>ISBN</Text>
                <Text style={styles.label}>ISBN13</Text>
                <Text style={styles.label}>Genre</Text>
                <Text style={styles.label}>Bahasa</Text>
                <Text style={styles.label}>Tanggal Terbit</Text>
                <Text style={styles.label}>Jumlah Halaman</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.about}>{itemData.isbn}</Text>
                <Text style={styles.about}>{itemData.isbn_13}</Text>
                <Text style={styles.about}>{itemData.genre}</Text>
                <Text style={styles.about}>{itemData.language}</Text>
                <Text style={styles.about}>{itemData.date_pub}</Text>
                <Text style={styles.about}>{itemData.pages} Halaman</Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingBottom: 10,
    marginTop: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: globalStyle.lighGrey,
  },
  tabTitle: {
    marginRight: 12,
    fontWeight: "bold",
    fontSize: 14,
  },
  tabActiveIndicator: {
    height: 6,
    borderRadius: 4,
    backgroundColor: globalStyle.darkGrey,
    position: "relative",
    bottom: 4,
  },
  synopsis: {
    textAlign: "justify",
    color: globalStyle.darkGrey,
    fontSize: 15,
  },
  label: {
    fontSize: 14,
    color: globalStyle.darkGrey,
    marginBottom: 8,
  },
  about: {
    marginBottom: 8,
    marginLeft: 10,
  },
});

export default TabMenuDetail;
