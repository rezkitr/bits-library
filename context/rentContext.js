import React, { useReducer, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { bitsLibApi } from "../api/bitsLibApi";

import BookCartContext from "./bookCartContext";
import UserContext from "./userContext";

const RentContext = React.createContext();

const rentReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const RentProvider = ({ children }) => {
  const { bookCart } = useContext(BookCartContext);
  const { user } = useContext(UserContext);

  const [state, dispatch] = useReducer(rentReducer, {});

  const getItemBorrowed = () => {
    let borrowed = [];

    for (const item of bookCart) {
      borrowed.push({
        book_id: item.book.id,
        qty: item.qty,
        price: item.book.price,
        subtotal: item.book.price * item.qty,
      });
    }

    return borrowed;
  };

  const createRent = async ({ startDate, endDate, total }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await bitsLibApi.post(
        "/borrow/create",
        {
          borrow: {
            start_date: startDate,
            end_date: endDate,
            usr_id: user.id,
            status: "N",
            total: total,
          },
          borrowd: getItemBorrowed(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RentContext.Provider value={{ data: state, createRent }}>
      {children}
    </RentContext.Provider>
  );
};

export default RentContext;
