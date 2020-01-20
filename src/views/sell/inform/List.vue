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
              style="width: 100%"
              border
              ref="multipleTable"
              :header-cell-class-name="cellClass"
            >
              <el-table-column align="center" type="selection" width="50"></el-table-column>
              <el-table-column label="序号" prop="id" width="50" align="center"></el-table-column>
              <el-table-column prop="distributor" label="标题" width="auto" align="center"></el-table-column>
              <el-table-column prop="receive" label="接收人" width="auto" align="center"></el-table-column>
              <el-table-column prop="name" label="更新人" width="200" align="center"></el-table-column>
              <el-table-column prop="creatTime" label="发布时间" width="240" align="center"></el-table-column>
              <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="toEditorMessage(scope.$index, scope.row.id)"
                  >编辑</el-button>
                   <el-button
                  size="mini"
                  type="danger"
                  @click="removeAction(scope.$index)"
                >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--考试管理页面 -->

          <!-- 导出弹窗 -->
          <el-dialog class="dialogVisible" :visible.sync="dialogVisible" width="50%" true>
            <div style="height:100px">
              <span>点击确定将导出数据</span>
            </div>
            <span slot="footer" class="dialog-footer">
              <form
                style="display: inline-block"
                action="http://192.168.0.252/creaAnnouncement/exporAnnouncementList"
                method="get"
              >
                <input style="display:none" type="text" name="UserSelectionId" :value="selection" />
                <input
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
          <el-dialog class="dialogVisible" :visible.sync="toDelete" width="50%" true>
            <div style="height:100px">
              <span>点击确定将删除该通知</span>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="remove">确 定</el-button>
              <el-button @click="toDelete = false">取 消</el-button>
            </span>
          </el-dialog>
          <!-- 删除弹窗 -->
          <!-- 弹窗 -->
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchData.currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import De from "../BUS/De";
// import request from "../../ajax/request";

export default {
  data() {
    return {
      // 全选
      multipleSelection: [],
      rows: [],
      // 全选
      dialogVisible: false,
      toDelete: false,
      searchData: {
        startDate: "",
        endDate: "",
        name: "",
        state: "",
        currentPage: 1,
        pageSize: 10
      },
      options: [
        {
          id: 1,
          name: "拆红包"
        }
      ],
      dialogVisible: false,
      selectIndex: 0,
      page: {
        total: 0
      },
      caption: "",
      tableData: [],
      options1: [
        { label: "全部", value: "" },
        { label: "审核中", value: 0 },
        { label: "审核通过", value: 1 },
        { label: "审核失败", value: 2 }
      ],
      options2: [
        { label: "全部", value: "" },
        { label: "未发布", value: 0 },
        { label: "已发布", value: 1 }
      ],
      Avalue: "",
      Bvalue: "",
      selection: ""
    };
  },
  methods: {
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
    // 新增
    hanldeAdd() {
      this.$router.push({ path: "/sell/inform/add" });
    },
    // 编辑
    toEditorMessage(index, row) {
      this.$router.push({
        path: `/sell/inform/${row}`
        // params: {
        //   content: this.tableData[index]
        // }
      });
    },
    // 列表数据
    eachAction() {
      let newData = [
        {
          id: 1,
          distributor: "广州（天河区）分销点",
          name: "石峥嵘",
          phone: 12345678910,
          reason: "电话打不通！",
          creatTime: "2019-03-06 09:45:55",
          state: 2
        },
        {
          id: 10,
          distributor: "广州（天河区）分销点",
          name: "石峥嵘",
          phone: 12345678910,
          reason: "电话打不通！",
          creatTime: "2019-03-06 09:45:55",
          state: 2
        }
      ];
      this.tableData = newData;
      this.page.total = newData.length;
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    // 删除
    removeAction(index) {
      this.toDelete = true;
      console.log(this.tableData[index]);
      this.one = this.tableData[index];
    },
    remove() {
      this.toDelete = false;
      const fd = new FormData();
      fd.append("id", this.one.id);
      this.$http.post("/creaAnnouncement/deleteAnnouncement", fd).then(res => {
        console.log(res);
        if (res.code == 200) {
          if (this.tableData.length === 1) {
            this.currentPage--;
          }
          this.eachAction();
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
      });
      // this.tableData.splice(this.one, 1);
    },
    handleSizeChange(val) {
      this.searchData.currpage = 1;
      this.searchData.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.searchData.currpage = val;
      this.init();
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
    }
  },
  created() {
    this.eachAction();
  }
};
</script>

<style scoped lang="stylus">
// 各种导出，删除，开启，关闭等弹窗的公用样式
.dialogVisible {
  span {
    display: block;
    text-align: center;
    line-height: 100px;
    font-size: 25px;
    text-decoration: none;
  }

  .dialog-footer {
    .el-button {
      width: 140px;
      height: 40px;
    }

    .el-button--primary {
      background-color: #0b7242 !important;
      border: none;

      &:hover {
        color: #fff !important;
        border: 1px solid #0b7242 !important;
      }
    }
  }
}
</style>
