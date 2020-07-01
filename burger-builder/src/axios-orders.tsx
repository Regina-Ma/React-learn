import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-c64cb.firebaseio.com/",
});

export default instance;
