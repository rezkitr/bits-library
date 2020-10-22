import React, { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { bitsLibApi } from "../api/bitsLibApi";

import BookCartContext from "./bookCartContext";
import BookContext from "./bookContext";
import UserContext from "./userContext";

const RentContext = React.createContext();

export const RentProvider = ({ children }) => {
  const { bookCart } = useContext(BookCartContext);
  const { books } = useContext(BookContext);
  const { user } = useContext(UserContext);

  const [listOnRent, setListOnRent] = useState([]);
  const [listReturned, setListReturned] = useState([]);

  useEffect(() => {
    if (books.length > 0) {
      getRentList();
    }
    console.log("Helo");
  }, [user]);

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
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRentList = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const rentData = await bitsLibApi.get(`/borrow/index/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = [];
      let onrent = [];
      let returned = [];
      let bookList = [];
      for (const [i, item] of rentData.data.data.entries()) {
        data.push({ rentData: item });

        const bookData = await bitsLibApi.get(`/borrow/view/${item.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        for (const item of bookData.data.data.borrowd) {
          // console.log(item);
          const bookIndex = books.findIndex((book) => book.id == item.book_id);

          bookList.push({
            name: books[bookIndex].name,
            author: books[bookIndex].author,
            ...item,
          });

          data[i] = { ...data[i], books: bookList };
        }
        bookList = [];
      }

      for (const item of data) {
        if (item.rentData.status === "N") {
          onrent.push(item);
        } else {
          returned.push(item);
        }
      }
      setListOnRent(onrent);
      setListReturned(returned);
    } catch (error) {
      console.log(error);
    }
  };

  const getRentDetail = async (rentId) => {
    const token = await AsyncStorage.getItem("token");
    const response = await bitsLibApi.get(`/borrow/view/${rentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let data;
    let rentData = response.data.data.borrow;
    let bookList = [];
    for (const item of response.data.data.borrowd) {
      const bookData = books.find((book) => book.id == item.book_id);

      bookList.push({
        name: bookData.name,
        author: bookData.author,
        ...item,
      });
    }

    data = {
      rentData,
      books: bookList,
    };
    return data;
  };

  const returnBook = async (rentId) => {
    const token = await AsyncStorage.getItem("token");
    const response = await bitsLibApi.post(
      `/return/${rentId.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  return (
    <RentContext.Provider
      value={{
        listOnRent,
        listReturned,
        createRent,
        getRentList,
        returnBook,
        getRentDetail,
      }}
    >
      {children}
    </RentContext.Provider>
  );
};

export default RentContext;
