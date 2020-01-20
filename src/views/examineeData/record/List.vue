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
              <el-input size="small" v-model="searchData.name" placeholder="请输入考试名称"></el-input>
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
            <el-table-column label="考试名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="专业名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="报考人数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="初试签到人数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
             <el-table-column label="初试未签到人数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
             <el-table-column label="复试签到人数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
             <el-table-column label="复试未签到人数" align="center">
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
      visible: false,
      loading: false,
      options: [
        {
          id: 1,
          name: "抢红包"
        },
        {
          id: 2,
          name: "转轮盘"
        },
        {
          id: 3,
          name: "刮刮乐"
        }
      ],
      formrules: {},
      state_list: {
        2: "已过期",
        1: "已核销",
        0: "未核销"
      },
      tableData: [], // 用于存放数据
      selectDate: [],
      searchData: {
        startDate: "",
        endDate: "",
        name: "",
        state: "",
        typeid: "",
        currentPage: 1,
        pageSize: 10
      },
      page: {
        total: 0
      },
      upload: {
        typeid: ""
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
          code: "欧式家居展会门票",
          typeid: 2,
          name: "麦小姐",
          phone: "13579246810",
          clear: 30,
          creatTime: "2019-03-06 09:45:55",
          state: 0
        },
        {
          id: 2,
          code: "欧式家居展会门票",
          typeid: 2,
          name: "梁嘉艺",
          phone: "13579246810",
          clear: 30,
          creatTime: "2019-03-06 09:45:55",
          state: 1
        }
      ];
      this.tableData = newData;
      this.page.total = newData.length;
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    selectOptions(id) {
      let name = "";
      this.options.map((item, index, array) => {
        if (item.id === id) {
          name = item.name;
        }
      });
      return name;
    },
    hanldeSeach() {
      // 搜索
      this.init();
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/ticket/code/add");
    },
    showModal() {
      this.visible = true;
    },
    download() {
      location.href = "http://gzlouvre.globalviewcco.com/file/门票名单.xls";
      // this.$message.success('下载成功！')
    },
    handleEdit(index, id) {
      this.$message.success("核销成功！");
      this.tableData[index].state = 1;
      // this.$router.push('/ticket/code/' + id)
    },
    submitUpload() {
      if (!this.upload.typeid) {
        this.$message.error("请先选择上传的票种类型");
        return false;
      }
      this.$refs.upload.submit();
    },
    handleSuccess(data) {
      console.log(data);
      this.visible = false;
      this.upload.typeid = "";
      this.$refs.upload.clearFiles();
      // this.form.img = URL.createObjectURL(file.raw)
      // this.form.banner = data.data
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
