<template>
  <div>
    <el-button type="primary" icon='el-icon-plus' @click="showDialog">添加</el-button></el-button>
    <el-table style="width: 100%" border :data="list">
      <el-table-column
         type="index"
        label="序号"
        width="80px" 
        align="center">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="品牌LOGO"
        width="width">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" style="width:100px;height:75px">
        </template>
      </el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
        width="width">
        <template slot-scope="{row}">
        <el-button type="warning" size='mini' icon='el-icon-edit' @click="updateTradeMark(row)">修改</el-button>
        <el-button type="danger" size='mini' icon='el-icon-delete' @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      
    <el-pagination
    style="textAlign:center;margin-Top:20px"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :total="total"
      layout="prev, pager, next, jumper,->,sizes,total"
      @size-change="handleSizeChange"
      @current-change="getList"
     >
    </el-pagination>
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">


    <el-form style="width:80%" :model="tmForm" :rules="rules" ref="ruleForm">
    <el-form-item label="品牌名称" label-width="100px" prop="tmName">
      <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
    </el-form-item>
    <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
      <el-upload
      class="avatar-uploader"
      action="/dev-api/admin/product/fileUpload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      
      >
      <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
export default {
  name: "trademark",
  data() {
    var validateTmNAme = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error("请输入2-10位的品牌名称"));
      } else {
        callback();
      }
    };
    return {
      page: 1,
      limit: 3,
      list: [],
      total: 0,
      dialogFormVisible: false,
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          // {min: 2, max: 10,message: "长度在 2到 10 个字符",trigger: "change"},
          { validator: validateTmNAme, trigger: "change" }, //自定义校验规则
        ],
        logoUrl: [{ required: true, message: "请选择品牌LOGO" }],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList(pager = 1) {
      this.page = pager;
      const { page, limit } = this;
      let result = await this.$API.trademark.reqTrademarkList(page, limit);
      if (result.code == 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getList();
    },
    showDialog() {
      this.tmForm = { tmName: "", logoUrl: "" };
      this.dialogFormVisible = true;
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(res);
      this.tmForm.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      this.tmForm = { ...row };
    },
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false;
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
          }
          this.getList(this.tmForm.id ? this.page : 1);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deleteTradeMark(row) {
      this.$confirm(`确定删除${row.tmName}这个品牌嘛`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList(this.list.length > 1 ? this.page : this.page - 1);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>