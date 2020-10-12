import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { bitsLibApi } from "../api/bitsLibApi";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [loginStatus, setloginStatus] = useState(null);
  const [user, setUser] = useState(null);

  const onLogin = async (email, password) => {
    try {
      const response = await bitsLibApi.post("/login", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.apikey_account);
      await getUser(response.data.usr_id, response.data.apikey_account);
      setloginStatus(response.data);
      // console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem("token");
    setloginStatus(null);
  };

  const getUser = async (id, token) => {
    try {
      const response = await bitsLibApi.get(`/usr/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUser = async (id, data) => {
    try {
      // console.log(id, data);
      const token = await AsyncStorage.getItem("token");
      const response = await bitsLibApi.put(
        `/usr/update/${id}`,
        {
          email: data.email,
          name: data.name,
          Mobile: data.mobile,
          Address: data.address,
          Password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getUser(id, token);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onConfirm = async (email, password) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await bitsLibApi.post(
        "/verified",
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loginStatus: loginStatus,
        user: user,
        onLogin: onLogin,
        onLogout: onLogout,
        updateUser: updateUser,
        onConfirm: onConfirm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
