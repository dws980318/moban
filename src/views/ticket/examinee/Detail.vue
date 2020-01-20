<template>
  <!-- 未填写基本信息 -->
  <el-main>
    <div id="registeronline">
      <div class="registration_process">
        <div class="back_home">
          <el-button @click="back">返回</el-button>
        </div>
      </div>
      <div class="main-content">
        <div class="tips">
          <div>提示：</div>
          <div class="news">
            <p>(注：带*符号的项必填)</p>
          </div>
        </div>
        <div class="information">
          <div class="examinee_information">
            <el-form
              :model="ruleForm"
              :rules="rules"
              :label-position="labelPosition"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <div class="information-content">
                <div class="examinee">
                  <div class="student">
                    <span class="student_span">考生信息</span>
                  </div>
                  <div class="w-75">
                    <el-form-item class="w-29" label="证件类型" prop="types">
                      <el-select v-model="ruleForm.types" placeholder="请选择证件">
                        <el-option
                          v-for="item in option"
                          :key="item.value"
                          :value="item.value"
                          :label="item.label"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item class="w-50" label="证件号码" prop="identity">
                      <el-input v-model="ruleForm.identity"></el-input>
                    </el-form-item>
                  </div>
                  <el-form-item class="w-29" label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item class="w-29" label="性别" prop="sexn">
                    <el-select v-model="ruleForm.sexn">
                      <el-option
                        v-for="item in option2"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="w-29" label="民族" prop="nation">
                    <el-select v-model="ruleForm.nation" placeholder="请选择民族">
                      <el-option
                        v-for="item in option8"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="log_date" label="出生日期" prop="ageTime">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="ruleForm.ageTime"
                      value-format="yyyy-MM-dd"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item class="w-50" label="街道详情" prop="street">
                    <el-input v-model="ruleForm.street"></el-input>
                  </el-form-item>
                  <div class="w-75">
                    <el-form-item class="w-29" label="收件人" prop="recipient">
                      <el-input v-model="ruleForm.recipient"></el-input>
                    </el-form-item>
                    <el-form-item class="w-29" label="本人手机" prop="receivingPhone">
                      <el-input v-model="ruleForm.receivingPhone"></el-input>
                    </el-form-item>
                    <el-form-item class="w-29" label="邮政编码" prop="code">
                      <el-input v-model="ruleForm.code"></el-input>
                    </el-form-item>
                    <el-form-item class="w-29" label="电子邮箱" prop="email">
                      <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="student_status">
                  <div class="student">
                    <span class="student_span">学籍信息</span>
                  </div>
                  <el-form-item class="w-29" label="考生类型" prop="userTypes">
                    <el-select v-model="ruleForm.userTypes" placeholder="请选择类型">
                      <el-option
                        v-for="item in option3"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="w-29" label="考生学历" prop="education">
                    <el-select v-model="ruleForm.education" placeholder="请选择学历">
                      <el-option
                        v-for="item in option5"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="w-29" label="考生省份" prop="provinceId">
                    <el-select v-model="ruleForm.provinceId" placeholder="请选择省份">
                      <el-option
                        v-for="item in lists"
                        :key="item.id"
                        :value="item.id"
                        :label="item.provinceId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="w-29" label="政治面貌" prop="political">
                    <el-select v-model="ruleForm.political" placeholder="请选择类型">
                      <el-option
                        v-for="item in option4"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="w-29" label="应往届" prop="period">
                    <el-select v-model="ruleForm.period" placeholder="请选择类型">
                      <el-option
                        v-for="item in option6"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="w-29" label="毕业中学" prop="middle">
                    <el-input v-model="ruleForm.middle"></el-input>
                  </el-form-item>
                  <el-form-item class="w-29" label="考生号" prop="candidate">
                    <el-input v-model="ruleForm.candidate"></el-input>
                  </el-form-item>
                  <el-form-item class="w-29" label="文理科" prop="branch">
                    <el-select v-model="ruleForm.branch" placeholder="请选择类型">
                      <el-option
                        v-for="item in option7"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <!-- 可以新增的家庭信息 -->
              <div class="family_information">
                <div class="student">
                  <span class="student_span">家庭信息</span>
                </div>
                <div class="family_title">*家庭联络员（至少填写一位监护人）</div>
                <div class="family_imformation" v-for="(item, index) in familyList" :key="index">
                  <el-form-item class="w-29" label="姓名" required>
                    <template slot-scope="scope">
                      <el-input
                        @input="parnername(index)"
                        v-model="item.listenerName"
                      >{{scope.index}}</el-input>
                    </template>
                  </el-form-item>
                  <el-form-item class="w-29" label="关系" required>
                    <el-input v-model="item.relation"></el-input>
                  </el-form-item>
                  <el-form-item class="w-29" label="职业" required>
                    <el-input v-model="item.career"></el-input>
                  </el-form-item>
                  <div class="w-75">
                    <el-form-item class="w-29" label="工作单位" required>
                      <el-input v-model="item.unit"></el-input>
                    </el-form-item>
                    <el-form-item class="w-29" label="手机号码" required>
                      <el-input type="number" maxlength="11" v-model="item.listenerPhone"></el-input>
                    </el-form-item>
                    <!-- 直接在这加 -->
                    <el-button
                      v-if="index !== 0"
                      size="small"
                      type="danger"
                      @click="delect(index)"
                    >删除</el-button>
                  </div>
                </div>
                <div class="heared">
                  <div class="heared-title">正面照</div>
                  <el-upload
                    style="height: 200px;position: static;"
                    action="http://192.168.0.100/upload/upFileByAll"
                    list-type="picture-card"
                    :on-success="handlePictureCardPreview"
                    :headers="token"
                    :file-list="fileList"
                    :limit="1"
                    :before-upload="beforeAvatarUpload"
                    :on-exceed="handleExceedAction"
                  >
                    <i class="el-icon-plus"></i>
                    <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                  </el-upload>
                </div>
                <div class="footer_button">
                  <!-- <el-button class="srue" type="primary" @click="submitForm('ruleForm')">确定</el-button> -->
                  <el-button @click="back">返回</el-button>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      fileList: [{ url: "" }],
      option: [{ label: "身份证", value: 0 }, { label: "证书", value: 1 }],
      // option1: [{ label: "身份证", value: 0 }, { label: "证书", value: 1 }],
      option2: [{ label: "女", value: 0 }, { label: "男", value: 1 }],
      option3: [
        { label: "初中生", value: 0 },
        { label: "高中生", value: 1 },
        { label: "大学生", value: 2 }
      ],
      option4: [
        { label: "群众", value: 0 },
        { label: "团员", value: 1 },
        { label: "党员", value: 2 }
      ],
      option5: [
        { label: "初中及以下", value: 0 },
        { label: "中专/中技", value: 1 },
        { label: "高中", value: 2 },
        { label: "大专", value: 3 },
        { label: "本科", value: 4 }
      ],
      option6: [{ label: "应届生", value: 0 }, { label: "往届生", value: 1 }],
      option7: [{ label: "文科", value: 0 }, { label: "理科", value: 1 }],
      option8: [
        { label: "汉族", value: "0" },
        { label: "少数民族", value: "1" }
      ],
      lists: [],
      lookList: [],
      revise: false,
      labelPosition: "left",
      ruleForm: {
        types: "",
        identity: "",
        name: "",
        sexn: "",
        nation: "",
        ageTime: "",
        street: "",
        recipient: "",
        receivingPhone: "",
        code: "",
        email: "",
        userTypes: "",
        education: "",
        provinceId: "",
        political: "",
        period: "",
        middle: "",
        candidate: "",
        branch: "",
        major: ""
      },
      // 动态增加
      familyList: [
        {
          listenerName: "",
          relation: "",
          career: "",
          unit: "",
          listenerPhone: ""
        }
      ],
      rules: {
        // 考生信息
        types: [{ required: true, message: "请选择类型", trigger: "change" }],
        identity: [
          { required: true, message: "请输入证件号", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 2, max: 8, message: "长度在2~8个字符", trigger: "blur" }
        ],
        sexn: [{ required: true, message: "请选择性别", trigger: "change" }],
        nation: [{ required: true, message: "请选择民族", trigger: "blur" }],
        ageTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        street: [{ required: true, message: "请输入地址", trigger: "blur" }],
        recipient: [
          { required: true, message: "请输入收件人", trigger: "blur" }
        ],
        receivingPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        ageTime: [{ required: true, message: "请选择日期", trigger: "blur" }],
        code: [{ required: true, message: "请输入邮政编码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮件", trigger: "blur" }],
        // 学籍信息
        userTypes: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        education: [
          { required: true, message: "请选择学历", trigger: "change" }
        ],
        provinceId: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        political: [
          { required: true, message: "请选择政治面貌", trigger: "change" }
        ],
        period: [
          { required: true, message: "请选择应往届", trigger: "change" }
        ],
        middle: [
          { required: true, message: "请填写毕业中学", trigger: "blur" }
        ],
        candidate: [
          { required: true, message: "请输入考生号", trigger: "blur" }
        ],
        branch: [{ required: true, message: "请选择科目", trigger: "change" }]
      }
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
    //更换头像
    handlePictureCardPreview(response, file) {
      this.fileList[0].url = response.data;
      this.dialogVisible = true;
      console.log(this.fileList[0].url);
    },
    handleExceedAction(files, fileList) {
      this.$message.error("最多只能上传一张图片");
      // console.log(files);
      // console.log(fileList);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 100;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 100MB!");
      }
      return isLt2M;
    }
  }
};
</script>


