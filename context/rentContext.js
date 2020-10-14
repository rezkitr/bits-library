import React, { useReducer } from "react";

const RentContext = React.createContext();

const rentReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_RENT":
      return { ...state };
    case "ADD_BOOK":
      return state;

    default:
      return state;
  }
};

export const RentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rentReducer, {});

  const createRent = () => {
    dispatch({ type: "CREATE_RENT" });
  };

  return (
    <RentContext.Provider value={{ data: state, createRent }}>
      {children}
    </RentContext.Provider>
  );
};

export default RentContext;
