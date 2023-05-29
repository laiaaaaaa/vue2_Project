<template>
  <div>
    <div class="header">
      <span class="header-title">搜索用户数</span>
      <i class="el-icon-warning-outline"></i>
    </div>
    <div class="mian">
      <span class="main-title">12321</span>
      <span class="main-content">17.1</span>
      <svg
        t="1682306828904"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2884"
        width="16"
        height="16"
      >
        <path d="M960 704L512 256l-448 448z" fill="#d81e06" p-id="2885"></path>
      </svg>
      <svg
        t="1682306947822"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2264"
        width="16"
        height="16"
      >
        <path
          d="M941.808046 195.931415 512 828.068585 82.191954 195.931415Z"
          p-id="2265"
          fill="#1afa29"
        ></path>
      </svg>
    </div>
    <div class="footer" ref="charts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Detail",
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        type: "category",
      },
      yAxis: {},
      series: [
        {
          type: "line",
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          lineStyle: {
            color: "cyan",
          },
          itemStyle: {
            opacity: 0,
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "cyan", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          smooth: true,
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

<style scoped>
.header-title {
  margin-right: 10px;
}
.main-title {
  margin-right: 25px;
}
.main-title {
  font-size: 25px;
  margin-top: 15px;
}
.mian {
  margin: 10px 0;
}
.footer {
  height: 50px;
}
</style>