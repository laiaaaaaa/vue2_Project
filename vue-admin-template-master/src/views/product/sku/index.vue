<template>
  <div>
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" align="center" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="250">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="230">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110" align="center">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(kg)" width="120">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            icon="el-icon-sort-up"
            size="mini"
            v-if="row.isSale == 0"
            @click="sale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-sort-down"
            size="mini"
            v-else
            @click="cancel(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getSkuList"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      style="text-align: center; margin-top: 20px"
    >
    </el-pagination>
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16"> {{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"> 描述</el-col>
        <el-col :span="16"> {{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"> 价格</el-col>
        <el-col :span="16"> {{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"> 平台属性</el-col>
        <el-col :span="16">
          <el-tag
            v-for="(attr, index) in skuInfo.skuAttrValueList"
            :key="attr.id"
            type="success"
            style="margin: 5px 5px"
            >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="500px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" style="width: 100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "sku",
  data() {
    return {
      page: 1,
      limit: 10,
      records: [],
      total: 0,
      skuInfo: {},
      drawer: false,
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages;
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuInfo(page, limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "商品上架成功" });
      }
    },
    async cancel(row) {
      let result = await this.$API.sku.reqCancel(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "商品下架成功" });
      }
    },
    edit() {
      this.$message({ type: "message", message: "功能正在开发中..." });
    },
    async getSkuInfo(sku) {
      this.drawer = true;
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
  },
};
</script>

<style>
.el-col-5 {
  text-align: right;
  font-size: 18px;
}
.el-col {
  margin: 10px;
}
</style>