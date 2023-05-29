<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="row">
              <HintButton
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SKU"
                @click="addSku(row)"
              ></HintButton>
              <HintButton
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></HintButton>
              <HintButton
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></HintButton>
              <el-dialog
                :title="`${spu.spuName}的sku列表`"
                :visible.sync="dialogTableVisible"
                :before-close="close"
              >
                <el-table
                  :data="skuList"
                  style="width: 100%"
                  border
                  v-loading="loading"
                >
                  <el-table-column prop="skuName" label="名称" width="width">
                  </el-table-column>
                  <el-table-column prop="price" label="价格" width="width">
                  </el-table-column>
                  <el-table-column prop="weight" label="重量" width="width">
                  </el-table-column>
                  <el-table-column prop="prop" label="默认图片" width="width">
                    <template slot-scope="{ row }">
                      <img
                        :src="row.skuDefaultImg"
                        style="width: 100px; height: 100px"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <HintButton
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  name: "spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 3,
      records: [],
      total: 23,
      scene: 0,
      dialogTableVisible: false,
      skuList: [],
      spu: {},
      loading: true,
    };
  },
  components: { SkuForm, SpuForm },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      try {
        let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
        this.total = result.data.total;
        this.records = result.data.records;
      } catch (error) {}
    },
    handleCurrentChange(page) {
      this.getSpuList(page);
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    changeScene({ scene, flag }) {
      this.scene = scene;

      if (flag == "编辑") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row.row);
    },
    changeScenes(scene) {
      this.scene = scene;
    },
    async handler(row) {
      this.dialogTableVisible = true;
      let result = await this.$API.sku.reqSkuList(row.row.id);
      if (result.code == 200) {
        this.skuList = result.data;
        this.spu = row.row;
        this.loading = false;
      }
    },
    close(done) {
      this.loading = true;
      this.skuList = [];
      done();
    },
  },
};
</script>

<style>
</style>