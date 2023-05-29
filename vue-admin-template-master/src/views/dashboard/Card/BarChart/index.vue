<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Barchart",
  mounted() {
    let barChart = echarts.init(this.$refs.charts);
    barChart.setOption({
      xAxis: {
        type: "category",
      },
      yAxis: {},
      series: [
        {
          type: "bar",
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44, 33, 22, 8],
          color: "cyan",
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style>
</style>