<style lang="stylus" scoped>
.w-29 {
  width: 290px;
}
.w-50{
    width: 500px;
}
#registeronline {
  .addicon {
    font-size: 24px;
    color: #333;
    cursor: pointer;
  }

  .el-form-item__label {
    padding: 0;
    position: relative;
  }

  .w-50 .el-form-item__label::before {
    position: absolute;
    right: -415px;
  }

  .log_date {
    width: 290px;
  }

  .log_date .el-form-item__label::before {
    position: absolute;
    right: -205px;
  }

  .w-29 .el-form-item__label::before {
    position: absolute;
    right: -205px;
  }

  .log_two {
    width: 340px;
  }

  .log_two .el-form-item__label::before {
    position: absolute;
    right: -255px;
  }

  .el-form-item__label::before {
    position: absolute;
    right: -155px;
  }

  .el-form-item {
    display: inline-block;
    margin-right: 40px;
  }

  .student {
    border-bottom: 2px solid #dedede;
    margin-bottom: 30px;
  }

  margin: 0 auto;

  .registration_process {
    margin: 0 auto;

    .back_home {
      text-align: left;
    }
  }

  .main-content {
    margin: 0 auto;

    .tips {
      margin: 20px 0;
      height: 80px;
      background-color: #dedede;
      color: red;

      .news {
        height: 30px;
        margin: 10px 0 0 5px;
      }
    }

    .information {
      .examinee_information {
        .student_status {
          margin-top: 30px;
        }

        .family_information {
          margin-top: 30px;

          .family_title {
            font-size: 18px;
            padding-left: 30px;
            line-height: 50px;
            font-weight: bold;

            i:hover {
              color: orangered;
            }
          }

          .family_imformation {
            margin-bottom: 20px;
            border-bottom: 1px solid #dedede;
          }
        }

        .footer_button {
          margin-top: 20px;
          display: flex;
          justify-content: center;

          .el-button {
            width: 150px;
          }

          .srue {
            background-color: #50682e;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
