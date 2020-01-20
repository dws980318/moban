<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item label-width="50">
              <el-button type="warning" size="small" icon="el-icon-plus" @click="hanldeAdd()">新增</el-button>
              <el-button size="small" class="btn" @click="toggleSelection([tableData[rows]])">全选</el-button>
              <el-button size="small" class="btn">导出</el-button>
            </el-form-item>
            <el-form-item label>
              <el-input size="small" v-model="searchData.name" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label-width="50">
              <el-button type="primary" size="small" icon="el-icon-search" @click="hanldeSeach()">搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="table">
            <el-table
              :data="tableData"
              :header-cell-class-name="cellClass"
              :header-cell-style="getRowClass"
              @selection-change="handleSelectionChange"
              border
              ref="multipleTable"
              style="width: 100%"
            >
              <el-table-column align="center" type="selection" width="50"></el-table-column>
              <el-table-column align="center" label="序号" prop="id" width="50"></el-table-column>
              <el-table-column align="center" label="栏目" prop="caption" width="auto"></el-table-column>
              <el-table-column align="center" label="主题" prop="content" width="auto"></el-table-column>
              <el-table-column align="center" label="上传人" prop="name" width="120"></el-table-column>
              <el-table-column align="center" label="上线时间" prop="createTime" width="150"></el-table-column>
              <el-table-column align="center" label="附件预览" width="120">
                <template slot-scope="scope">
                  <span @click="dialogVisibleLookAction(scope.$index, scope.row)">预览</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="160">
                <template slot-scope="scope">
                  <span @click="toCheckDoorMessage(scope.$index, scope.row.id)">查看</span>
                  <span @click="toEditorDoorMessage(scope.$index, scope.row.id)">编辑</span>
                  <span @click="handleToDelete(scope.$index)">删除</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--考试管理页面 -->

          <!-- 导出弹窗 -->
          <el-dialog :visible.sync="dialogVisible" class="dialogVisible" true width="50%">
            <div style="height:100px">
              <span>点击确定将导出数据</span>
            </div>
            <span class="dialog-footer" slot="footer">
              <form
                action="/creaRecruitment/exporRecruitment"
                method="get"
                style="display: inline-block"
              >
                <input style="display:none" type="text" name="UserSelectionId" :value="selection" />
                <input
                  @click="deriveAction"
                  style="color: #fff !important;
                  border: 1px solid #2b621b !important;
                  background-color: #2b621b !important;
                  border: none;
                  width: 140px;
                  height: 40px;"
                  type="submit"
                  value="确 定"
                />
              </form>
              <!-- <el-button type="primary" @click="deriveAction">确 定</el-button> -->
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
          <!-- 导出弹窗 -->

          <!-- 删除弹窗 -->
          <el-dialog :visible.sync="toDelete" class="dialogVisible" true width="50%">
            <div style="height:100px">
              <span>点击确定将删除该栏目</span>
            </div>
            <span class="dialog-footer" slot="footer">
              <el-button @click="remove" type="primary">确 定</el-button>
              <el-button @click="toDelete = false">取 消</el-button>
            </span>
          </el-dialog>
          <!-- 删除弹窗 -->

          <!-- 招生查看弹窗 -->
          <el-dialog
            style="margin-top:-10vh;"
            class="dialogVisibleLook"
            :visible.sync="dialogVisibleLook"
            width="70%"
            true
          >
            <div class="lookInfo" style="height:700px">
              <!-- 头部 -->
              <div class="head">
                <span>附件</span>
              </div>
              <div class="center">
                <div class="container" style="height: 700px;">
                  <iframe
                    :src="'http://view.officeapps.live.com/op/view.aspx?src=' + versionUrl"
                    width="100%"
                    height="700px"
                    frameborder="1"
                  >111</iframe>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisibleLook = false">返回</el-button>
            </div>
          </el-dialog>
          <!-- 招生查看弹窗 -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 全选
      multipleSelection: [],
      rows: [],
      // 全选
      currentPage: 1,
      pageSize: 20,
      total: 0,
      dialogVisible: false,
      dialogVisibleLook: false,
      toDelete: false,

      tableData: [],
      options1: [],
      options2: [
        { label: "审核中", value: 0 },
        { label: "审核通过", value: 1 },
        { label: "审核失败", value: 2 }
      ],
      Avalue: "",
      Bvalue: "",
      one: "",
      selection: "",
      caption: "",
      versionUrl: '',
        searchData: {
        startDate: "",
        endDate: "",
        name: "",
        state: "",
        currentPage: 1,
        pageSize: 10
      },
    };
  },

  methods: {
     dialogVisibleLookAction(index, row) {
      this.dialogVisibleLook = true;
       this.versionUrl = row.annex;
       console.log(row.annex)
    },
    // 删除
    handleToDelete(index) {
      this.toDelete = true;
      console.log(this.tableData[index]);
      this.one = this.tableData[index];
    },
    remove() {
      this.toDelete = false;
      const fd = new FormData();
      fd.append("id", this.one.id);
      this.$http.post("/creaRecruitment/deleteRecruitment", fd).then(res => {
        console.log(res);
        if (res.code == 200) {
          if (this.tableData.length === 1) {
            this.currentPage--;
          }
          this.eachAction();
          this.$message.success(res.message);
        }
      });
      // this.tableData.splice(this.one, 1);
    },
    // 全选
    cellClass(row) {
      if (row.columnIndex === 0) {
        return "DisabledSelection";
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleAllSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selection = this.multipleSelection.map(item => {
        return item.id;
      });
      this.selection = (',' + this.selection.join(",") + ',');
      console.log(this.selection);
    },
    //导出
    dialogVisibleShow() {
      if (this.selection !== ',,' && this.selection)  {
        this.dialogVisible = true;
      } else {
        this.$message.error("请勾选要导出的数据");
      }
    },
    deriveAction() {
      this.dialogVisible = false;
      this.$message.success("导出成功");
    },
    // 添加样式
    getRowClass({ rowIndex }) {
    },
    // 新增
    hanldeAdd() {
      this.$router.push({ path: "/sell/two/add" });
    },
    // 查看
    toCheckDoorMessage(index, row) {
      this.$router.push({
        path: `/sell/two/${row}`
        // params: { id: this.tableData[index].id }
      });
    },
    // 编辑
    toEditorDoorMessage(index, row) {
      this.$router.push({
        path: `/sell/two/${row}`
        // params: { content: this.tableData[index] }
      });
    },
    // 列表数据
    eachAction() {
      this.$http
        .get("creaRecruitment/selectRecruitmentList", {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            caption: this.caption,
            gateway_type: 2
          }
        })
        .then(res => {
          console.log(res);
          let newData = res.data.records;
          this.tableData = newData;
          this.options1 = newData;
          this.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //改变页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.eachAction();
    },

    //修改条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.eachAction();
    }
  },
  watch: {
    // 监听页数变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.eachAction();
    }
  },
  created() {
    // this.eachAction();
  }
};
</script>

<style lang="stylus" scoped>
</style>
