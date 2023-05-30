import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("HomeView", () => {
  it("renders the component correctly", () => {
    const wrapper = shallowMount(HomeView);

    expect(wrapper.find(".home").exists()).toBe(true);
  });

  it("navigates to daybook when button is clicked", async () => {
    const mockRouterPush = jest.fn();
    const wrapper = shallowMount(HomeView, {
      global: {
        mocks: {
          $router: { push: mockRouterPush },
        },
      },
    });

    await wrapper.find("button.btn-primary").trigger("click");

    expect(mockRouterPush).toHaveBeenCalledWith({ name: "daybook" });
  });
});
