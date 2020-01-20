<template>
  <div style="min-width:1280px;">
    <!-- 查看信息 -->
    <el-page-header @back="back" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="title">
      <h2>编辑报名公告</h2>
    </div>
    <div id="Addmessage">
      <el-form class="message-form" label-width="100px">
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
          <span></span>
        </el-form-item>

        <el-form-item label>
          <template>
            <div class="edit_container">
              <!-- <quill-editor
               style="width: 880px;" 
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
              ></quill-editor>-->
              <editor style="width: 880px;" id="tinymce" v-model="content" :init="init"></editor>
            </div>
          </template>
        </el-form-item>

        <el-form-item label="附件" class="upload-demo">
          <el-upload
            :action="uploadurl + '/upload/upFileByAll'"
            :on-success="handleSuccessAction"
            :on-exceed="handleExceedAction"
            :before-upload="beforeAvatarUpload"
            :headers="token"
            v-model="annex"
            :limit="1"
          >
            <div class="border">
              <el-button size="small" type="primary">选择文件</el-button>
            </div>
            <div slot="tip" class="el-upload__tip">
              <i class="el-icon-warning"></i>大小：20M
            </div>
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
      init: {
        language_url: "/static/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/ui/oxide",
        images_upload_url: "http://192.168.0.7:9090/upload/upFileByAll",
        height: 400,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
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
    // 发布
    backToDoorMessage() {
      const fd = new FormData();
      fd.append("id", this.$route.params.row);
      fd.append("caption", this.caption);
      fd.append("content", this.content.replace(/<[^>]+>/g, ""));
      fd.append("createTime", this.createTime);
      console.log(this.caption);
      console.log(this.content);
      this.$http.post("/creaRecruitment/updateRecruitment", fd).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$router.push("/admin/doorMessage2");
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 获取查看的数据
    eachAction() {
      const fd = new FormData();
      fd.append("id", this.$route.params.row);
      this.$http.post("/creaRecruitment/detailRecruitment", fd).then(res => {
        console.log(res);
        this.caption = res.data.caption;
        this.content = res.data.content;
        this.createTime = res.data.createTime;
        (this.id = res.data.id),
          (this.name = res.data.name),
          (this.examId = res.data.examId),
          (this.receive = res.data.receive),
          (this.review = res.data.review),
          (this.status = res.data.status);
      });
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {} // 内容改变事件
  },
  created() {
    this.eachAction();
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
.upload-demo {
  margin-top: 80px;
}
// 新建通知
</style>
