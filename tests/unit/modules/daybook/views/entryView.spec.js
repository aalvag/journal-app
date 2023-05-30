import { createStore } from "vuex";

import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../mock-data/test-journal-state";
import { shallowMount } from "@vue/test-utils";
import EntryViewVue from "@/modules/daybook/views/EntryView.vue";
import Swal from "sweetalert2";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe("Daybook Entry View", () => {
  const store = createVuexStore(journalState);
  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryViewVue, {
      props: {
        id: "-MjGQ7Q0Z1c3i9hjRyZO",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  it("must redirect the user because the id does not exist.", () => {
    shallowMount(EntryViewVue, {
      props: {
        id: "this-id-does-not-exist",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });

  it("must display the entry correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("must delete the entry and redirect to the main page", async () => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));
    const button = await wrapper.find(".btn-danger");
    await button.trigger("click");

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "Are you sure?",
      text: "The entry will be deleted permanently",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      icon: "warning",
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
