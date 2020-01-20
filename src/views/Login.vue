<template>
  <!-- 登陆注册页面 -->
  <div id="register">
    <el-main>
      <div class="main-content">
        <div class="back-home">
          <el-button @click="back" plain>&lt;&lt;返回首页</el-button>
        </div>
        <div class="register">
          <div class="student-register">
            <ul class="register-tabs">
              <li
                class="register-state"
                v-for="(item, index) in tabsParam"
                @click="toggleTabs(index)"
                :key="index"
                :class="{ active: activeIndex == index }"
              >{{ item }}</li>
            </ul>
            <div class="login-content" v-show="activeIndex === 0">
              <el-form
                :model="loginForm"
                :label-position="labelPosition"
                :rules="loginrules"
                ref="loginForm"
                label-width="80px"
                class="demo-ruleForm"
              >
                <el-form-item prop="resource">
                  <!-- <el-form-item label="账号类型" prop="resource"> -->
                  <!-- <el-radio-group v-model="loginForm.resource">
                    <el-radio label="1">考生</el-radio>
                    <el-radio label="2">管理员</el-radio>
                  </el-radio-group>-->
                </el-form-item>
                <el-form-item class="form_w" label="账号" prop="phone">
                  <el-input @input="nochinese" v-model="loginForm.phone"></el-input>
                </el-form-item>
                <el-form-item class="form_w login_pass" label="密码" prop="pass">
                  <el-input :type="pass3" v-model="loginForm.pass">
                    <i slot="suffix" :class="icon3" @click="watchlogin"></i>
                  </el-input>
                  <div @click="forget" class="forget_password">忘记密码</div>
                </el-form-item>
                <div class="verification_login">
                  <el-form-item label="验证码" prop="code">
                    <el-input v-model="loginForm.code"></el-input>
                  </el-form-item>
                  <!-- <div class="code">{{random}}</div> -->
                  <div class="code" @click="refreshCode">
                    <Sidentify :identifyCode="identifyCode"></Sidentify>
                  </div>
                </div>
                <div class="login">
                  <el-button @click="login('loginForm')" class="button_color">登陆</el-button>
                </div>
              </el-form>
            </div>
            <div class="register-content" v-show="activeIndex === 1">
              <el-form
                :model="ruleForm"
                :label-position="labelPosition"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
                class="demo-ruleForm"
              >
                <div class="personal">
                  <el-form-item label="手机号码" prop="registerphone">
                    <el-input @input="number" v-model="ruleForm.registerphone"></el-input>
                  </el-form-item>
                  <el-button v-show="timeshow" @click="getCode" class="button_color">{{btntext}}</el-button>
                  <el-button v-show="!timeshow" class="time">{{count}} s</el-button>
                </div>
                <div class="password w-28">
                  <el-form-item label="密码" prop="registerpass">
                    <el-input :type="pass" v-model="ruleForm.registerpass">
                      <i slot="suffix" :class="icon" @click="watch"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="registersure">
                    <el-input :type="pass2" v-model="ruleForm.registersure">
                      <i slot="suffix" :class="icon2" @click="watchtwo"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="验证码" prop="registercode">
                    <el-input type="number" maxlength="6" v-model="ruleForm.registercode"></el-input>
                  </el-form-item>
                </div>
                <div class="subit">
                  <el-button @click="register('ruleForm')" class="button_color">提交</el-button>
                </div>
              </el-form>
            </div>
            <el-dialog
              :visible.sync="dialogVisible"
              :show-close="false"
              :modal="false"
              :center="true"
              width="30%"
            >
              <h1>注册成功</h1>
              <div class="regist-pupop">账号为：{{this.content}}</div>
            </el-dialog>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import Sidentify from "@/components/SIdentify";
