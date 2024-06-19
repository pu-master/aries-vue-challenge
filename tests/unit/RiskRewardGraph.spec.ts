import { shallowMount } from "@vue/test-utils";
import RiskRewardGraph from "@/components/RiskRewardGraph.vue";

describe("RiskRewardGraph.vue", () => {
  it("should compute chart data", () => {
    const wrapper = shallowMount(RiskRewardGraph, {
      propsData: {
        options: [
          {
            type: "Call",
            strike_price: 10,
            bid: 1,
            ask: 3,
            long_short: "long",
            expiration_date: "2025-12-17T00:00:00Z",
          },
          {
            type: "Put",
            strike_price: 12,
            bid: 1,
            ask: 3,
            long_short: "long",
            expiration_date: "2025-12-17T00:00:00Z",
          },
        ],
      },
    });

    expect((wrapper.vm as any).chartData).toEqual({
      labels: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24,
      ],
      datasets: [
        {
          data: [
            -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -1, 0, 1, 2, 3, 4, 5, 6,
            7, 8, 9, 10, 11, 12,
          ],
          label: "Option #1",
          pointRadius: [
            10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 10,
          ],
          pointHoverRadius: [
            15, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 15, 4, 4, 4, 4, 4, 4, 4, 4, 4,
            4, 4, 15,
          ],
          pointStyle: [
            "triangle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "star",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "rectRot",
          ],
        },
        {
          data: [
            10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -2, -2, -2, -2, -2, -2,
            -2, -2, -2, -2, -2, -2,
          ],
          label: "Option #2",
          pointRadius: [
            10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1,
          ],
          pointHoverRadius: [
            15, 4, 4, 4, 4, 4, 4, 4, 4, 4, 15, 4, 15, 4, 4, 4, 4, 4, 4, 4, 4, 4,
            4, 4, 4,
          ],
          pointStyle: [
            "rectRot",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "star",
            "circle",
            "triangle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
            "circle",
          ],
        },
      ],
    });

    wrapper.destroy();
  });
});
