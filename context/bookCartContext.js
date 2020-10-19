import React, { useReducer } from "react";

const BookCartContext = React.createContext();

const bookCartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      if (!state.length) {
        return [...state, { book: action.payload, qty: 1 }];
      } else {
        let duplicate = false;
        let duplicateIndex;
        state.map((item, index) => {
          if (item.book.id == action.payload.id) {
            duplicate = true;
            duplicateIndex = index;
          }
        });

        if (duplicate) {
          state[duplicateIndex] = {
            book: state[duplicateIndex].book,
            qty: state[duplicateIndex].qty + 1,
          };
          return state;
        } else {
          return [...state, { book: action.payload, qty: 1 }];
        }
      }

    case "DELETE_BOOK":
      return state.filter((item) => item.book.id !== action.payload);

    case "INC_QTY":
      return state.map((item) => {
        if (item.book.id !== action.payload) {
          return item;
        }
        return { ...item, qty: item.qty + 1 };
      });

    case "DEC_QTY":
      return state.map((item) => {
        if (item.book.id !== action.payload) {
          return item;
        }

        if (item.qty - 1 < 1) {
          return { ...item };
        } else {
          return { ...item, qty: item.qty - 1 };
        }
      });

    case "RESET":
      return (state = []);

    default:
      return state;
  }
};

export const BookCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookCartReducer, []);

  const addBook = (book) => {
    dispatch({ type: "ADD_BOOK", payload: book });
  };

  const deleteBook = (id) => {
    dispatch({ type: "DELETE_BOOK", payload: id });
  };

  const increaseQty = (id) => {
    dispatch({ type: "INC_QTY", payload: id });
  };
  const decreaseQty = (id) => {
    dispatch({ type: "DEC_QTY", payload: id });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <BookCartContext.Provider
      value={{
        bookCart: state,
        addBook,
        deleteBook,
        increaseQty,
        decreaseQty,
        reset,
      }}
    >
      {children}
    </BookCartContext.Provider>
  );
};

export default BookCartContext;
