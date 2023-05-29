<template>
  <div class="card">
    <el-card>
      <div class="search-header">
        <div slot="header">线上热门搜索</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="main">
        <el-row :gutter="10">
          <el-col :span="12"><Detail /> </el-col>
          <el-col :span="12"> <Detail /></el-col>
        </el-row>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          border
        >
          <!-- :formatter="formatter" -->
          <el-table-column type="index" label="排名" sortable width="80">
          </el-table-column>
          <el-table-column label="搜索关键字" width="180"> </el-table-column>
          <el-table-column label="用户数" sortable> </el-table-column>
          <el-table-column label="周涨幅" sortable> </el-table-column>
        </el-table>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        class="pagination"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Detail from "./Detail";
export default {
  name: "Search",
  data() {
    return {
      tableData: [{}],
    };
  },
  components: {
    Detail,
  },
};
</script>

<style >
.card {
  margin: 10px 0;
  height: 400px;
}

.search-header {
  display: flex;
  justify-content: space-between;
}
.main {
  margin: 40px 0;
}
.pagination {
  text-align: right;
  margin: 10px 0;
}
</style>