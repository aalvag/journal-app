import { createStore } from "vuex";
import journalModule from "./journal";

const store = createStore({
  journal: journalModule,
});

export default store;
