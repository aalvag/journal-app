import { shallowMount } from "@vue/test-utils";
import EntryComponent from "@/modules/daybook/components/EntryOne.vue";
import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear";

describe("EntryComponent", () => {
  let wrapper;
  const entry = {
    id: "1",
    text: "Sample entry text for test purposes only.",
    date: new Date(2023, 5 - 1, 30),
  };

  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallowMount(EntryComponent, {
      props: { entry },
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  it("must macth snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("redirects to entry view", () => {
    const entryView = wrapper.find(".entry-container");
    entryView.trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: entry.id },
    });
  });

  it("renders shortText correctly", () => {
    const expectedShortText = entry.text.length > 100 ? `${entry.text.substring(0, 100)}...` : entry.text;
    expect(wrapper.vm.shortText).toBe(expectedShortText);
  });

  it("renders day correctly", () => {
    const { day } = getDayMonthYear(entry.date);
    expect(wrapper.vm.day).toBe(day);
  });

  it("renders month correctly", () => {
    const { month } = getDayMonthYear(entry.date);
    expect(wrapper.vm.month).toBe(month);
  });

  it("renders yearDay correctly", () => {
    const { yearDay } = getDayMonthYear(entry.date);
    expect(wrapper.vm.yearDay).toBe(yearDay);
  });

  it("renders yearMonth correctly", () => {
    const { yearMonth } = getDayMonthYear(entry.date);
    expect(wrapper.vm.yearMonth).toBe(yearMonth);
  });
});
