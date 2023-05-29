<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "ProgressChart",
  mounted() {
    let barChart = echarts.init(this.$refs.charts);
    barChart.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        type: "category",
        show: false,
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "yellowgreen",
          barMaxWidth: 10,
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          label: {
            show: true,
            formatter: "|",
            position: "right",
            color: "yellowgreen",
          },
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