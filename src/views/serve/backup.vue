<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item label-width="50">
              <el-button size="small" type="success">导入</el-button>
              <el-button size="small" class="btn" @click="toggleSelection([tableData[rows]])">全选</el-button>
              <el-button size="small" @click="dialogVisibleShow" class="btn">导出</el-button>
            </el-form-item>
            <el-form-item label>
              <el-input size="small" v-model="searchData.name" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label-width="50">
              <el-button type="primary" size="small" icon="el-icon-search" @click="eachAction()">搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="table">
            <el-table
              :data="tableData"
              style="width: 100%"
              border
              :header-cell-style="getRowClass"
              @selection-change="handleSelectionChange"
              ref="multipleTable"
              :header-cell-class-name="cellClass"
            >
              <el-table-column align="center" type="selection" width="50"></el-table-column>
              <el-table-column prop="id" label="位置" width="100" align="center"></el-table-column>
              <el-table-column prop="caption" label="备份名称" width="auto" align="center"></el-table-column>
              <el-table-column prop="name" label="操作人" width="200" align="center"></el-table-column>
              <el-table-column prop="createTime" label="备份时间" width="200" align="center"></el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <span @click="handleToDelete(scope.$index, scope.row)">删除</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--数据备份页面 -->

          <!-- 导出弹窗 -->
          <el-dialog class="dialogVisible" :visible.sync="dialogVisible" width="50%" true>
            <div style="height:100px">
              <span>点击确定将导出数据</span>
            </div>
            <span slot="footer" class="dialog-footer">
              <form style="display: inline-block" action="/creaBackup/exporAttestList" method="get">
                <input style="display:none" type="text" name="UserSelectionId" :value="selection" />
                <input
                  style="color: #fff !important;
            border: 1px solid #2b621b !important;
            background-color: #2b621b !important;
            border: none;    
            width: 140px;
            height: 40px;"
                  type="submit"
                  @click="deriveAction"
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
              <span>点击确定将删除“XXXXX”备份</span>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="remove">确 定</el-button>
              <el-button @click="toDelete = false">取 消</el-button>
            </span>
          </el-dialog>
          <!-- 删除弹窗 -->
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
      searchData: {
        startDate: "",
        endDate: "",
        name: "",
        state: "",
        currentPage: 1,
        pageSize: 10
      },

      dialogVisible: false,
      dialogVisibleLook: false,
      toDelete: false,
      tableData: [],
      one: "",
      selection: "",
      username: ""
    };
  },
  methods: {
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
      this.$http.post("/creaBackup/deleteBackup", fd).then(res => {
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
      this.selection = "," + this.selection.join(",") + ",";
      console.log(this.selection);
    },
    // 列表数据
    eachAction() {
      const fd = new FormData();
      this.$http
        .get("/creaBackup/selectBackupList", {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            userName: this.username
          }
        })
        .then(res => {
          console.log(res);
          let newData = res.data.map(item => {
            return {
              caption: item.caption,
              id: item.id,
              name: item.name,
              createTime: item.createTime,
              types: item.types
            };
          });
          this.tableData = newData;
          this.total = res.data.total;
          console.log(newData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加样式
    getRowClass({ rowIndex }) {},
    //导出
    dialogVisibleShow() {
      if (this.selection !== ",," && this.selection) {
        this.dialogVisible = true;
      } else {
        this.$message.error("请勾选要导出的数据");
      }
    },
    deriveAction() {
      this.dialogVisible = false;
      this.$message.success("导出成功");
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

<style scoped lang="stylus"></style>
