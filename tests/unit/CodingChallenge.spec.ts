import { shallowMount } from "@vue/test-utils";
import CodingChallenge from "@/components/CodingChallenge.vue";
import OptionForm from "@/components/OptionForm.vue";
import RiskRewardGraph from "@/components/RiskRewardGraph.vue";

describe("CodinChallenge.vue", () => {
  let wrapper: any;

  afterEach(() => {
    wrapper.destroy();
  });

  it("should copy optionsData prop and add keys", () => {
    wrapper = shallowMount(CodingChallenge, {
      propsData: {
        optionsData: [
          {
            type: "Call",
            strike_price: 100,
            bid: 10,
            ask: 12,
            long_short: "long",
            expiration_date: "2025-12-17T00:00:00Z",
          },
          {
            type: "Put",
            strike_price: 100,
            bid: 10,
            ask: 12,
            long_short: "long",
            expiration_date: "2025-12-17T00:00:00Z",
          },
        ],
      },
    });
    expect(wrapper.vm.$data.options.length).toBe(2);
    expect(wrapper.vm.$data.options[0].key).toBeDefined();
    expect(wrapper.vm.$data.options[1].key).toBeDefined();

    expect(wrapper.findAllComponents(OptionForm).length).toBe(2);
    expect(wrapper.findAllComponents(RiskRewardGraph).length).toBe(1);
  });

  it("should show add button if a number of options < 4", () => {
    wrapper = shallowMount(CodingChallenge, {
      propsData: {
        optionsData: [
          {
            type: "Call",
            strike_price: 100,
            bid: 10,
            ask: 12,
            long_short: "long",
            expiration_date: "2025-12-17T00:00:00Z",
          },
          {
            type: "Put",
            strike_price: 100,
            bid: 10,
            ask: 12,
            long_short: "long",
            expiration_date: "2025-12-17T00:00:00Z",
          },
        ],
      },
    });
    expect(wrapper.find(".btn-add").exists()).toBeTruthy();
  });

  it("should hid add button if a number of options >= 4", () => {
    wrapper = shallowMount(CodingChallenge, {
      propsData: {
        optionsData: [
          {
            type: "Call",
            strike_price: 100,
            bid: 10,
            ask: 12,
            long_short: "long",
            expiration_date: "2025-12-17T00:00:00Z",
          },
          {
            type: "Put",
            strike_price: 100,
            bid: 10,
            ask: 12,
            long_short: "long",
            expiration_date: "2025-12-17T00:00:00Z",
          },
          {
            type: "Put",
            strike_price: 100,
            bid: 10,
            ask: 12,
            long_short: "long",
            expiration_date: "2025-12-17T00:00:00Z",
          },
          {
            type: "Put",
            strike_price: 100,
            bid: 10,
            ask: 12,
            long_short: "long",
            expiration_date: "2025-12-17T00:00:00Z",
          },
        ],
      },
    });
    expect(wrapper.find(".btn-add").exists()).toBeFalsy();
  });
});
