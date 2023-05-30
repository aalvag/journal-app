import { shallowMount } from "@vue/test-utils";
import IconButton from "@/modules/daybook/components/FollowActionButton.vue";

describe("IconButton", () => {
  it("renders the component correctly with default icon", () => {
    const wrapper = shallowMount(IconButton);

    expect(wrapper.find(".btn.btn-primary").exists()).toBe(true);
    expect(wrapper.find(".fa.fa-2x.fa-plus").exists()).toBe(true);
  });

  it("renders the component correctly with custom icon", () => {
    const customIcon = "fa-trash";
    const wrapper = shallowMount(IconButton, { propsData: { icon: customIcon } });

    expect(wrapper.find(`.fa.${customIcon}`).exists()).toBe(true);
  });

  it('emits "on:click" event when button is clicked', async () => {
    const wrapper = shallowMount(IconButton);

    await wrapper.find(".btn.btn-primary").trigger("click");

    expect(wrapper.emitted()["on:click"]).toBeTruthy();
    expect(wrapper.emitted()["on:click"].length).toBe(1);
  });
});