export default {
  components: {
    Sidentify
  },
  data() {
    return {
      content: "",
      dialogVisible: false,
      pass: "password",
      icon: "el-icon-view",
      pass2: "password",
      icon2: "el-icon-view",
      pass3: "password",
      icon3: "el-icon-view",
      list: [],
      identifyCodes: "123456789",
      identifyCode: "",
      random: "",
      timeshow: true,
      count: "",
      btntext: "发送短信验证",
      timer: null,
      tabsParam: ["登陆", "注册"], //（这个也可以用对象key，value来实现）
      activeIndex: 0, //默认第一个tab为激活状态
      phone: "",
      // radio: "1",
      labelPosition: "left",
      loginForm: {
        resource: "1",
        phone: "",
        pass: "",
        code: ""
      },
      ruleForm: {
        registerphone: "",
        registerpass: "",
        registersure: "",
        registercode: ""
      },
      loginrules: {
        phone: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { max: 11, message: "长度在11 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 6, message: "长度在4 到 6 个字符", trigger: "blur" }
        ]
      },
      rules: {
        registerphone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11 个字符", trigger: "blur" }
        ],
        registerpass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        registersure: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        registercode: [
          { required: true, message: "请输入验证号", trigger: "blur" },
          { min: 4, max: 6, message: "长度在 4 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  created() {
    console.log(this.activeIndex);
  },
  methods: {
    // 不能输入中文
    nochinese() {
      this.loginForm.phone = this.loginForm.phone.replace(
        /[\u4E00-\u9FA5]/g,
        ""
      );
    },
    number() {
      this.ruleForm.registerphone = this.ruleForm.registerphone.replace(
        /[^\.\d]/g,
        ""
      );
    },
    // 密码显示隐藏效果
    watch() {
      if (this.pass === "text") {
        this.pass = "password";
        //更换图标
        this.icon = "el-icon-view";
      } else {
        this.pass = "text";
        this.icon = "el-icon-minus";
      }
    },
    watchtwo() {
      if (this.pass2 === "text") {
        this.pass2 = "password";
        //更换图标
        this.icon2 = "el-icon-view";
      } else {
        this.pass2 = "text";
        this.icon2 = "el-icon-minus";
      }
    },
    watchlogin() {
      if (this.pass3 === "text") {
        this.pass3 = "password";
        //更换图标
        this.icon3 = "el-icon-view";
      } else {
        this.pass3 = "text";
        this.icon3 = "el-icon-minus";
      }
    },
    // 登陆随机验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    // 倒计时
    getCode() {
      if (!/^1[3456789]\d{9}$/.test(this.ruleForm.registerphone)) {
        this.$message.error("请先填入正确手机号码");
      } else {
        // this.verification();
        // 注册短信验证码
        const sendMsg = new FormData();
        sendMsg.append("phone", this.ruleForm.registerphone);
        sendMsg.append("type", 0);
        this.$http.post("/smsLog/sendMsg", sendMsg).then(res => {
          // console.log(res.code);
          // console.log(res.data.sessionId);
          if (res.code === 200) {
            sessionStorage.sessionId = res.data.sessionId;
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.timeshow = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.btntext = "重发验证码";
                  this.timeshow = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    //  注册
    register(formName) {
      const url = "/user/register";
      this.$refs[formName].validate(valid => {
        if (valid) {
          const reg = new FormData();
          reg.append("phone", this.ruleForm.registerphone);
          reg.append("password", this.ruleForm.registerpass);
          reg.append("confirmPassword", this.ruleForm.registersure);
          reg.append("verifyCode", this.ruleForm.registercode);
          this.$http
            .post(url, reg)
            .then(res => {
              if (res.code !== 200) {
                this.$message.error(res.message);
                return;
              }
              setTimeout(() => {
                this.dialogVisible = false;
              }, 2000);
              this.dialogVisible = true;
              this.content = this.ruleForm.registerphone;
              console.log(res);
              this.$refs[formName].resetFields();
              this.timeshow = true;
              this.activeIndex === 0;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 忘记密码
    forget() {
      this.$router.push({ path: "/fogetpassword" });
    },
    toggleTabs: function(index) {
      this.activeIndex = index;
    },
    // 返回首页
    back() {
      this.$router.push({ path: "/" });
    },
    // 登录
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.loginForm.code === this.identifyCode) {
            if (this.activeIndex == 1) {
              this.$message.success("学生您好,正在为您跳转");
              setTimeout(() => {
                this.$store.dispatch("open", true);
                this.$message.success("登陆成功");
                this.$router.push({ path: "/" });
              }, 2000);
            } else {
              this.$message.success("管理员您好,正在为您跳转");
              setTimeout(() => {
                this.$message.success("登陆成功");
                this.$router.push({ path: "/admin/homepage" });
              }, 2000);
            }
            // this.loginService();
          } else {
            this.$message.error("验证码错误");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginService() {
      const lg = new FormData();
      lg.append("phone", this.loginForm.phone);
      lg.append("password", this.loginForm.pass);
      lg.append("verifyCode", this.loginForm.code);
      this.$http
        .post("/login", lg)
        .then(res => {
          console.log(res);
          this.handleLoginRes(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleLoginRes(res) {
      console.log(this.loginForm.resource);
      console.log(res);
      if (res.code !== 200) {
        this.$message.error(res.message);
        return;
      }
      sessionStorage.name = res.data.name;
      sessionStorage.sessionId = res.data.sessionId;
      sessionStorage.cxamId = res.data.cxamId;
      sessionStorage.userid = res.data.id;
      if (res.data.roleType !== 0) {
        this.$message.success("学生您好,正在为您跳转");
        setTimeout(() => {
          this.$store.dispatch("open", true);
          this.$message.success("登陆成功");
          this.$router.push({ path: "/" });
        }, 2000);
      } else {
        this.$message.success("管理员您好,正在为您跳转");
        setTimeout(() => {
          this.$message.success("登陆成功");
          this.$router.push({ path: "/admin/homepage" });
        }, 2000);
      }
    }
  }
};
</script>

<style lang="scss">
@mixin centent {
  display: flex;
  align-items: center;
  align-self: center;
}
$color: #50682e;
#register {
  .el-dialog__header {
    padding: 0;
  }
  h1 {
    color: #67c23a;
    text-align: center;
    margin: 1rem 0;
  }
  .regist-pupop {
    font-size: 18px;
    line-height: 40px;
    text-align: center;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: $color;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: $color;
    background: $color;
  }
  .form_w {
    width: 350px;
  }
  .el-form-item {
    margin-bottom: 30px;
  }
  margin-top: 20px;
  .el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
    display: none;
  }
  .el-header,
  .el-footer {
    background-color: $color;
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: #fff;
    color: #333;
    min-height: 400px;
    .main-content {
      width: 800px;
      margin: 0 auto;
      .back-home {
        display: flex;
        .el-button {
          border: 1px solid $color;
          color: $color;
        }
      }
      .register {
        width: 100%;
        @include centent;
        justify-content: center;
        .student-register {
          width: 500px;
          height: 400px;
          margin: 30px 0 50px 0;
          background-color: #fff;
          box-shadow: 2px 2px 5px #888888;
          .register-tabs {
            @include centent;
            justify-content: flex-start;
            .register-state {
              width: 50%;
              height: 50px;
              line-height: 50px;
              text-align: center;
            }
            .active {
              color: $color;
              font-size: 20px;
              font-weight: bold;
            }
          }
        }
        .login-content {
          width: 85%;
          height: auto;
          margin: 0 auto;
          .login_type {
            height: 50px;
            margin-right: 20px;
            @include centent;
            justify-content: flex-start;
            .type_name {
              width: 80px;
              font-size: 14px;
              color: #606266;
              text-align: left;
            }
            .type_radio {
              margin-left: 20px;
            }
          }
          .login_pass {
            position: relative;
            .forget_password {
              cursor: pointer;
              position: absolute;
              right: 0;
              top: 35px;
            }
          }
          .verification_login {
            width: 350px;
            display: flex;
            .code {
              margin-left: 15px;
              width: 100px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background-color: #97b968;
            }
          }
          .login {
            width: 150px;
            margin: 20px auto;
            .el-button {
              width: 150px;
            }
          }
        }
        .register-content {
          width: 85%;
          height: auto;
          margin: 0 auto;
          .personal {
            margin-top: 20px;
            width: 430px;
            display: flex;
            .el-button {
              height: 40px;
              margin-left: 20px;
              width: 120px;
            }
          }
          // .password {
          //   width: 230px;
          // }
          .subit {
            width: 150px;
            margin: 0 auto;
            .el-button {
              width: 150px;
            }
          }
        }
      }
    }
  }
  .el-footer {
    .footer-content {
      padding-top: 15px;
      font-size: 14px;
      width: 700px;
      margin: 0 auto;
      color: white;
      overflow: hidden;

      p {
        text-align: left;
      }
    }
  }
  body > .el-container {
    margin-bottom: 40px;
  }
}
</style>
