import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../../unit/mock-data/test-journal-state";
import { createStore } from "vuex";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: {
          ...initialState,
        },
      },
    },
  });

describe("journal-module", () => {
  it("should state must have these properties", () => {
    const store = createVuexStore(journalState);

    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // mutations
  it("mutation: setEntries", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    store.commit("journal/setEntries", journalState.entries);
    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.isLoading).toBeFalsy();
  });

  it("mutation: updateEntry", () => {
    const store = createVuexStore(journalState);
    const updatedEntry = {
      id: "-MfKM3yA5ij3hnmLFfqv",
      date: 1630368000000,
      text: "Updated text",
      picture: null,
    };
    store.commit("journal/updateEntry", updatedEntry);
    const entryUpdated = store.state.journal.entries.find((e) => e.id === updatedEntry.id);
    expect(entryUpdated).toEqual(updatedEntry);
  });

  it("mutation: addEntry & deleteEntry", () => {
    const store = createVuexStore(journalState);
    const newEntry = {
      id: "ABC-123",
      date: 1630368000000,
      text: "New entry",
      picture: null,
    };
    store.commit("journal/addEntry", newEntry);
    const entryAdded = store.state.journal.entries.find((e) => e.id === newEntry.id);
    expect(entryAdded).toBeTruthy();

    store.commit("journal/deleteEntry", newEntry.id);
    const entryDeleted = store.state.journal.entries.find((e) => e.id === newEntry.id);
    expect(entryDeleted).toBeFalsy();
  });

  // getters
  it("getters: getEntriesByTerm & getEntryById", () => {
    const store = createVuexStore(journalState);
    const [entry1, entry2] = journalState.entries;

    const entries = store.getters["journal/getEntriesByTerm"]("");
    expect(entries.length).toBe(2);

    const entries2 = store.getters["journal/getEntriesByTerm"]("second");
    expect(entries2.length).toBe(1);
    expect(entries2).toEqual([entry2]);

    const entryById = store.getters["journal/getEntryById"](entry1.id);
    expect(entryById).toEqual(entry1);

    const entryById2 = store.getters["journal/getEntryById"]("-1");
    expect(entryById2).toBeUndefined();
  });

  // actions
  it("actions: loadEntries", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch("journal/loadEntries");
    expect(store.state.journal.entries.length).toBe(5);
  });

  it("actions: updateEntry", async () => {
    const store = createVuexStore(journalState);
    const updatedEntry = {
      id: "-MfKM3yA5ij3hnmLFfqv",
      date: 1630368000000,
      text: "Updated text",
      picture: null,
    };
    await store.dispatch("journal/updateEntry", updatedEntry);
    expect(store.state.journal.entries.length).toBe(2);
    const entryUpdated = store.state.journal.entries.find((e) => e.id === updatedEntry.id);
    expect(entryUpdated).toEqual(updatedEntry);
  });

  it("actions: createEntry & deleteEntry", async () => {
    const store = createVuexStore(journalState);
    const newEntry = {
      id: "ABC-123",
      date: 1630368000000,
      text: "New entry",
      picture: null,
    };
    const id = await store.dispatch("journal/createEntry", newEntry);

    expect(typeof id).toBe("string");

    const entryAdded = store.state.journal.entries.find((e) => e.id === newEntry.id);
    expect(entryAdded).toBeTruthy();

    await store.dispatch("journal/deleteEntry", newEntry.id);

    const entryDeleted = store.state.journal.entries.find((e) => e.id === newEntry.id);
    expect(entryDeleted).toBeFalsy();
  });
});
