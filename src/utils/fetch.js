import axios from "axios";
import { apiUrl } from "../config/constants";

export const testFunc = (text) => {
  console.log("TEST", text);
};

export const fetchActorsList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/actors`);
    return response.data;
  } catch (error) {
    console.log(error);
    return "error";
  }
};
