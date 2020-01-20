<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="width: 100%;height: auto">
          <el-form :inline="true">
            <el-form-item label-width="50">
              <el-button type="warning" size="small" @click="inputId = true">输入准考证</el-button>
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
              <el-select size="small" v-model="searchData.state" clearable placeholder="请选择签到情况">
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
            <el-table-column label="报考专业" align="center">
              <template slot-scope="scope">
                <p>
                  <span>{{ scope.row.phone }}</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column label="考生科类" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.reason}}</span>
              </template>
            </el-table-column>
            <el-table-column label="考试时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="复试" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="签到情况" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="签到时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="准考证号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="准考证" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.creatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="考生信息" align="center">
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
    <!-- 输入准考证号 -->
    <el-dialog
      id="inputId"
      style="box-sizing:border-box"
      :visible.sync="inputId"
      width="50%"
      center
    >
      <div class="idNumber">
        <label for="idNumber">准考证号: </label>
        <el-input style="width: 400px;margin-left: 20px;" id="idNumber" type="text" v-model="idNumber" placeholder="请输入准考证号"></el-input>
        <el-button type="success">筛选</el-button>
      </div>
      <div class="show">
        准考证展示
        <span>（请认真核对信息）</span>
      </div>
      <div class="pupop">
        <table class="table_centent" border="1" cellpadding="0" cellspacing="0">
          <tr>
            <td style="text-align: center;" colspan="4">
              <h1>广州大学2019艺术准考生证</h1>
            </td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td class="three"></td>
            <td class="four"></td>
          </tr>
          <tr>
            <td class="one">专业</td>
            <td class="two">{{one.mathematics}}</td>
            <td class="three"></td>
            <td class="four img_content" rowspan="3">
              <div class="img">
                <img src="@/assets/img/logo.png" alt />
              </div>
            </td>
          </tr>
          <tr>
            <td class="one">准考证</td>
            <td class="two">{{one.ticket}}</td>
            <td class="three"></td>
          </tr>
          <tr>
            <td class="one">身份证</td>
            <td class="two">{{one.card}}</td>
            <td class="three"></td>
          </tr>
          <tr>
            <td class="one">姓名</td>
            <td class="two">{{one.name}}</td>
            <td class="three"></td>
            <td class="four"></td>
          </tr>
          <tr>
            <td class="one"></td>
            <td class="two"></td>
            <td class="three"></td>
            <td class="four img_content" rowspan="3">
              <div class="img">
                <img src="@/assets/img/logo.png" alt />
              </div>
            </td>
          </tr>
          <tr>
            <td class="one">初试</td>
            <td class="two">{{one.preliminary}}</td>
            <td class="three"></td>
          </tr>
          <tr>
            <td class="one">复试</td>
            <td class="two">{{one.reexamine}}</td>
            <td class="three"></td>
          </tr>
          <tr>
            <td class="one"></td>
            <td class="two"></td>
            <td class="three"></td>
            <td class="four"></td>
          </tr>
          <tr>
            <td colspan="4">
              <ul class="matter">
                <li>注意事项：</li>
                <li>（1）请考生在考前5天打印准考证，最迟在考前1天完成准考证打印，勿在测试当天打印。</li>
                <li>（2）按准考证上规定时间到指定的考试地点候考，切勿走错考场。</li>
                <li>（3）请考生携带二代身份证、准考证按时到考场报到，迟到15分钟取消考试资格。</li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="inputId = false">返回</el-button>
      </span>
    </el-dialog>
    <!-- 输入准考证号 -->
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
        {
          id: 5,
          distributor: "广州（天河区）分销点",
          name: "石峥嵘",
          phone: 12345678910,
          reason: "电话打不通！",
          creatTime: "2019-03-06 09:45:55",
          state: 2
        },
        {
          id: 6,
          distributor: "广州（天河区）分销点",
          name: "石峥嵘",
          phone: 12345678910,
          reason: "",
          creatTime: "2019-03-06 09:45:55",
          state: 0
        },
        {
          id: 7,
          distributor: "广州（天河区）分销点",
          name: "石峥嵘",
          phone: 12345678910,
          reason: "电话打不通！",
          creatTime: "2019-03-06 09:45:55",
          state: 2
        },
        {
          id: 8,
          distributor: "广州（天河区）分销点",
          name: "石峥嵘",
          phone: 12345678910,
          reason: "电话打不通！",
          creatTime: "2019-03-06 09:45:55",
          state: 2
        },
        {
          id: 9,
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
    submitUpload() {
      if (!this.refuse.reason) {
        this.$message.error("请先填写拒绝理由");
        return false;
      }
      this.tableData[this.refuseIndex].state = 2;
      this.tableData[this.refuseIndex].reason = this.refuse.reason;
      this.visible = false;
      this.$message.success("拒绝成功！");
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

.pupop {
  margin-top: 50px;
  min-height: 400px;
  .table_centent {
    border-color: #dedede;
    width: 100%;
    .one {
      width: 30%;
    }
    .one_gd {
      width: 25%;
    }
    .two_gd {
      width: 50%;
    }
    .two {
      width: 40%;
    }
    .three {
      width: 5%;
    }
    .four {
      width: 35%;
    }
    .five {
      width: 25%;
    }
    td {
      height: 50px;
      padding-left: 10px;
    }
    .img_content {
      .img {
        width: 60%;
        margin: 0 auto;
        img {
          width: 100%;
        }
      }
    }
    .height {
      height: 200px;
    }
  }
}
.header {
  .button {
    .btn {
      padding: 5px 15px;
      font-size: 14px;
      background-color: #fff;
      border: 1px solid#797979;
      border-radius: 3px;
      color: #000;
      margin-left: 15px;
    }
    .btn:nth-of-type(1) {
      color: #fff;
      background-color: $blue;
    }
    .btn:hover {
      color: #fff;
      background-color: $green;
      cursor: pointer;
    }
  }
}
.table {
  span {
    margin-right: 6px;
    color: #000;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
// 查看
#checkId,
#inputId {
  h2 {
    font-size: 25px;
  }
  .id_picture {
    padding: 0 20px;
    height: 400px;
    margin-top: 30px;
    overflow-y: auto;
    img {
      width: 100%;
      box-sizing: border-box;
    }
  }
  .el-dialog__footer {
    text-align: center;
    .el-button {
      width: 120px;
    }
  }
}
// 查看

// 输入准考证
#inputId {
  .idNumber {
    margin-bottom: 50px;
    label {
      font-size: 20px;
      margin-right: 20px;
    }
    .el-input {
      width: 350px;
      margin-right: 20px;
    }
    
  }
  .show {
    font-size: 26px;

    span {
      color: red;
    }
  }
}
// 输入准考证
</style>
