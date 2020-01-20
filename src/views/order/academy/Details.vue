<template>
  <!-- 新建专业 -->
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form ref="checkForm" :model="form" :rules="rules" :inline-message="true">
        <el-form-item label="学院代码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="学院名称" prop="caption">
          <el-input v-model="form.caption"></el-input>
        </el-form-item>
        <el-form-item label="学院介绍" prop="content">
          <el-input class="textarea" rows="10" type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-left: 150px">
        <el-button size="small" type="primary" @click="issue('checkForm')">确 定</el-button>
        <el-button size="small" @click="goBack">取 消</el-button>
      </div>

      <!-- 发布弹窗 -->
      <el-dialog class="dialogVisible" :visible.sync="submitIssue" width="50%" true>
        <div style="height:100px">
          <span>点击确定将发布该科目</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
          <el-button @click="submitIssue = false">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 发布弹窗 -->
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        collegeId: "",
        code: "",
        caption: "",
        prcie: "",
        restrict: [],
        prologue: "",
        version: "",
        fatherName: "",
        exam: "",
        fatherIds: "",
        subjecIds: "",
        fatherId: "",
        subjecId: "",
        domains: [
          {
            value: ""
          }
        ],
        domains1: [
          {
            value: ""
          }
        ]
      },
      options: [],
      submitIssue: false,
      rules: {
        collegeId: [
          { required: true, message: "请选择学院", trigger: "change" }
        ],
        code: [{ required: true, message: "请输入专业代码", trigger: "blur" }],
        caption: [
          { required: true, message: "请输入专业名称", trigger: "blur" }
        ],
        prcie: [{ required: true, message: "请输入报名费", trigger: "blur" }],
        restrict: [
          { required: true, message: "请选择科目限制", trigger: "change" }
        ],
        content: [
          { required: true, message: "请输入专业介绍", trigger: "change" }
        ],
        prologue: [
          {
            required: true,
            message: "请输入四位数准考证",
            trigger: "blur",
            max: 4,
            min: 4
          }
        ]
      }
    };
  },
  methods: {
    issue() {
      this.submitIssue = true;
    },
    goBack() {
      this.$router.back();
    },
    onSubmit() {
      this.$router.back();
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

.el-input {
  width: 350px;
}
</style>


