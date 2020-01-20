<template>
  <div style="min-width:1280px;">
    <!-- 查看信息 -->
    <el-page-header @back="back" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="title">
      <h2>新建报名公告</h2>
    </div>
    <div id="Addmessage">
      <el-form class="message-form" label-width="100px">
        <el-form-item label="主题" for="messageTitle">
          <el-select v-model="gateway_type" style="width:300px;">
            <el-option
              v-for="item in opations"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" for="messageTime">
          <el-input style="width:300px;" id="messageTime" type="text" v-model="caption"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" for="messageName">
          <el-date-picker
            v-model="createTime"
            style="width:300px;"
            id="messageTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
          <span>
            <!-- <input type="checkbox" /> -->
          </span>
        </el-form-item>

        <el-form-item label>
          <template>
            <div class="tinymce">
              <editor style="width: 880px;" id="tinymce" v-model="content" :init="init"></editor>
            </div>
          </template>
        </el-form-item>

        <el-form-item label="附件" class="upload-demo">
          <el-upload
            action="/upload/upFileByAll"
            :on-success="handleSuccessAction"
            :on-exceed="handleExceedAction"
            :before-upload="beforeAvatarUpload"
            :headers="token"
            v-model="annex"
            :limit="1"
          >
            <el-button>上传</el-button>
            <span slot="tip" class="el-upload__tip">仅支持pdf、word、txt文件，大小不超过10M</span>
          </el-upload>
        </el-form-item>

        <div style="display: flex;">
          <el-button style="width: 100px;height:40px;" type="success" @click="backToDoorMessage">提交</el-button>
          <el-button style="width: 100px;height:40px;" @click="back">返回</el-button>
        </div>
      </el-form>
    </div>
    <!-- 查看信息 -->
  </div>
</template>

<script>
// import { quillEditor } from "vue-quill-editor"; //调用编辑器
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
export default {
  name: "tinymce",
  components: {
    // quillEditor,
    Editor
  },
  data() {
    return {
      editorOption: {},
      caption: "",
      options: [],
      value: "",
      createTime: "",
      content: "",
      gateway_type: "",
      annex: "",
      opations: [
        { label: "招生章程", value: 1 },
        { label: "报名公告", value: 2 },
        { label: "网上报名操作实例", value: 3 }
      ],
      content: "请输入内容",
      init: {
        language_url: "./static/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "./static/tinymce/skins/ui/oxide",
        images_upload_url: "http://192.168.0.7:9090/upload/upFileByAll",
        height: 400,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false,
        images_upload_handler: function(blobInfo, success, failure) {
          // console.log(blobInfo.filename());
          var form = new FormData();
          form.append("files", blobInfo.blob(), blobInfo.filename());
          $http.post("/upload/upFileByAll", form).then(res => {
            success(res.location);
          });
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    token() {
      return {
        JSESSIONID: sessionStorage.sessionId
      };
    }
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    back() {
      this.$router.back();
    },
    // 上传
    handleSuccessAction(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.annex = response.data;
    },
    handleExceedAction(files, fileList) {
      this.$message.error("最多只能上传一个文件");
      // console.log(files);
      // console.log(fileList);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      }
      return isLt2M;
    },
    // 提交
    backToDoorMessage() {
      const fd = new FormData();
      fd.append("caption", this.caption);
      fd.append("gateway_type", this.gateway_type);
      fd.append("content", this.content.replace(/<[^>]+>/g, ""));
      fd.append("createTime", this.createTime);
      fd.append("annex", this.annex);
      console.log(this.caption);
      console.log(this.content.replace(/<[^>]+>/g, ""));
      this.$http.post("/creaRecruitment/addRecruitment", fd).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$router.push("/admin/doorMessage");
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
      });
    },

    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur($event) {
      console.log($event);
    }, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {} // 内容改变事件
  }
};
</script>

<style scoped lang="scss">
$blue: #009cd1;
$green: #0b7242;
// 新建通知
.title {
  color: $green;
  border-left: 5px solid $green;
  margin-left: 22px;
  margin-top: 42px;
  h2 {
    margin-left: 10px;
  }
}
#Addmessage {
  margin-top: 50px;
  margin-left: 22px;

  input {
    margin-left: 20px;
  }
}
.message-form {
  .message-name {
    margin-bottom: 40px;
  }
  span {
    font-size: 12px;
    vertical-align: middle;
  }
  #submit {
    margin-bottom: 20px;
    width: 200px;
    height: 80px;
    color: #fff;
    background-color: $blue;
    border-radius: 5px;
    border: none;
    &:hover {
      background-color: $green;
      cursor: pointer;
    }
  }
  #back {
    margin-bottom: 20px;
    width: 200px;
    height: 80px;
    color: #000;
    background-color: #fff;
    border-radius: 5px;
    border: none;
    border: 1px solid #000;
    &:hover {
      background-color: $green;
      cursor: pointer;
    }
  }
  .upload,
  .uploadPic {
    display: flex;
    label {
      width: 80px;
    }
  }
  .upload-demo {
    margin-left: 20px;
    margin-top: 40px;
    .el-button {
      width: 120px;
      height: 20px;
      padding: 0;
      border: 1px solid #000;
      background-color: #eee;
    }
  }
  .x {
    position: relative;
    width: 99%;
    height: 200px;
    text-align: center;
    line-height: 200px;
    border: 1px solid #000;
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 20px;
    background-color: rgba(242, 242, 242, 1);
  }
  .x::before {
    content: "";
    width: inherit;
    border-top: 1px solid #000;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(8deg);
  }
  .x::after {
    content: "";
    width: inherit;
    border-top: 1px solid #000;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-8deg);
  }
  .uploadPic {
    margin-bottom: 40px;
  }
}
.edit_container {
  .quill-editor {
    height: 380px;
  }
}
.tinymce {
  .tox-tinymce {
    height: 380px;
  }
}
.upload-demo {
  margin-top: 80px;
}
// 新建通知
</style>
