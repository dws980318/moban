<template>
  <!-- 新建考试页面 -->
  <div class="newTest">
    <el-form
      class="infoForm"
      :model="infoForm"
      ref="infoForm"
      :rules="rules"
      :label-position="labelPosition"
      label-width="100px"
    >
      <!-- 选择模板 -->
      <div class="chooseModel">
        <div class="title">
          <h2>选择已配置考试模板</h2>
        </div>
        <el-button
          style="width: 150px;
            color: #fff;
            background-color: #0b7242;
            border: none;
            border-radius: 5px;
            margin-top: 10px;"
          @click="dialogVisibleChoose1 = true"
        >选择模板</el-button>
      </div>
      <!-- 选择模板 -->

      <!-- 考试信息 -->
      <div class="examInfo">
        <div class="examInfo title">
          <h2>考试信息</h2>
        </div>

        <div class="exam-name" style="display:flex;">
          <el-form-item label="考试名称" prop="examName">
            <el-input id="examName" v-model="infoForm.examName"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 60px;" label="报名截止" prop="applyEnd">
            <el-date-picker
              v-model="infoForm.applyEnd"
              id="applyEnd"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="apply_test" style="display:flex;">
          <el-form-item label="报名开始" prop="applyStart">
            <el-date-picker
              v-model="infoForm.applyStart"
              id="applyStart"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <!-- <el-form-item style="margin-left: 60px;" label="报名费" prop="prcie">
            <el-input id="prcie" v-model="infoForm.prcie"></el-input>￥
          </el-form-item>-->
          <el-form-item style="margin-left: 60px;" label="准考证前序" prop="ticket">
            <el-input id="ticket" v-model="infoForm.ticket"></el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 考试信息 -->

      <!-- 报考专业 -->
      <div class="signUp" v-for="(item, index) in familyList" :key="index" :model="familyList">
        <div class="title">
          <h2>报考专业</h2>
          <i
            style="
            position: absolute;
            left: 127px;
            top: 4px;
            font-size: 26px;
            cursor: pointer;
            "
            class="el-icon-plus addicon"
            @click="familyAdd"
          ></i>
        </div>
        <div class="limiting2">
          <ul>
            <li>
              <h4>科类限制</h4>
            </li>
            <li>
              <el-checkbox-group v-model="item.subjectstint">
                <el-checkbox label="文科"></el-checkbox>
                <el-checkbox label="理科"></el-checkbox>
              </el-checkbox-group>
            </li>
          </ul>
        </div>
        <div>
          <div class="addSubject">
            <div class="addSubject1">
              <h4 style="margin-top:0;">报考专业</h4>
            </div>
          </div>
          <div class="addSubject2" style="width:500px;">
            <el-form-item
              style="display: inline-block;margin-left: -100px;margin-bottom:0px;"
              v-for="(domain) in item.domains"
              :key="domain.key"
              :rules="{ required: true, message: '请选择专业', trigger: 'change' }"
            >
              <!-- :prop="`domains.[${Index}].value`" -->
              <el-select v-model="domain.value">
                <el-option
                  v-for="item in options1"
                  :key="item.id"
                  :label="item.caption"
                  :value="item.id"
                ></el-option>
              </el-select>
              <!-- <el-button @click.prevent="removeDomain(index, Index)">删除</el-button> -->
            </el-form-item>
            <!-- <el-button class="add" @click="addDomain(index)">添加</el-button> -->
          </div>
          <div class="addSubject">
            <div class="addSubject1">
              <h4 style="margin-top:0;">入围分数</h4>
            </div>
          </div>
          <div class="addSubject2" style="width:500px;">
            <el-input style="margin-top:0;" placeholder="请输入入围分数" v-model="item.crade"></el-input>
          </div>

          <div class="limiting">
            <h4 style="margin-top:0;">只招生源地</h4>
          </div>
          <div class="limiting2" style="width:500px;">
            <el-form-item
              style="display: inline-block;margin-left: -100px;margin-bottom:0px;"
              v-for="(domain, Index) in item.domains1"
              :key="domain.key"
            >
              <el-select v-model="domain.value">
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.province"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-button @click.prevent="removeDomain1(index, Index)">删除</el-button>
            </el-form-item>
            <el-button class="add" @click="addDomain1(index)">添加</el-button>
          </div>
          <div class="firstExam">
            <div class="firstExam-tit">
              <h4 style="margin-top:0">初试科目</h4>
            </div>
            <el-input placeholder="权重分值" v-model="item.firstTest"></el-input>
          </div>
          <div class="firstExamCount" style="width:700px;">
            <el-form-item
              style="display: inline-block;margin-left: -100px;margin-bottom:0px;"
              v-for="(domain, Index) in item.domains2"
              :key="Index"
            >
              <el-select v-model="domain.value">
                <el-option
                  v-for="item in options4"
                  :key="item.id"
                  :label="item.subject"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-input
                style="margin-top:0;display:inline-block;width: 150px;"
                placeholder="请输入科目总分"
                v-model="domain.initial"
              ></el-input>
              <el-button @click.prevent="removeDomain2(index, Index)">删除</el-button>
            </el-form-item>
            <el-button class="add" @click="addDomain2(index)">添加</el-button>
          </div>

          <div class="secondExam">
            <h4 style="margin-top:0">复试科目</h4>
          </div>
          <div class="secondExamCount" style="width:700px;">
            <el-form-item
              style="display: inline-block;margin-left: -100px;margin-bottom:0px;"
              v-for="(domain, Index) in item.domains3"
              :key="Index"
            >
              <el-select v-model="domain.value">
                <el-option
                  v-for="item in options5"
                  :key="item.id"
                  :label="item.subject"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-input
                style="margin-top:0;display:inline-block;width: 150px;"
                placeholder="请输入科目总分"
                v-model="domain.examination"
              ></el-input>
              <el-button @click.prevent="removeDomain3(index, Index)">删除</el-button>
            </el-form-item>
            <el-button class="add" @click="addDomain3(index)">添加</el-button>
          </div>

          <div class="infoCollect">
            <div class="infoCollect1">
              <h4>
                信息采集模板 当前选中的采集模板编号
                <span style="color:red;font-size: 16px;">{{item.gatheringid}}</span>
              </h4>
            </div>
            <el-button
              style="width: 150px;
              color: #fff;
              background-color: #0b7242;
              border: none;
              border-radius: 5px;
              margin-top: 10px;"
              @click="dialogVisibleChooseAction2(index)"
            >选择模板</el-button>
            <br />
          </div>

          <!-- 模板选择弹窗 -->
          <el-dialog
            class="dialogVisibleChoose"
            :visible.sync="dialogVisibleChoose"
            width="70%"
            true
          >
            <div>
              <h3 style="color: red;">模板不能为空, 最多只能选择一个, 请谨慎选择！！！</h3>
              <!-- <div class="head">
                <h5>信息采集模板选择</h5>
              </div>-->

              <div class="container" style="width: 800px;">
                <div class="table">
                  <el-table
                    @selection-change="handleSelectionChange"
                    :data="tableData"
                    style="width: 800px;"
                    border
                    :header-cell-style="getRowClass"
                    :header-cell-class-name="cellClass"
                  >
                    <el-table-column
                      prop="item.gatheringId"
                      align="center"
                      type="selection"
                      width="50"
                    ></el-table-column>
                    <el-table-column prop="id" label="序号" width="60" align="center"></el-table-column>
                    <el-table-column prop="attest" label="模板名称" width="auto" align="center"></el-table-column>
                    <el-table-column prop="exam" label="配置考试名称" width="auto" align="center"></el-table-column>
                    <el-table-column prop="specialty" label="考试专业" width="110" align="center"></el-table-column>
                    <el-table-column prop="createTime" label="新建时间" width="110" align="center"></el-table-column>
                    <el-table-column prop="userName" label="管理员" width="110" align="center"></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
              <el-button type="primary" @click="dialogVisibleChooseAction">确定</el-button>
            </div>
          </el-dialog>
          <!-- 模板选择弹窗 -->

          <el-button v-if="index !== 0" size="small" type="danger" @click="del(index)">删除</el-button>
        </div>
      </div>
      <!-- 报考专业 -->

      <el-dialog class="dialogVisibleChoose" :visible.sync="dialogVisibleChoose1" width="70%" true>
        <div>
          <h3 style="color: red;">模板不能为空, 最多只能选择一个, 请谨慎选择！！！</h3>
          <div class="head">
            <h5>考试模板选择</h5>
          </div>
          <div class="container">
            <div class="table">
              <el-table
                :data="tableData1"
                style="width: 100%"
                border
                :header-cell-style="getRowClass"
                @selection-change="handleSelectionChange1"
                ref="multipleTable"
                :header-cell-class-name="cellClass"
              >
                <el-table-column align="center" type="selection" width="50"></el-table-column>
                <el-table-column prop="id" label="序号" width="50" align="center"></el-table-column>
                <el-table-column prop="exam" label="考试名称" width="auto" align="center"></el-table-column>
                <el-table-column prop="caption" label="招生专业" width="auto" header-align="center"></el-table-column>
                <el-table-column prop="examTime" label="开放报名时间" width="110" align="center"></el-table-column>
                <el-table-column prop="endTime" label="截止报名时间" width="110" align="center"></el-table-column>
                <el-table-column prop="types" label="信息采集模板" width="110" align="center">
                  <template slot-scope="scope">
                    <span
                      class="messageCollect"
                      v-if="scope.row.types == 1"
                      style="text-decoration: none;"
                    >已配置</span>
                    <span
                      class="messageCollect"
                      @click="enterChoose(scope.$index,scope.row)"
                      v-else
                    >进入配置</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
          <el-button type="primary" @click="dialogVisibleChooseAction1">确定</el-button>
        </div>
      </el-dialog>
      <!-- 模板选择弹窗 -->

      <!-- 水印上传 -->
      <div class="statement">
        <div class="statement title">
          <h2>水印上传</h2>
        </div>
        <div class="upload">
          <p>水印上传</p>
          <el-upload
            style="display: inline-block;"
            class="upload-demo"
            multiple
            :limit="1"
            :headers="token"
            v-model="sysc"
            :file-list="fileList1"
            action
          >
            <el-button>上传</el-button>
            <div slot="tip" class="el-upload__tip">仅支持jpg、grf、png格式，大小不超过1M</div>
          </el-upload>
          <el-upload
            style="display: inline-block;margin-left: 80px;"
            class="upload-demo"
            multiple
            disabled
            action
          >
            <el-button @click="seeAction">查看</el-button>
            <div slot="tip" class="el-upload__tip">仅支持jpg、grf、png格式，大小不超过1M</div>
          </el-upload>
        </div>
      </div>
      <!-- 水印上传 -->

      <!-- 注意事项 -->
      <div class="infoCollects">
        <div class="infoCollects1 title">
          <h2>准考证备注</h2>
        </div>
        <textarea v-model="infoForm.remark" id="notice" rows="5" cols="80"></textarea>
        <br />
      </div>
      <!-- 注意事项 -->

      <!-- 声明 -->
      <div class="statement">
        <div class="statement title">
          <h2>免责声明</h2>
        </div>
        <div class="upload">
          <p>免责声明</p>
          <el-upload
            class="upload-demo"
            multiple
            :limit="1"
            v-model="mzsm"
            :headers="token"
            :file-list="fileList2"
            action
          >
            <el-button>上传</el-button>
            <div slot="tip" class="el-upload__tip">仅支持pdf、word、txt文件，大小不超过10M</div>
          </el-upload>
        </div>
      </div>
      <!-- 声明 -->

      <!-- 招生章程 -->
      <div class="statement">
        <div class="statement title">
          <h2>招生章程</h2>
        </div>
        <div class="upload">
          <p>招生章程</p>
          <el-upload
            class="upload-demo"
            multiple
            v-model="zszc"
            :headers="token"
            :file-list="fileList4"
            action
          >
            <el-button>上传</el-button>
            <div slot="tip" class="el-upload__tip">仅支持pdf、word、txt文件，大小不超过xM</div>
          </el-upload>
        </div>
      </div>
      <!-- 招生章程 -->

      <!-- 其他说明 -->
      <div class="other">
        <div class="title">
          <h2>其他说明附件</h2>
        </div>
        <div class="uploadFile">
          <p>附件</p>
          <el-upload
            class="upload-demo"
            multiple
            v-model="fj1"
            :headers="token"
            :file-list="fileList3"
            action
          >
            <el-button>上传</el-button>
            <div slot="tip" class="el-upload__tip">仅支持pdf、word、txt文件，大小不超过10M</div>
          </el-upload>
        </div>
      </div>
      <!-- 其他说明 -->

      <div class="btn">
        <el-button class="submit" @click="dialogVisible = true">发布</el-button>
        <el-button class="save" @click="back">返回</el-button>
      </div>
    </el-form>

    <!-- 弹窗 -->
    <el-dialog class="dialogVisible" :visible.sync="dialogVisible" width="50%" true>
      <div>
        <span>点击确定将发布该考试</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleAction('infoForm')">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗 -->

    <!-- 查看弹窗 -->
    <el-dialog id="checkId" :visible.sync="checkId" width="45%" true>
      <h2>准考证展示</h2>
      <div class="pupop">
        <table
          class="table_centent"
          :style="{backgroundImage: 'url(' + (syscImg ? syscImg : '') + ')','background-repeat':'no-repeat','background-size':'100% 100%'}"
          width="800"
          border="1"
          cellpadding="0"
          cellspacing="0"
        >
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
            <td class="two">{{two.mathematics}}</td>
            <td class="three"></td>
            <td class="four img_content" rowspan="3">
              <div
                style="height: 100px;width: 100px;text-align: center; font-size: 16px;writing-mode:tb-rl"
              >
                本人正面照
                <!-- <img src="../../../assets/img/logo.png" alt /> -->
              </div>
            </td>
          </tr>
          <tr>
            <td class="one">准考证</td>
            <td class="two">{{two.ticket}}</td>
            <td class="three"></td>
          </tr>
          <tr>
            <td class="one">身份证</td>
            <td class="two">{{two.card}}</td>
            <td class="three"></td>
          </tr>
          <tr>
            <td class="one">姓名</td>
            <td class="two">{{two.name}}</td>
            <td class="three"></td>
            <td class="four"></td>
          </tr>
          <tr>
            <td class="one"></td>
            <td class="two"></td>
            <td class="three"></td>
            <td class="four img_content" rowspan="3">
              <div class="img" style="width: 100%;">
                <!-- <img :src="syscImg" alt /> -->
              </div>
            </td>
          </tr>
          <tr>
            <td class="one">初试</td>
            <td class="two">{{two.preliminary}}</td>
            <td class="three"></td>
          </tr>
          <tr>
            <td class="one">复试</td>
            <td class="two">{{two.reexamine}}</td>
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
                <li>{{infoForm.remark}}</li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkId = false">返回</el-button>
      </span>
    </el-dialog>
    <!-- 查看弹窗 -->
  </div>
