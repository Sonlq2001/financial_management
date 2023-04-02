<template lang="">
  <div class="text-white chart max-w-3xl mx-auto mb-6">
    <bar :options="chartOptions" :data="chartData" />
  </div>
</template>
<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";
import { computed } from "vue";
import { useStore } from "vuex";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  components: { Bar },
  setup() {
    const store = useStore();

    const data = computed(() => {
      const listMonths = [];
      for (let i = 1; i <= 12; i++) {
        listMonths.push(`Tháng ${i}`);
      }

      const dataChart = store.state.transaction?.syntheticTransactionsChart;
      return {
        labels: listMonths,
        datasets: [
          {
            label: "Chi phí",
            backgroundColor: "#f87979",
            data: dataChart,
          },
        ],
      };
    });

    return {
      chartData: data,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },

      dataTotal: data,
    };
  },
};
</script>
<style lang="css" scoped>
.chart canvas {
  width: 100%;
}
</style>
