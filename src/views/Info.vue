<template>
  <div id="personal">
    <div class="personal-content">
      <div class="personal-content-title">基本信息</div>
      <div class="information-table">
        <el-form
          :label-position="labelPosition"
          :rules="rules"
          label-width="80px"
          :model="formLabelAligns"
          ref="formLabelAligns"
        >
          <div class="flex-around">
            <el-form-item class="input-40" label="昵称" prop="nickname">
              <el-input v-model="formLabelAligns.nickname"></el-input>
            </el-form-item>
            <el-form-item class="input-40" label="电话" prop="phone">
              <el-input v-model="formLabelAligns.phone"></el-input>
            </el-form-item>
          </div>
          <div class="flex-around">
            <el-form-item class="input-40" label="姓名" prop="name">
              <el-input v-model="formLabelAligns.name"></el-input>
            </el-form-item>
            <el-form-item class="input-40" label="角色" prop="roleId">
              <el-select style="width: 100%;" disabled v-model="formLabelAligns.roleId">
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
        <!-- 头像 -->
        <div class="heared">
          <div class="heared-title">头像</div>
          <el-upload
            action="/upload/upFileByAll"
            list-type="picture-card"
            :on-success="handlePictureCardPreview"
            :headers="token"
            :file-list="fileList"
            :limit="1"
            :before-upload="beforeAvatarUpload"
            :on-exceed="handleExceedAction"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <div class="fooe-button btn">
          <el-button type="primary" @click="reactAction('formLabelAligns')">保存</el-button>
        </div>
      </div>
      <div class="personal-content-title">修改密码</div>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        :rules="rules"
        ref="formLabelAlign"
      >
        <div class="w-60">
          <el-form-item class="input-40" label="原密码" prop="oldpass">
            <el-input :type="passw3" v-model="formLabelAlign.oldpass">
              <i slot="suffix" :class="iconf3" @click="watchs"></i>
            </el-input>
          </el-form-item>
        </div>
        <div class="w-60">
          <el-form-item class="input-40" label="新密码" prop="newpass">
            <el-input :type="passw1" v-model="formLabelAlign.newpass">
              <i slot="suffix" :class="iconf" @click="watch"></i>
            </el-input>
          </el-form-item>
        </div>
        <div class="w-60">
          <el-form-item class="input-40" label="确认密码" prop="surepass">
            <el-input :type="passw2" v-model="formLabelAlign.surepass">
              <i slot="suffix" :class="iconf2" @click="watchtwo"></i>
            </el-input>
          </el-form-item>
        </div>
        <div class="fooe-button">
          <el-button type="primary" @click="submission('formLabelAlign')">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import imgurl from "@/assets/user.png";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        if (value < 11) {
          callback(new Error("请输入11位手机号"));
        } else {
          if (!/^1[3456789]\d{9}$/.test(value)) {
            callback(new Error("请输入正确的手机号"));
          } else {
            callback();
          }
        }
      }, 300);
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("原密码不能为空"));
      } else if (!/^[\w_-]{6,12}$/.test(value)) {
        callback(new Error("请输入6-12位数字字母的密码组合"));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("新密码不能为空"));
      } else if (!/^[\w_-]{6,12}$/.test(value)) {
        callback(new Error("请输入6-12位数字字母的密码组合"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formLabelAlign.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      fileList: [{ url: imgurl }],
      passw1: "password",
      iconf: "el-icon-view",
      passw2: "password",
      iconf2: "el-icon-view",
      passw3: "password",
      iconf3: "el-icon-view",
      checked: false,
      dialogImageUrl: "",
      dialogVisible: false,
      labelPosition: "left",
      formLabelAligns: {
        nickname: "",
        phone: "",
        name: "",
        roleId: ""
      },
      options2: [],
      formLabelAlign: {
        oldpass: "",
        newpass: "",
        surepass: ""
      },
      rules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [{ required: true, validator: checkAge, trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        // role: [{ required: true, trigger: "blur" }],
        oldpass: [{ validator: validatePass, trigger: "blur" }],
        newpass: [{ validator: validatePass1, trigger: "blur" }],
        surepass: [{ validator: validatePass2, trigger: "blur" }]
      },
      id: "",
      file: "",
      show: 0
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
    //角色列表
    eacoAction1() {
      this.$http.get("/deteail/selectRelationList").then(res => {
        let newData = res.data.map(item => {
          return {
            id: item.id,
            name: item.name
          };
        });
        let a = newData;
        this.options2 = newData;
      });
    },
    // 不能输入中文
    number2() {
      this.loginForm.phone = this.loginForm.phone.replace(
        /[\u4E00-\u9FA5]/g,
        ""
      );
    },
    // 只能输入数字
    number() {
      this.ruleForm.registerphone = this.ruleForm.registerphone.replace(
        /[^\.\d]/g,
        ""
      );
    },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // 密码显示隐藏效果
    watch() {
      if (this.passw1 === "text") {
        this.passw1 = "password";
        //更换图标
        this.iconf = "el-icon-view";
      } else {
        this.passw1 = "text";
        this.iconf = "el-icon-minus";
      }
    },
    watchtwo() {
      if (this.passw2 === "text") {
        this.passw2 = "password";
        //更换图标
        this.iconf2 = "el-icon-view";
      } else {
        this.passw2 = "text";
        this.iconf2 = "el-icon-minus";
      }
    },
    watchs() {
      if (this.passw3 === "text") {
        this.passw3 = "password";
        //更换图标
        this.iconf3 = "el-icon-view";
      } else {
        this.passw3 = "text";
        this.iconf3 = "el-icon-minus";
      }
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
    view() {
      this.$router.push({ path: "personalNotice" });
    },
    //修改密码
    submission() {
      this.$refs.formLabelAlign.validate(valid => {
        if (valid) {
          this.submis();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submis() {
      const newpass = new FormData();
      newpass.append("userId", sessionStorage.userid);
      newpass.append("password", this.formLabelAlign.oldpass);
      newpass.append("newPasswd", this.formLabelAlign.newpass);
      newpass.append("confirmPassword", this.formLabelAlign.surepass);
      this.$http
        .post("/changePwd", newpass)
        .then(res => {
          console.log(res);
          if (res.code === 300 || res.code === 401) {
            this.$message.error(res.message);
          } else if (res.code === 400) {
            this.$message.error("原密码错误，请重新输入");
            return;
          } else if (res.code === 405) {
            this.$message.error("请输入六位数以上的数字字母组合");
          } else {
            this.$message.success("修改成功,正在跳转登录页!");
            this.ruleForm = { brand_right: 0 };
            setTimeout(() => {
              sessionStorage.clear();
              this.$store.dispatch("open", false);
              this.$router.push({ path: "/" });
            }, 2500);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存
    reactAction() {
      this.$refs.formLabelAligns.validate(valid => {
        if (valid) {
          console.log(this.fileList);
          if (this.fileList[0].url) {
            const fd = new FormData();
            fd.append("id", this.id);
            fd.append("tubeName	", this.formLabelAligns.name);
            fd.append("nickName	", this.formLabelAligns.nickname);
            fd.append("telephone", this.formLabelAligns.phone);
            fd.append("avatarImg", this.fileList[0].url);
            this.$http.post("/creaUserRole/updateUserTeacher", fd).then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success(res.message);
                this.show++;
                if (this.show >= 5) {
                  this.show = 0;
                }
                this.$store.dispatch("show", this.show);
              } else {
                this.$message.error(res.message);
              }
            });
          } else {
            this.$message.error("请上传头像");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 100;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 100MB!");
      }
      return isLt2M;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#personal /deep/ .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
#personal /deep/ .el-upload-list__item {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
#personal /deep/ .el-upload-list__item-thumbnail {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
#personal {
  .w-60 {
    height: 80px;
    .input-40 {
      width: 400px;
      margin-right: 20px;
    }
  }
  margin-bottom: 50px;
  .right {
    margin-left: 20px;
  }
  .el-form-item {
    margin: 0;
    display: inline-block;
  }
  .el-form-item__label {
    padding: 0;
  }
  .flex {
    position: absolute;
    height: 60px;
    display: flex;
    align-items: center;
  }
  .el-table td,
  .el-table th {
    padding: 5px 0;
  }
  .personal-content {
    width: 90%;
    margin: 0 auto;
    .personal-content-title {
      font-size: 30px;
      padding-left: 10px;
      margin-bottom: 30px;
      color: #2b621b;
      border-left: 2px solid #2b621b;
    }
    .information-table {
      width: 100%;
      min-height: 300px;

      .flex-around {
        height: 80px;
        width: 1000px;
        .input-40 {
          width: 400px;
          margin-right: 20px;
        }
      }
      .heared {
        display: flex;
        // align-items: center;
        height: 80px;
        // overflow: hidden;
        width: 800px;

        .heared-title {
          font-size: 14px;
          color: #606266;
          padding: 0 50px;
        }
      }
    }
  }
}

.fooe-button {
  padding-left: 100px;
  button {
    width: 120px;
    margin-left: 30px;
  }
}
.btn {
  margin: 50px 0;
}
</style>