</template>


<script>
import imgUrl from "@/assets/img/logo.png";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10000,
      familyList: [
        {
          domains: [{ value: "" }],
          domains1: [],
          domains2: [],
          domains3: [],
          firstTest: "",
          crade: "",
          subjectstint: [],
          gathenringId: []
        }
      ],
      infoForm: {
        examName: "",
        applyStart: "",
        applyEnd: "",
        prcie: "",
        label: "",
        remark: "",
        Avalue: "",
        textarea: ""
      },
      fj1: [],
      mzsm: [],
      sysc: [],
      rules: {
        examName: [
          { required: true, message: "请输入考试名称", trigger: "blur" }
        ],
        applyStart: [
          { required: true, message: "请输入考试开始时间", trigger: "blur" }
        ],
        applyEnd: [
          { required: true, message: "请输入考试截止时间", trigger: "blur" }
        ],
        prcie: [{ required: true, message: "请输入报名费", trigger: "blur" }],
        ticket: [
          {
            required: true,
            max: 4,
            message: "请输入四位数准考证前序",
            trigger: "blur"
          }
        ]
      },
      exam: "",
      checkId: false,
      two: {
        mathematics: "",
        ticket: "",
        card: "",
        name: "",
        preliminary: "",
        reexamine: ""
      },
      value: "",
      set: "",
      count: "",
      secondExamCount: "",
      infoCollect: "",
      infoCollect2: "",
      value3: "",
      choosedSub: "",
      value4: "",
      add1: "",
      add2: "",
      add3: "",

      dialogVisible: false,
      dialogVisibleSave: false,
      dialogVisibleChoose: false,
      dialogVisibleChoose1: false,
      labelPosition: "left",
      tableData: [],
      tableData1: [],
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      options5: [],
      Cvalue: [],
      Dvalue: "",
      Evalue: "",
      list: [],
      multipleSelection: [],
      multipleSelection1: [],
      selection1: "",
      selection: "",
      eights: [],
      fj1: [],
      mzsm: [],
      sysc: [],
      zszc: [],
      eights: [],
      syscImg: imgUrl,
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: []
    };
  },
  computed: {
    token() {
      return {
        JSESSIONID: sessionStorage.sessionId
      };
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    // 上传
    handleSuccessAction(response, file, fileList) {
      this.$message.success("上传成功");
      this.sysc = response.data;
      console.log(this.sysc);
    },
    handleSuccessAction2(response, file, fileList) {
      this.$message.success("上传成功");
      this.mzsm = response.data;
      console.log(this.mzsm);
    },
    handleSuccessAction3(response, file, fileList) {
      this.$message.success("上传成功");
      this.fj1.push(response.data);
      console.log(this.fj1);
    },
    handleSuccessAction4(response, file, fileList) {
      this.$message.success("上传成功");
      this.zszc.push(response.data);
      console.log(this.zszc);
    },
    handleExceedAction(files, fileList) {
      this.$message.error("最多只能上传一个文件");
      // console.log(files);
      // console.log(fileList);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      // console.log(isLt2M)
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      }
      return isLt2M;
    },
    beforeAvatarUpload1(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      // console.log(isLt2M)
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 1MB!");
      }
      return isLt2M;
    },
    // 添加包括专业
    familyAdd() {
      this.familyList.push({
        domains: [
          {
            value: ""
          }
        ],
        domains1: [
          {
            value: ""
          }
        ],
        domains2: [
          {
            value: "",
            initial: ""
          }
        ],
        domains3: [
          {
            value: "",
            examination: ""
          }
        ],
        crade: "",
        firstTest: "",
        subjectstint: [],
        tableData: []
      });
      this.selection = "";
      this.$message.success("添加成功");
    },
    // 删除
    del(index) {
      this.familyList.splice(index, 1);
      this.$message.error("删除成功");
    },
    // 删除专业里面的某一条
    removeDomain(index, Index) {
      this.familyList[index].domains.splice(Index, 1);
    },
    // 新增
    addDomain(index) {
      this.familyList[index].domains.push({
        value: "",
        key: Date.now()
      });
    },
    removeDomain1(index, Index) {
      this.familyList[index].domains1.splice(Index, 1);
    },
    addDomain1(index) {
      this.familyList[index].domains1.push({
        value: "",
        key: Date.now()
      });
    },
    removeDomain2(index, Index) {
      this.familyList[index].domains2.splice(Index, 1);
    },
    addDomain2(index) {
      this.familyList[index].domains2.push({
        value: "",
        key: Date.now()
      });
    },
    removeDomain3(index, Index) {
      this.familyList[index].domains3.splice(Index, 1);
    },
    addDomain3(index) {
      this.familyList[index].domains3.push({
        value: "",
        key: Date.now()
      });
    },
    // 添加样式
    getRowClass({ rowIndex }) {
      if (rowIndex === 0) {
        return "background-color: #0b7242;color: #fff;";
      }
    },
    // 全选
    cellClass(row) {
      if (row.columnIndex === 0) {
        return "DisabledSelection";
      }
    },
    // 列表数据
    getList1() {
      const fd = new FormData();
      fd.append("currentPage", this.currentPage);
      fd.append("pageSize", this.pageSize);
      this.$http.post("/creaExam/selectExamList", fd).then(res => {
        this.total = res.data.total;
        console.log(res);
        let newData = res.data.records;
        this.tableData1 = newData;
      });
    },
    //选择模板
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selection = this.multipleSelection.map(item => {
        return item.id;
      });
      this.selection = this.selection.join(",");
      let one = this.familyList.map(item => {
        return item.gatheringid;
      });
      one = this.selection;
      console.log(this.selection);
    },
    dialogVisibleChooseAction() {
      console.log(this.selection);
      this.familyList[this.Index].gatheringid = this.selection;
      let a = this.selection.split(",");
      if (this.selection == "") {
        this.$message.error("请选择一个模板");
      } else if (a.length > 1) {
        this.$message.error("只能选择一个模板");
      } else {
        this.eights.push(this.selection);
        this.dialogVisibleChoose = false;
        this.$message.success("选择成功");
      }
    },
    dialogVisibleChooseAction2(index) {
      this.dialogVisibleChoose = true;
      console.log(index);
      this.Index = index;
    },
    //选择模板
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
      this.selection1 = this.multipleSelection1.map(item => {
        return item.id;
      });
      this.selection1 = this.selection1.join(",");
      console.log(this.selection);
    },

    dialogVisibleChooseAction1() {
      console.log(this.selection1);
      let a = this.selection1.split(",");
      if (this.selection1 == "") {
        this.$message.error("请选择一个模板");
      } else if (a.length > 1) {
        this.$message.error("只能选择一个模板");
      } else {
        this.dialogVisibleChoose1 = false;
        // this.$message.success("选择成功");
        this.one();
      }
    },

    // 获取表格数据
    getList() {
      this.$http
        .get("/creaAttest/selectAttestList", {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
        })
        .then(res => {
          console.log(res);
          let newData = res.data.records;
          this.tableData = newData;
        });
    },
    // 查看
    one() {
      this.familyList = [];
      const fd = new FormData();
      fd.append("id", this.selection1);
      this.$http.post("/creaExam/selectCreaExamList", fd).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.infoForm.examName = res.data.exam;
          this.infoForm.applyStart = res.data.examTime;
          this.infoForm.applyEnd = res.data.endTime;
          this.infoForm.prcie = res.data.prcie;
          this.infoForm.remark = res.data.remarks;
          if (res.data.createWatermark) {
            this.fileList1[0].push({
              name: "水印",
              url: res.data.createWatermark
            });
          }
          if (res.data.createDisclaimer) {
            this.fileList2[0].push({
              name: "免责声明",
              url: res.data.createDisclaimer
            });
          }
          if (res.data.createDisclaimer) {
            this.fileList4.push({
              name: "招生章程",
              url: res.data.createDisclaimer
            });
          }
          if (res.data.createEnclosure) {
            let one = res.data.createEnclosure.split(",");
            for (let i in one) {
              this.fileList3.push({ name: "附件", url: one[i] });
            }
          }
          console.log(this.fileList3);
          for (let i in res.data.outPojo) {
            console.log(i);
            let provinceid = res.data.outPojo[i].provinceid.map(item => {
              return {
                value: Number(item)
              };
            });
            let fatherid = res.data.outPojo[i].fatherid.map(item => {
              return {
                value: Number(item)
              };
            });
            let subjectid = res.data.outPojo[i].subjectid.map(item => {
              return {
                value: Number(item)
              };
            });
            let specialtyid = res.data.outPojo[i].specialtyid.map(item => {
              return {
                value: Number(item)
              };
            });

            let subjectstint = "";
            if (res.data.outPojo[i].subjectstint !== []) {
              subjectstint = res.data.outPojo[i].subjectstint.map(item => {
                if (item == "1") {
                  item = "文科";
                } else if (item == "2") {
                  item = "理科";
                } else if (item == "1,2" || item == "2,1") {
                  (item = "文科"), "理科";
                }
                return item;
              });
            }
            if (!this.familyList[i]) {
              this.familyList.push({
                domains: [],
                domains1: [],
                domains2: [],
                domains3: [],
                firstTest: "",
                crade: "",
                subjectstint: [],
                gatheringid: ""
              });
            }

            this.familyList[i].domains.push(...specialtyid);
            this.familyList[i].domains1.push(...provinceid);
            this.familyList[i].domains2.push(...subjectid);
            this.familyList[i].domains3.push(...fatherid);
            this.familyList[i].subjectstint.push(...subjectstint);
            this.familyList[i].gatheringid = res.data.outPojo[i].gatheringid;
            this.familyList[i].firstTest = res.data.outPojo[i].firsttest;
            this.familyList[i].crade = res.data.outPojo[i].code;
          }
          console.log(this.familyList);
          this.$message.success(res.states);
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 发布
    dialogVisibleAction(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.Cvalue == "文科") {
            this.Cvalue = 0;
          }
          if (this.Cvalue == "理科") {
            this.Cvalue = 1;
            console.log(this.Cvalue);
          }
          if (this.Cvalue == "文科,理科" || this.Cvalue == "理科,文科") {
            this.Cvalue = "0,1";
            console.log(this.Cvalue);
          }
          this.dialogVisible = false;
          console.log(this.familyList);
          let one = this.familyList.map(item => {
            return {
              domains: item.domains.map(i => {
                return i.value;
              })
            };
          });
          // console.log(one)
          let ones = one.map(item => {
            return item.domains;
          });

          let oness = ones.map(item => {
            return item;
          });
          console.log(oness);

          var zy = "#";
          let zys = 0;
          for (var i in oness) {
            if (zys == oness.length - 1) {
              zy += [...oness[i]] + "#";
            } else {
              zy += [...oness[i]] + "#";
            }
            zys++;
          }

          // console.log(ones)
          // let oness = ones.join(",").split(",");
          // function unique(oness) {
          //   return Array.from(new Set(oness));
          // }
          // console.log(unique(oness));
          console.log(zy);

          let two = this.familyList.map(item => {
            return {
              domains1: item.domains1.map(i => {
                return i.value;
              })
            };
          });
          // console.log(two);
          let twos = two.map(item => {
            return item.domains1;
          });
          // console.log(twos);
          let twoss = twos.map(item => {
            return item;
          });
          console.log(twoss);

          var syd = "#,";
          let syds = 0;
          for (var i in twoss) {
            if (syds == twoss.length - 1) {
              syd += [...twoss[i]] + ",#";
            } else {
              syd += [...twoss[i]] + ",#,";
            }
            syds++;
          }

          let three = this.familyList.map(item => {
            return {
              domains2: item.domains2.map(i => {
                return i.value;
              })
            };
          });
          let threes = three.map(item => {
            return item.domains2;
          });
          let threess = threes.map(item => {
            return item;
          });
          console.log(threess);

          var cskm = "#,";
          let cskms = 0;
          for (var i in threess) {
            if (cskms == threess.length - 1) {
              cskm += [...threess[i]] + ",#";
            } else {
              cskm += [...threess[i]] + ",#,";
            }
            cskms++;
          }
          console.log(cskm);

          let four = this.familyList.map(item => {
            return {
              domains3: item.domains3.map(i => {
                return i.value;
              })
            };
          });
          let fours = four.map(item => {
            return item.domains3;
          });
          let fourss = fours.map(item => {
            return item;
          });
          console.log(fourss);

          var fskm = "#,";
          let fskms = 0;
          for (var i in fourss) {
            if (fskms == fourss.length - 1) {
              fskm += [...fourss[i]] + ",#";
            } else {
              fskm += [...fourss[i]] + ",#,";
            }
            fskms++;
          }
          console.log(fskm);

          let five = this.familyList.map(item => {
            return {
              firstTest: item.firstTest
            };
          });
          let fives = five.map(item => {
            return item.firstTest;
          });
          let csfzb = "#" + fives.join("#") + "#";

          console.log(fives);
          console.log(csfzb);

          let sex = this.familyList.map(item => {
            return {
              crade: item.crade
            };
          });
          let sexs = sex.map(item => {
            return item.crade;
          });
          let rwfs = "#" + sexs.join("#") + "#";
          console.log(sexs);
          console.log(rwfs);

          let seven = this.familyList.map(item => {
            return {
              subjectstint: item.subjectstint.map(i => {
                return i;
              })
            };
          });
          let sevens = seven.map(item => {
            console.log(item);
            return {
              subjectstint: item.subjectstint.map(i => {
                console.log(i);
                if (i == "文科") {
                  i = "1";
                } else if (i == "理科") {
                  i = "2";
                } else if ((i == "理科", "文科" || i == "文科", "理科")) {
                  i = "1, 2";
                }
                return i;
              })
            };
          });
          let sevenss = sevens.map(item => {
            return item.subjectstint;
          });

          var klxzs = "#,";
          let klxz = 0;
          for (var i in sevenss) {
            if (klxz == sevenss.length - 1) {
              klxzs += [...sevenss[i]] + ",#";
            } else {
              klxzs += [...sevenss[i]] + ",#,";
            }
            klxz++;
          }

          let eights = this.familyList.map(item => {
            return item.gatheringid;
          });
          console.log(eights);

          var xxcj = "#";
          let xxcjs = 0;
          for (var i in eights) {
            if (xxcjs == eights.length - 1) {
              xxcj += eights[i] + "#";
            } else {
              xxcj += eights[i] + "#";
            }
            xxcjs++;
          }
          console.log(xxcj);

          let nine = this.familyList.map(item => {
            return {
              domains3: item.domains3.map(i => {
                return i.examination;
              })
            };
          });
          console.log(nine);
          let nines = nine.map(item => {
            return item.domains3;
          });
          let niness = nines.map(item => {
            return item;
          });
          console.log(niness);

          var fszf = "#,";
          let fszfs = 0;
          for (var i in niness) {
            if (fszfs == niness.length - 1) {
              fszf += [...niness[i]] + ",#";
            } else {
              fszf += [...niness[i]] + ",#,";
            }
            fszfs++;
          }
          fszf = fszf.replace(/,#,/g, ",");
          console.log(fszf);

          let ten = this.familyList.map(item => {
            return {
              domains2: item.domains2.map(i => {
                return i.initial;
              })
            };
          });
          console.log(ten);
          let tens = ten.map(item => {
            return item.domains2;
          });
          let tenss = tens.map(item => {
            return item;
          });
          console.log(tenss);

          var cszf = "#,";
          let cszfs = 0;
          for (var i in tenss) {
            if (cszfs == tenss.length - 1) {
              cszf += [...tenss[i]] + ",#";
            } else {
              cszf += [...tenss[i]] + ",#,";
            }
            cszfs++;
          }
          cszf = cszf.replace(/,#,/g, ",");
          console.log(cszf);

          let zf = cszf + fszf;
          zf = zf.replace(/##/g, "#");

          console.log(zf);

          const fd = new FormData();
          fd.append("exam", this.infoForm.examName);
          fd.append("remarks", this.infoForm.remark);
          fd.append("examTime", this.infoForm.applyStart);
          fd.append("endTime", this.infoForm.applyEnd);
          fd.append("prcie", this.infoForm.prcie);
          fd.append("subjectStint", klxzs);
          fd.append("specialtyId", zy);
          fd.append("provinceId", syd);
          fd.append("subjectId", cskm);
          fd.append("fatherId", fskm);
          fd.append("firstTest", csfzb);
          fd.append("gatheringId", xxcj);
          fd.append("crade", rwfs);
          fd.append("totalScore", zf);
          fd.append("create_watermark", this.sysc);
          fd.append("create_disclaimer", this.mzsm);
          fd.append("create_enclosure", this.fj1);
          fd.append("zszc", this.zszc);
          let abc = false;
          for (var i in fives) {
            if (!/^([0-9]|10)$/.test(fives[i])) {
              abc = true;
              this.dialogVisible1 = false;
            }
          }
          if (abc) {
            this.$message.error("权重分值请输入0-10之间的数字");
          } else {
            this.$http.post("/creaExam/addExam", fd).then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$router.go(-1);
                this.$message.success(res.message);
              } else {
                this.$message.error(res.status);
              }
            });
          }
        } else {
          this.dialogVisible = false;
          this.$message.error("请完善考试信息！");
          console.log("error submit!!");
          return false;
        }
      });
    },
    //查看水印
    seeAction() {
      this.checkId = true;
      console.log(this.sysc);
      this.syscImg = this.sysc;
    },
    // 报考专业列表
    getOptions1() {
      this.$http.get("/deteail/selectSpeciatyList").then(res => {
        let newData = res.data.map(item => {
          return {
            id: item.id,
            caption: item.caption
          };
        });
        this.options1 = newData;
      });
    },
    // 生源地列表
    getOptions2() {
      this.$http.get("/deteail/selectProvinceList").then(res => {
        let newData = res.data.map(item => {
          return {
            id: item.id,
            province: item.province
          };
        });
        this.options2 = newData;
      });
    },
    // 科目父类
    getOptions3() {
      this.$http.get("/deteail/selectFatherList").then(res => {
        let newData = res.data.map(item => {
          return {
            id: item.id,
            fatherName: item.fatherName
          };
        });
        this.options3 = newData;
      });
    },
    // 科目子类
    getOptions4() {
      this.$http.get("/deteail/selectSubjecList").then(res => {
        let newData = res.data.map(item => {
          return {
            id: item.id,
            subject: item.subject
          };
        });
        this.options4 = newData;
        this.options5 = newData;
      });
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

// 各种导出，删除，开启，关闭等弹窗的公用样式

// 提交成功弹窗
.success {
  div {
    height: 200px;
    text-align: center;

    h2 {
      font-size: 24px;
      margin: 100px 0 60px;
    }

    button {
      width: 140px;
      height: 40px;
      color: #000;
      background-color: #fff;
      border: 1px solid #000;
      border-radius: 5px;

      &:hover {
        color: #000;
        border: 1px solid #000;
        cursor: pointer;
      }
    }
  }
}

// 提交成功弹窗

// 简章查看弹窗
.dialogVisibleLook {
  .lookInfo {
    height: 500px;

    .head {
      height: 40px;
      font-size: 20px;
      line-height: 40px;
      color: #000;

      span {
        margin-left: 20px;
      }
    }

    .center {
      background-color: #fff;
      padding: 20px;

      .container {
        height: 450px;
        overflow-y: scroll;
        padding: 0 40px;

        // &::-webkit-scrollbar {
        // display: none;
        // }
        .tit {
          height: 40px;
          border-bottom: 1px solid #000;
          text-align: center;
          margin-bottom: 10px;
        }

        .date {
          height: 20px;
          text-align: center;
        }

        .content {
          width: 740px;
          margin: 50px auto;

          img {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 20px;
          }
        }
      }
    }
  }

  .dialog-footer {
    text-align: center;

    .el-button {
      width: 140px;
      height: 40px;
    }
  }
}

// 简章查看弹窗
.infoProForm .textarea {
  width: 600px;
  resize: none;
  vertical-align: top;
  margin-left: 20px;
  margin-top: 10px;
  border-radius: 5px;
}

#checkId, #inputId {
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
.pupop {
  width: 700px;
  margin-top: 50px;
  min-height: 400px;

  .table_centent {
    border-color: #dedede;

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
          height: 100%;
        }
      }
    }

    .height {
      height: 200px;
    }
  }
}

