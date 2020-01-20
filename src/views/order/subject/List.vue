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
              <el-button type="primary" size="small" class="btn">导入</el-button>
            </el-form-item>
            <el-form-item label>
              <el-input size="small" v-model="searchData.name" placeholder="科目名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="searchData.typeid" clearable placeholder="请选择更新人">
                <el-option
                  v-for="(item, key, index) in options"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="50">
              <el-button type="primary" size="small" icon="el-icon-search" @click="hanldeSeach()">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table">
          <!--          :row-class-name="tableRowClassName"-->
          <!-- 根据状态选择样式-->
          <el-table
            :data="tableData"
            border
            :header-cell-style="{background:'#fafafa'}"
            v-loading="loading"
            ref="multipleTable"
            style="width: 100%"
            :header-cell-class-name="cellClass"
          >
            <el-table-column align="center" type="selection" width="50"></el-table-column>
            <el-table-column prop="id" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="科目名称" width="200" align="center"></el-table-column>
            <el-table-column prop="name" label="科目代码" width="200" align="center"></el-table-column>
            <el-table-column prop="name" label="科目名称" width="auto" align="center"></el-table-column>
            <el-table-column prop="name" label="更新时间" width="auto" align="center"></el-table-column>
            <el-table-column prop="name" label="更新人" width="160" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <!-- <el-button
                  size="mini"
                  type="success"
                  @click="handleSee(scope.$index, scope.row.id)"
                >查看</el-button>-->
                <el-button
                  size="mini"
                  type="success"
                  @click="handleEdit(scope.$index, scope.row.id)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 弹窗 -->
          <el-dialog class="dialogVisible" :visible.sync="dialogVisible" width="50%" true>
            <div>
              <span>点击确定将删除该条数据</span>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisibleAction">确 定</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
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
import desk from "@/common/images/desk.png";
import money from "@/common/images/money.png";
import safa from "@/common/images/safa.png";

export default {
  name: "List",
  data() {
    return {
      view_index: 0,
      visible: false,
      loading: false,
      options: [
        {
          id: 1,
          name: "拆红包"
        }
      ],
      formrules: {},
      state_list: {
        1: "已上架",
        0: "已下架"
      },
      tableData: [], // 用于存放数据
      rows: [],
      selectDate: [],
      searchData: {
        startDate: "",
        endDate: "",
        name: "",
        state: "",
        currentPage: 1,
        pageSize: 10
      },
      dialogVisible: false,
      selectIndex: 0,
      page: {
        total: 0
      }
    };
  },
  watch: {
    selectDate(val, oldVal) {
      if (val) {
        this.searchData.startDate = val[0];
        this.searchData.endDate = val[1];
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    // tableRowClassName({row, rowIndex}) {
    //   console.log({row, rowIndex})
    //   if (row.state === 1) {
    //     return 'warning-row';
    //   } else if (rowIndex === 2) {
    //     return 'success-row';
    //   } else if (rowIndex === 2) {
    //     return 'error-row';
    //   }
    //   return '';
    // },
    init() {
      console.log(this.searchData);
      this.loading = true;
      let newData = [
        {
          id: 1,
          name: "欧式沙发",
          banner: safa,
          price: "拆红包",
          total: "一等奖",
          limit: 5,
          commission: 30,
          creatTime: "2019-03-06 09:45:55",
          place: "1.asdas"
        },
        {
          id: 2,
          name: "英式餐桌",
          banner: desk,
          price: "拆红包",
          total: "二等奖",
          limit: 2,
          commission: 10,
          creatTime: "2019-03-06 09:45:55",
          place: "1.asdas"
        },
        {
          id: 3,
          name: "500元代金券",
          banner: money,
          price: "拆红包",
          total: "三等奖",
          limit: 3,
          commission: 20,
          creatTime: "2019-03-06 09:45:55",
          place: "1.asdas"
        }
      ];
      this.tableData = newData;
      this.page.total = newData.length;
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    hanldeSeach() {
      // 搜索
      this.init();
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/order/subject/add");
    },
    showModal(index) {
      this.view_index = index;
      this.visible = true;
    },
    handleEdit(index, id) {
      this.$router.push("/order/subject/" + id);
    },
    handleEdits(index, id) {
      this.$router.push("/order/subject/Detail/" + id);
    },
    handleDelete(index) {
      this.dialogVisible = true;
      this.selectIndex = index;
    },
    dialogVisibleAction() {
      this.tableData.splice(this.selectIndex, 1);
      this.dialogVisible = false;
      this.$message.success("删除成功！");
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
.preview {
  width: 240px;
  height: auto;
}

.warning-state {
  color: #e3853a;
}

.success-state {
  color: #67c23a;
}

.error-state {
  color: #f56c6c;
  padding: 0 5px;
}
</style>

