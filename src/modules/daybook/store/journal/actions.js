// export const myAction = async ({ commit }, payload) => {}

import journalApi from "@/api/journalApi";

export const loadEntries = async ({ commit }) => {
  try {
    const { data } = await journalApi.get("/entries.json");

    if (!data) {
      commit("setEntries", []);
      return;
    }
    const entries = [];
    for (let id of Object.keys(data)) {
      entries.push({
        id,
        ...data[id],
      });
    }

    commit("setEntries", entries);
  } catch (error) {
    console.log(error);
  }
};

export const updateEntry = async ({ commit }, entry) => {
  try {
    const { id, ...dataToSAve } = entry;
    await journalApi.put(`/entries/${id}.json`, dataToSAve);

    commit("updateEntry", { ...entry });
  } catch (error) {
    console.log(error);
  }
};

export const createEntry = async ({ commit }, newEntry) => {
  try {
    const { data } = await journalApi.post(`/entries.json`, newEntry);
    newEntry.id = data.name;
    commit("addEntry", newEntry);
    return newEntry.id;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEntry = async ({ commit }, id) => {
  try {
    await journalApi.delete(`/entries/${id}.json`);
    commit("deleteEntry", id);
  } catch (error) {
    console.log(error);
  }
};