.newTest {
  margin-top: 42px;
  margin-left: 52px;

  .infoForm {
    > div {
      margin-bottom: 30px;
    }

    .el-input {
      // margin-top: 15px;
    }

    // 选择模板
    .chooseModel {
      height: 100px;
    }

    // 新建考试名称
    .newName {
      .el-input {
        width: 500px;
        margin-top: 20px;
      }
    }

    // 考试信息
    .examInfo {
      .apply_test {
        label:nth-of-type(2) {
          margin-left: 100px;
        }
      }

      .comment {
        margin-top: 20px;

        textarea {
          width: 600px;
          height: 100px;
          resize: none;
          vertical-align: top;
          border-radius: 5px;
        }
      }
    }

    // 报考专业
    .signUp {
      .limiting2 {
        // margin-left: 80px;
        li:first-child {
          border-left: 2px solid #0b7242;
          margin-bottom: 5px;
        }
      }

      .addSubject {
        .addSubject1 {
          height: 20px;
          line-height: 20px;
          border-left: 2px solid #0b7242;
          margin-top: 10px;
        }

        .el-input {
          margin-top: 0;
          margin-left: 20px;
          width: 150px;
        }
      }

      .addSubject2 {
        margin-top: 20px;

        span {
          margin-right: 40px;
        }
      }

      .limiting {
        height: 20px;
        line-height: 20px;
        margin-top: 10px;
        border-left: 2px solid #0b7242;
      }

      .limiting2 {
        margin-top: 20px;

        span {
          margin-right: 40px;
        }
      }

      .firstExam {
        display: flex;
        margin-top: 10px;
        height: 40px;
        line-height: 40px;

        .firstExam-tit {
          height: 20px;
          line-height: 20px;
          border-left: 2px solid #0b7242;
          margin-top: 10px;
        }

        .el-input {
          margin-top: 0;
          margin-left: 20px;
          width: 150px;
        }
      }

      .firstExamCount {
        margin-top: 20px;

        span {
          margin-right: 40px;
        }
      }

      .secondExam {
        height: 20px;
        line-height: 20px;
        margin-top: 10px;
        border-left: 2px solid #0b7242;
      }

      .secondExamCount {
        box-sizing: border-box;
        margin-top: 20px;

        .el-input {
          margin-top: 20px;
        }

        span {
          margin-right: 40px;
        }
      }

      .infoCollect {
        position: relative;
        margin-bottom: 10px;
        margin-top: 20px;

        .infoCollect1 {
          border-left: 2px solid #0b7242;
        }

        button {
          width: 150px;
          // height: 24px;
          color: #fff;
          background-color: #0b7242;
          border: none;
          border-radius: 5px;
          margin-top: 10px;
        }

        .el-input {
          margin-top: 10px;
        }

        .infoCollect2 {
          position: absolute;
          top: 30px;
          left: 200px;

          textarea {
            width: 250px;
            height: 70px;
            resize: none;
            vertical-align: top;
            margin-left: 20px;
            border-radius: 5px;
          }
        }
      }
    }

    // 报考专业
    .upload {
      display: flex;
    }

    .uploadFile {
      display: flex;
    }

    // 发布
    .btn {
      width: auto;
      height: 300px;
      text-align: center;
      margin-top: 100px;

      .submit, .save {
        width: 150px;
        height: 40px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
      }

      .submit {
        color: #fff;
        background-color: #009cd1;
        margin-right: 30px;
      }

      .save {
        background-color: #fff;
        border: 1px solid #000;
      }
    }
  }
}

