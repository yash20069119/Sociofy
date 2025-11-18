
import axios from "axios";

const rootClient = axios.create({
  baseURL: import.meta.env.VITE_ROOT_URL,
  withCredentials: true,
});

export default rootClient;
