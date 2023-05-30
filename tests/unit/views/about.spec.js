import { shallowMount } from "@vue/test-utils";
import About from "@/views/AboutView.vue";

describe("About", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(About);
    expect(wrapper.element).toMatchSnapshot();
  });
});
