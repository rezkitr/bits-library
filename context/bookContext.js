import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { bitsLibApi } from "../api/bitsLibApi";

const BookContext = React.createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const getBookList = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await bitsLibApi.get("/book/index", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        setBooks(response.data.data);
      }
    } catch (error) {
      console.log("no token yet");
    }
  };

  const getPopularBooks = () => {
    getBookList();
  };

  const getLatestBook = () => {
    getBookList();
  };

  return (
    <BookContext.Provider
      value={{
        books: books,
        getBookList,
        getPopularBooks,
        getLatestBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;
