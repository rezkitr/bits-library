import React from "react";
import { Text } from "react-native";

const PriceTag = ({ price, style }) => {
  const separator = (price) => {
    const result = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return result;
  };

  return <Text style={{ ...style }}>Rp {separator(price)}</Text>;
};

export default PriceTag;
