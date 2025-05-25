import { BACKEND_URL } from "@/constants/Backend";
import axios from "axios";

export const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
