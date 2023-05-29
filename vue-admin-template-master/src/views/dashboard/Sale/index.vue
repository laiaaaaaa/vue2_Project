<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- v-model="value1" -->
        <el-date-picker
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          class="date"
          v-model="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="echarts" ref="echarts"></div>
        </el-col>
        <el-col :span="6">
          <h3>门店{{ title }}排名</h3>
          <ul>
            <li>
              <span class="rIndex">1</span>
              <span>肯德基</span>
              <span class="rValue">323,234</span>
            </li>
            <li>
              <span class="rIndex">2</span>
              <span>麦当劳</span>
              <span class="rValue">323,234</span>
            </li>
            <li>
              <span class="rIndex">3</span>
              <span>肯德基</span>
              <span class="rValue">323,234</span>
            </li>
            <li>
              <span class="rIndex">4</span>
              <span>海底捞</span>
              <span class="rValue">323,234</span>
            </li>
            <li>
              <span class="rIndex">5</span>
              <span>肯德基</span>
              <span class="rValue">323,234</span>
            </li>
            <li>
              <span class="rIndex">6</span>
              <span>肯德基</span>
              <span class="rValue">323,234</span>
            </li>
            <li>
              <span class="rIndex">7</span>
              <span>肯德基</span>
              <span class="rValue">323,234</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import dayjs from "dayjs";
import * as echarts from "echarts";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      myCharts: null,
      date: [],
    };
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.echarts);
    this.myCharts.setOption({
      title: { text: "销售额趋势" },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [410, 52, 200, 334, 390, 330, 220, 40, 52, 200, 334, 350],
          barWidth: 30,
        },
      ],
    });
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  watch: {
    title() {
      this.myCharts.setOption({
        title: { text: this.title + "趋势" },
      });
    },
  },
  methods: {
    setDay() {
      let day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      let start = dayjs().day(1).format("YYYY-MM-DD");
      let end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      let start = dayjs().startOf("month").format("YYYY-MM-DD");
      let end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      let start = dayjs().startOf("year").format("YYYY-MM-DD");
      let end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.date {
  width: 250px;
  margin: 0 20px;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0 10px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.echarts {
  height: 300px;
}
ul {
  list-style: none;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 8%;
  margin: 10px 0px;
}
.rIndex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  color: #fff;
  text-align: center;
}
.rValue {
  float: right;
}
h3 {
  padding: 0;
  margin: 0 0 0 0;
  margin-bottom: 20px;
}
span {
  margin: 0 10px;
}
.el-card_header {
  border-bottom: none;
}
</style>