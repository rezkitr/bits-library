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
        } else {
          return [...state, { book: action.payload, qty: 1 }];
        }
      }

    default:
      return state;
  }
};

export const BookCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookCartReducer, []);

  const addBook = (book) => {
    dispatch({ type: "ADD_BOOK", payload: book });
  };

  return (
    <BookCartContext.Provider value={{ bookCart: state, addBook }}>
      {children}
    </BookCartContext.Provider>
  );
};

export default BookCartContext;