.table {
  // margin-left: 22px;
  // margin-right: 30px;
  // margin-top: 30px;
  el-table {
    display: flex;
  }

  .messageCollect, .issue, .grade, .print {
    color: #0b7242;
  }

  span {
    margin-right: 6px;
    color: #000;
    text-decoration: underline;
    cursor: pointer;
  }
}

// 模板选择弹窗
.dialogVisibleChoose {
  div {
    .head {
      height: 40px;
      font-size: 20px;
      line-height: 40px;
      color: #000;

      h5 {
        margin-left: 20px;
        font-weight: normal;
      }
    }

    a {
      color: #95b58d;
      cursor: pointer;
      text-decoration: underline;
    }

    input {
      width: 13px;
    }
  }
}

.el-dialog div span[data-v-dcabaf64] {
  padding-top: 0;
}

// 全局样式
.title {
  position: relative;
  color: #0b7242;
  border-left: 5px solid #0b7242;

  h2 {
    margin-left: 15px;
  }

  i:hover {
    color: red;
  }
}

span {
  font-size: 12px;
  text-decoration: underline;
  margin-left: 20px;
}

.add {
  color: red;
}

h4 {
  color: #0b7242;
  margin-left: 10px;
  font-weight: normal;
}

p {
  margin-top: 10px;
  width: 100px;
}

.upload-demo {
  margin-top: 10px;

  .el-button {
    width: 120px;
    height: 20px;
    padding: 0;
    border: 1px solid #000;
    background-color: #eee;
  }
}

// 模板选择弹窗
.dialogVisibleChoose {
  div {
    .head {
      height: 40px;
      font-size: 20px;
      line-height: 40px;
      color: #000;
      width: 200px;

      span {
        margin-left: 20px;
      }
    }

    a {
      color: #95b58d;
    }

    .el-button {
      width: 120px;
    }
  }
}

.el-select {
  width: 250px;
}

.el-input {
  width: 250px;
}
</style>
