<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥126560">
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;56.67%
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
                  <path
                    d="M960 704L512 256l-448 448z"
                    fill="#d81e06"
                    p-id="2885"
                  ></path></svg
              ></span>
              <span
                >日同比&nbsp;&nbsp;19.16%
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
              </span>
            </template>
            <template slot="footer"> 日销售额&nbsp;&nbsp;￥12343 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <LineChart />
            </template>
            <template slot="footer"> 日访问量&nbsp;&nbsp;1234 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts"> <BarChart /> </template>
            <template slot="footer"> 转化率&nbsp;&nbsp;65% </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts"> <ProgressChart /> </template>
            <template slot="footer">
              <span
                >周同比&nbsp;&nbsp;12%
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
                  <path
                    d="M960 704L512 256l-448 448z"
                    fill="#d81e06"
                    p-id="2885"
                  ></path></svg
              ></span>
              <span
                >日同比&nbsp;&nbsp;11%
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
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import ProgressChart from "./ProgressChart";
export default {
  name: "Card",
  components: { Detail, LineChart, BarChart, ProgressChart },
};
</script>

<style>
</style>