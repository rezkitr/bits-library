import axios from "axios";

export const bitsLibApi = axios.create({
  baseURL: "https://bits-library.herokuapp.com/api",
});
