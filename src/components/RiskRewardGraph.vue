<template>
  <div class="chart-wrapper">
    <LineChart
      id="risk-reward-graph"
      :options="chartOptions"
      :data="chartData"
    />
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
} from "chart.js";
import { OptionType } from "@/types";
import { calculatePL } from "@/helpers";

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
      const datasets: ChartDataset<"line">[] = [];
      this.options.forEach((option, index) => {
        strikePrices.push(Number(option.strike_price));
        datasets.push({ data: [], label: `Option #${index + 1}` });
      });

      // Set the range of underlying prices from 0
      // to 2x maximum strike price.
      const maxStrikePrice = Math.max(...strikePrices);
      const labels: number[] = [];
      for (let price = 0; price <= maxStrikePrice * 2; price += 1) {
        labels.push(price);

        this.options.forEach((option, index) => {
          datasets[index].data.push(calculatePL(option, price));
        });
      }

      return {
        labels,
        datasets,
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
}
</style>
