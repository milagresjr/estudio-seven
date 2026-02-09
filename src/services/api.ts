// api.ts

import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.softseven.ao/api",
  withCredentials: true,
});

export const apiImage = axios.create({
  baseURL: "https://api.softseven.ao",
  withCredentials: true,
});