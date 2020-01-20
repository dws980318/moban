<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item label-width="50">
              <el-button type="success" size="small">导入</el-button>
              <el-button type="primary" size="small">导出成绩模板</el-button>
              <el-button size="small" class="btn" @click="toggleSelection([tableData[rows]])">全选</el-button>
              <el-button size="small" class="btn">导出</el-button>
            </el-form-item>
            <el-form-item label>
              <el-input size="small" v-model="searchData.name" placeholder="考生姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="searchData.state" clearable placeholder="请选择考试名称">
                <el-option
                  v-for="(item, key, index) in state_list"
                  :key="index"
                  :label="item"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="searchData.state" clearable placeholder="请选择生源地">
                <el-option
                  v-for="(item, key, index) in state_list"
                  :key="index"
                  :label="item"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="searchData.state" clearable placeholder="请选择是否考试合格">
                <el-option
                  v-for="(item, key, index) in state_list"
                  :key="index"
                  :label="item"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="50">
              <el-button type="primary" size="small" icon="el-icon-search" @click="hanldeSeach()">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            border
            :header-cell-style="{background:'#fafafa'}"
            v-loading="loading"
            style="width: 100%"
              ref="multipleTable"
            :header-cell-class-name="cellClass"
          >
            <el-table-column align="center" type="selection" width="50"></el-table-column>
            <el-table-column label="id" align="center" width="60">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.distributor }}</span>
              </template>
            </el-table-column>
            <el-table-column label="生源地" align="center" prop="total">
              <template slot-scope="scope">
                <p>
                  <span class="error-state">{{ scope.row.total }}</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column label="报考考试名称" align="center" prop="clear">
              <template slot-scope="scope">
                <p>
                  <span class="error-state">{{ scope.row.clear }}</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column label="报考专业" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.content }}</span>
              </template>
            </el-table-column>
            <el-table-column label="考生科目成绩" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="综合考试成绩" width="100" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.state }}</span>
              </template>
            </el-table-column>
             <el-table-column label="专业考试排名" width="100" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.state }}</span>
              </template>
            </el-table-column>
             <el-table-column label="生源地排名" width="100" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.state }}</span>
              </template>
            </el-table-column>
             <el-table-column label="入围分数线" width="100" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.state }}</span>
              </template>
            </el-table-column>
              <el-table-column label="考生合格否" width="100" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.state }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作" fixed="right" width="160px" align="center">
              <template slot-scope="scope">
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
            </el-table-column> -->
          </el-table>
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
      tableData: [], // 用于存放数据
      selectDate: [],
      searchData: {
        startDate: "",
        endDate: "",
        name: "",
        state: "",
        currentPage: 1,
        pageSize: 10
      },
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

<style scoped>
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
