<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item label-width="50">
              <el-button size="small" class="btn" @click="toggleSelection([tableData[rows]])">全选</el-button>
              <el-button size="small" class="btn">导出</el-button>
            </el-form-item>
            <el-form-item label>
              <el-input size="small" v-model="searchData.name" placeholder="请输入考生姓名"></el-input>
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
              <el-select size="small" v-model="searchData.state" clearable placeholder="请选择报考专业">
                <el-option
                  v-for="(item, key, index) in state_list"
                  :key="index"
                  :label="item"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>、
            <el-form-item>
              <el-select size="small" v-model="searchData.state" clearable placeholder="请选择审核状态">
                <el-option
                  v-for="(item, key, index) in state_list"
                  :key="index"
                  :label="item"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="searchData.state" clearable placeholder="请选择缴费状态">
                <el-option
                  v-for="(item, key, index) in state_list"
                  :key="index"
                  :label="item"
                  :value="key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="searchData.state" clearable placeholder="请选择报名状态">
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
            <el-table-column label="考生姓名" align="center">
              <template slot-scope="scope">
                <p>
                  <span>{{ scope.row.name }}</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column label="生源地" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.distributor }}</span>
              </template>
            </el-table-column>
            <el-table-column label="报考考试名称" align="center">
              <template slot-scope="scope">
                <p>
                  <span>{{ scope.row.phone }}</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column label="报考专业" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.reason}}</span>
              </template>
            </el-table-column>
            <el-table-column label="信息提交时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="截止审核时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="报名状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="缴费状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
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
      visible: false,
      refuseIndex: 0,
      idNumber: "",
      rows: [],
      formrules: {},
      state_list: {
        2: "已拒绝",
        1: "已通过",
        0: "申请中"
      },
      one: {},
      inputId: false,
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
      },
      refuse: {
        id: 0,
        reason: ""
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
          distributor: "广州（天河区）分销点",
          name: "石峥嵘",
          phone: 12345678910,
          reason: "电话打不通！",
          creatTime: "2019-03-06 09:45:55",
          state: 2
        },
        {
          id: 2,
          distributor: "广州（天河区）分销点",
          name: "石峥嵘",
          phone: 12345678910,
          reason: "",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
        {
          id: 3,
          distributor: "广州（天河区）分销点",
          name: "石峥嵘",
          phone: 12345678910,
          reason: "",
          creatTime: "2019-03-06 09:45:55",
          state: 0
        },
        {
          id: 4,
          distributor: "广州（天河区）分销点",
          name: "石峥嵘",
          phone: 12345678910,
          reason: "",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
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
    handleEdit(index, id) {
      this.tableData[index].state = 1;
      this.$message.success("通过成功！");
    },
    handleDelete(index, id) {
      this.refuseIndex = index;
      this.refuse.id = id;
      this.visible = true;
      // this.tableData[index].state = 1
      // this.$message.success('删除成功！')
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
.el-select {
  width: 170px;
}
</style>
