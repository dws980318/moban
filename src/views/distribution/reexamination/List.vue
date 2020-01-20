<template>
  <div style="min-width:1280px;padding: 0px 20px;height:800px">
    <!-- 入围成绩 -->
    <div class="first_choose">
      <h2>初筛</h2>
      <div class="select">
        <span>考试</span>
        <el-select v-model="searchData.state">
          <el-option v-for="item in options" :key="item.id" :label="item.exam" :value="item.id"></el-option>
        </el-select>
        <span>专业</span>
        <el-select v-model="searchData.state">
          <el-option v-for="item in options" :key="item.id" :label="item.caption" :value="item.id"></el-option>
        </el-select>
        <span>入围人数</span>
        <el-input v-model="searchData.people"></el-input>
        <span>生源地</span>
        <el-select v-model="searchData.state">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.province"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button type="primary">筛选</el-button>
        <el-button @click="removeAction" class="clear" v-if="show">清除</el-button>
      </div>
      <div class="count">
        <span>入围分数：总分 分</span>
        <span>入围人数： 人</span>
      </div>
    </div>
    <!-- 入围成绩 -->

    <!-- 初筛结果 -->
    <div class="result" v-if="show">
      <div class="content">
        <div class="title">
          <h2>初筛结果</h2>
        </div>
        <div class="button">
          <button class="btn" @click="toggleSelection([tableData[rows]])">全选</button>
          <button class="btn">导出</button>
        </div>
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
            <el-table-column label="序号" prop="id" width="50" align="center"></el-table-column>
            <el-table-column prop="exam" label="考试名称" width="auto" align="center"></el-table-column>
            <el-table-column prop="specialty" label="专业" width="120" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
            <el-table-column prop="province" label="生源地" width="120" align="center"></el-table-column>
            <el-table-column prop="ranking" label="排名" width="120" align="center"></el-table-column>
            <el-table-column prop="complex" label="综合成绩" width="120" align="center"></el-table-column>
            <el-table-column prop="guide" label="科目成绩" width="120" align="center">
              <template slot-scope="scope">
                <span @click="checkPersonAction(scope.$index)">查看</span>
              </template>
            </el-table-column>
            <el-table-column prop="types" label="入围状态" width="120" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.types == 1">
                  <span>入围</span>
                </div>
                <div v-else-if="scope.row.types == 2">
                  <span>未入围</span>
                </div>
                <div v-else>
                  <span>等待评分</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <span @click="cancelChooseAction1(scope.$index)">撤销入围</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 初筛结果 -->

    <!-- 确认 -->
    <div class="confirm" v-if="show">
      <span>监考员确认</span>
      <span>入围分数线</span>
      <el-input v-model="complex" type="text"></el-input>
      <span>或 入围排名</span>
      <el-input v-model="ranking" type="text"></el-input>
      <el-button @click="confirm = true">设定入围</el-button>
    </div>
    <!-- 确认 -->

    <!-- 导出弹窗 -->
    <el-dialog class="dialogVisible" :visible.sync="dialogVisible" width="50%" true>
      <div style="height:100px">
        <span>点击确定将导出数据</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <form
          style="display: inline-block"
          action="http://192.168.0.252/creaCrade/exporUserShortlisted"
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

    <!-- 撤销入围 -->
    <el-dialog class="dialogVisible" :visible.sync="cancelChoose" width="50%" true>
      <div style="height:100px">
        <span>点击确定将撤销该入围结果</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelChoose = false">确 定</el-button>
        <el-button @click="cancelChoose = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 撤销入围 -->

    <!-- 确认入围 -->
    <el-dialog class="dialogVisible" :visible.sync="confirm" width="50%" true>
      <div style="height:100px">
        <span>点击确定将设定该入围结果</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm = false">确 定</el-button>
        <el-button @click="confirm = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 确认入围 -->

    <!-- 查看弹窗 -->
    <el-dialog id="checkModel" :visible.sync="checkPerson" width="95%" true>
      <div class="model">
        <div class="model_title">
          <h4>考试科目成绩</h4>
        </div>
        <div class="table">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
            <el-table-column prop="sexn" label="性别" width="60" align="center"></el-table-column>
            <el-table-column prop="identity" label="身份证号" width="180" align="center"></el-table-column>
            <el-table-column prop="province" label="生源地" width="70" align="center"></el-table-column>
            <el-table-column prop="exam" label="报考考试名称" width="auto" align="center"></el-table-column>
            <el-table-column prop="specialty" label="报考专业" width="auto" align="center"></el-table-column>
            <el-table-column prop="subjecCrade[0]" label="考生科目A成绩" width="110" align="center"></el-table-column>
            <el-table-column prop="subjecCrade[1]" label="考生科目A成绩" width="110" align="center"></el-table-column>
            <el-table-column prop="subjecCrade[2]" label="考生科目A成绩" width="110" align="center"></el-table-column>
            <el-table-column prop="subjecCrade[3]" label="考生科目B成绩" width="110" align="center"></el-table-column>
            <el-table-column prop="subjecCrade[4]" label="考生科目C成绩" width="110" align="center"></el-table-column>
            <el-table-column prop="subjecCrade[5]" label="考生科目D成绩" width="110" align="center"></el-table-column>
            <el-table-column prop="complex" label="综合考试成绩" width="120" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkPerson = false">返回</el-button>
      </div>
    </el-dialog>
    <!-- 查看弹窗 -->
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      loading: false,
      formrules: {},
      rows: [],
      state_list: {
        1: "已启用",
        0: "已禁用"
      },
      dialogVisible: false,
      tableData: [], // 用于存放数据
      selectDate: [],
      searchData: {
        startDate: "",
        endDate: "",
        name: "",
        state: "",
        currentPage: 1,
        pageSize: 10,
        people: ''
      },
      page: {
        total: 0
      },
      options: [],
      show: false,
      cancelChoose: false,
      confirm: false,
      checkPerson: false,
      selection: ''
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
    init() {
      console.log(this.searchData);
      this.loading = true;
      let newData = [
        {
          id: 1,
          distributor: "100元现金券",
          total: 998,
          clear: 30,
          content: "这是礼券的说明。",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
        {
          id: 2,
          distributor: "50元现金券",
          total: 998,
          clear: 30,
          content: "这是礼券的说明。",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
        {
          id: 3,
          distributor: "200元现金券",
          total: 998,
          clear: 30,
          content: "这是礼券的说明。",
          creatTime: "2019-03-06 09:45:55",
          state: 0
        }
      ];
      this.tableData = newData;
      this.page.total = newData.length;
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
     // 清除
    removeAction() {
      this.show = !this.show;
    },
    // 设定入围
    confirmAction() {
      this.confirm = false;
      this.eachAction();
    },
    checkPersonAction() {
      this.checkPerson = true;
    },
    hanldeSeach() {
      // 搜索
      this.init();
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));

        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          // sums[index] += ' 元'
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },
    handleAdd() {
      this.$router.push("/distribution/distributor/add");
    },
    handleEdit(index, id) {
      this.$router.push("/distribution/distributor/" + id);
    },
    handleDelete(index, id) {
      this.tableData.splice(index, 1);
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

// 初筛
.first_choose {
  // margin-left: 20px;
  padding: 20px 20px 10px 20px;
  background-color: #ddd;
  .select {
    padding: 20px 10px 20px 0px;
    span {
      width: 40px;
      font-size: 16px;
      margin-right: 10px;
    }
    span:nth-of-type(3) {
      width: 82px;
    }
    span:nth-of-type(4) {
      width: 50px;
      margin-left: 30px;
    }
    .el-select {
      width: 170px;
      height: 30px;
      margin-right: 25px;
    }
    .el-input {
      width: 180px;
      height: 25px;
    }
    .el-input:nth-of-type(2) {
      text-align: center;
    }
    .el-button {
      padding: 8px 20px;
      color: #fff;
      background-color: $blue;
      border: none;
      border-radius: 5px;
      outline: none;
      cursor: pointer;
      margin-left: 15px;
    }
    .clear {
      color: #fff;
      background-color: red;
    }
  }
  .count {
    span {
      margin-left: 0px;
      margin-right: 40px;
    }
  }
}
// 初筛

//初筛结果
.result {
  padding: 20px;
  background-color: #ddd;
  .content {
    border-top: 1px solid #555;
    .title {
      color: $green;
      border-left: 5px solid $green;
      margin-top: 40px;
      h2 {
        font-size: 30px;
        margin-left: 20px;
      }
    }
  }
  .button {
    .btn {
      width: 70px;
      height: 28px;
      padding: 0;
      font-size: 14px;
      background-color: #fff;
      border: 1px solid#797979;
      border-radius: 3px;
      color: #000;
      margin-top: 30px;
      margin-right: 30px;
    }
    .btn:hover {
      color: #fff;
      background-color: $green;
      cursor: pointer;
    }
  }
  .table {
    margin-top: 30px;
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
//初筛结果

// 确认
.confirm {
  height: 60px;
  margin-top: 20px;
  background-color: #ddd;
  line-height: 60px;
  span:nth-of-type(1) {
    font-size: 24px;
    font-weight: bold;
    margin: 0 20px;
    vertical-align: middle;
  }
  .el-input {
    width: 200px;
    margin: 0 15px;
  }
  .el-button {
    padding: 8px 20px;
    color: #fff;
    background-color: $blue;
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    margin-left: 15px;
  }
}
// 确认

// 查看导入模板预览弹窗
#checkModel {
  .model {
    padding: 0 20px;
    .model_title {
      width: 200px;
      font-size: 30px;
      text-align: center;
      margin-left: 50%;
      transform: translateX(-100px);
      h4 {
        font-weight: normal;
      }
    }
    .table {
      margin-top: 50px;
    }
  }
  .el-button {
    margin-top: 150px;
  }
}
// 查看导入模板预览弹窗
</style>
