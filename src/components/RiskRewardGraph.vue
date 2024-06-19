<template>
  <div class="chart-wrapper">
    <LineChart
      id="risk-reward-graph"
      :options="chartOptions"
      :data="chartData"
    />
    <ul>
      <li><strong>Rectangle</strong> indicates max profits.</li>
      <li><strong>Triangle</strong> indicates max losses.</li>
      <li><strong>Star</strong> indicates break even points.</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Line as LineChart } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Colors,
  ChartOptions,
  ChartData,
  ChartDataset,
  Tooltip,
  Legend,
  PointStyle,
} from "chart.js";
import { OptionType } from "@/types";
import { calculateBreakEvenPoint, calculatePL } from "@/helpers";

ChartJS.register(
  Title,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Colors,
  Tooltip,
  Legend
);

export default Vue.extend({
  name: "RiskRewardGraph",
  components: {
    LineChart,
  },
  props: {
    options: Array as PropType<OptionType[]>,
  },
  data(): {
    chartOptions: ChartOptions<"line">;
  } {
    return {
      chartOptions: {
        responsive: true,
        aspectRatio: 1.5,
        elements: {
          line: {
            borderWidth: 1,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          title: {
            display: true,
            text: "Risk/Reward",
          },
          colors: {
            forceOverride: true,
          },
          tooltip: {
            enabled: true,
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Price of the underlying at the time of expiry",
            },
          },
          y: {
            title: {
              display: true,
              text: "Profit/Loss",
            },
          },
        },
      },
    };
  },
  computed: {
    chartData(): ChartData<"line"> {
      const strikePrices: number[] = [];
      const datasets: ChartDataset<"line" | "scatter">[] = [];
      // Keep track of max profit, max loss, break even points
      // for each option.
      const maxProfits: ({ x: number; y: number } | null)[] = [];
      const maxLosses: ({ x: number; y: number } | null)[] = [];
      const breakEvenPoints: number[][] = [];

      this.options.forEach((option, index) => {
        strikePrices.push(Number(option.strike_price));

        maxProfits.push(null);
        maxLosses.push(null);
        breakEvenPoints.push([]);

        // Add dataset for each option.
        datasets.push({
          data: [],
          label: `Option #${index + 1}`,
          pointRadius: [],
          pointHoverRadius: [],
          pointStyle: [],
        });
      });

      // Set the range of underlying prices from 0
      // to 2x maximum strike price.
      const maxStrikePrice = Math.max(...strikePrices);
      let labels: number[] = [];

      for (let price = 0; price <= maxStrikePrice * 2; price += 1) {
        labels.push(price);
      }

      // Some break even points don't fall into whole number prices,
      // so we need to add floating number prices for break even points.
      this.options.forEach((option) => {
        const breakEvenPoint = calculateBreakEvenPoint(option);
        if (breakEvenPoint > 0 && !labels.includes(breakEvenPoint)) {
          labels.push(breakEvenPoint);
        }
      });

      // Sort labels in ascending order.
      labels = labels.sort((a, b) => a - b);

      labels.forEach((price, labelIndex) => {
        this.options.forEach((option, index) => {
          const pl = calculatePL(option, price);

          datasets[index].data.push(pl);
          (datasets[index].pointRadius as number[]).push(1);
          (datasets[index].pointHoverRadius as number[]).push(4);
          (datasets[index].pointStyle as PointStyle[]).push("circle");

          // Keep track of break even points.
          if (pl === 0) {
            breakEvenPoints[index].push(labelIndex);
          }

          // Keep track of max profit/loss points.
          if (maxProfits[index] === null || Number(maxProfits[index]?.y) < pl) {
            maxProfits[index] = {
              x: labelIndex,
              y: pl,
            };
          }

          if (maxLosses[index] === null || Number(maxLosses[index]?.y) > pl) {
            maxLosses[index] = {
              x: labelIndex,
              y: pl,
            };
          }
        });
      });

      // For each max profit/loss point, mark them in a special way.
      maxProfits.forEach((profit, index) => {
        const xValue = Number(profit?.x);
        (datasets[index].pointRadius as number[])[xValue] = 10;
        (datasets[index].pointHoverRadius as number[])[xValue] = 15;
        (datasets[index].pointStyle as PointStyle[])[xValue] = "rectRot";
      });

      maxLosses.forEach((profit, index) => {
        const xValue = Number(profit?.x);
        (datasets[index].pointRadius as number[])[xValue] = 10;
        (datasets[index].pointHoverRadius as number[])[xValue] = 15;
        (datasets[index].pointStyle as PointStyle[])[xValue] = "triangle";
      });

      // For each break event point, mark them in a special way.
      breakEvenPoints.forEach((points, index) => {
        points.forEach((point) => {
          (datasets[index].pointRadius as number[])[point] = 10;
          (datasets[index].pointHoverRadius as number[])[point] = 15;
          (datasets[index].pointStyle as PointStyle[])[point] = "star";
        });
      });

      return {
        labels,
        datasets: datasets as ChartDataset<"line">[],
      };
    },
  },
});
</script>

<style scoped>
.chart-wrapper {
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
  text-align: left;
}
</style>
