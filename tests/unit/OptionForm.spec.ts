import { Wrapper, shallowMount } from "@vue/test-utils";
import OptionForm from "@/components/OptionForm.vue";

describe("OptionForm.vue", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(OptionForm, {
      propsData: {
        value: {
          key: "abcdef",
          type: "Call",
          strike_price: 100,
          bid: 10,
          ask: 12,
          long_short: "long",
          expiration_date: "2025-12-17T00:00:00Z",
        },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should copy value prop", () => {
    expect(wrapper.vm.$data.option).toEqual({
      key: "abcdef",
      type: "Call",
      strike_price: 100,
      bid: 10,
      ask: 12,
      long_short: "long",
      expiration_date: "2025-12-17T00:00:00Z",
    });
  });

  it("should emit remove event when clicking on Remove button", async () => {
    await wrapper.find(".btn-remove").trigger("click");
    expect((wrapper.emitted().remove as Array<any>)[0]).toEqual(["abcdef"]);
  });

  it("should emit input event when changing data", async () => {
    await wrapper.find("#strike_price_abcdef").setValue(200);
    expect((wrapper.emitted().input as Array<any>)[0]).toEqual([
      {
        key: "abcdef",
        type: "Call",
        strike_price: "200",
        bid: 10,
        ask: 12,
        long_short: "long",
        expiration_date: "2025-12-17T00:00:00Z",
      },
    ]);
  });
});
