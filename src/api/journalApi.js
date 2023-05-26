import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://daybook-api-default-rtdb.firebaseio.com",
});

export default journalApi;
