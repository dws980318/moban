<template>
  <div class="details">
    <!-- 新建通知 -->
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="title">
      <h2>基本信息</h2>
    </div>
    <div id="Addmessage">
      <el-form class="message-form" label-width="100px">
        <el-form-item label="通知标题" for="messageTitle">
          <el-input v-model="caption" id="messageTitle" type="text"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" for="messageTime">
          <el-date-picker
            v-model="createTime"
            id="messageTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="更新人" for="messageName">
          <el-input v-model="messageName" id="messageName" type="text"></el-input>
        </el-form-item>
        <el-form-item label for="messageName">
          <template>
            <div class="tinymce">
              <editor style="width: 60vw;" v-model="content" :init="init"></editor>
            </div>
          </template>
        </el-form-item>
        <!-- <textarea v-model="content" id="messageInfo"></textarea> -->
        <div class="title2">
          <h2>接收人</h2>
        </div>
        <div class="received">
          <div class="keyword">
            <span>关键字</span>
            <el-input v-model="username" placeholder="请输入姓名" type="text"></el-input>
            <el-button @click="toggleSelection([tableData[rows]])">全选</el-button>
            <el-button type="primary" @click="inits">搜索</el-button>
          </div>
          <div class="list">
            <el-table
              :data="tableData"
              style="width: 100%"
              border
              ref="multipleTable"
              :header-cell-class-name="cellClass"
            >
              <el-table-column align="center" type="selection" width="50"></el-table-column>
              <el-table-column label="序号" prop="id" width="50" align="center"></el-table-column>
              <el-table-column prop="name" label="姓名" width="auto" align="center"></el-table-column>
              <el-table-column label="联系方式" width="auto" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.oneself">电话：{{scope.row.oneself}}</div>
                  <div v-if="scope.row.email">邮箱：{{scope.row.email}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="area" label="生源地" width="120" align="center"></el-table-column>
            </el-table>
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </el-form>
      <div style="text-align: center;">
        <el-button style="width: 100px;height:40px;" type="success" @click="issue = true">发布</el-button>
        <el-button style="width: 100px;height:40px;" @click="$router.back()">返回</el-button>
      </div>
    </div>
    <!-- 新建通知 -->

    <!-- 发布弹窗 -->
    <el-dialog class="dialogVisible" :visible.sync="issue" width="50%" true>
      <div style="height:100px">
        <span>点击确定将发布该通知</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="issue = false">确 定</el-button>
        <el-button @click="issue = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 发布弹窗 -->
  </div>
</template>

<script>
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
  components: {
    // quillEditor,
    Editor
  },
  name: "Details",
  data() {
    const isMobilePhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    const isFixMob = /^1[34578]\d{9}$/;
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(
          new Error("请输入固定电话或手机号码，固定电话格式：区号-号码")
        );
      } else if (!isFixMob.test(value) && !isMobilePhone.test(value)) {
        callback(
          new Error("请输入正确电话号码或手机号码，固定电话格式：区号-号码")
        );
      } else {
        callback();
      }
    };
    return {
      formrules: {
        // distributor: [
        //   { required: true, message: '请输入渠道商名称', trigger: 'blur' }
        // ],
        // name: [
        //   { required: true, message: '请输入姓名', trigger: 'blur' }
        // ],
        // phone: [
        //   { required: true, validator: checkPhone, trigger: 'change' }
        // ]
      },
      caption: "",
      createTime: "",
      content: "",
      receive: "",
      username: "",
      messageName: "",
      rows: [],
      currentPage: 1,
      pageSize: 99,
      total: 0,
      form: {
        state: 0
      },
      tableData: [],
      issue: false,
      // 初始化配置
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
  created() {
    if (this.$route.params.id) {
      this.inits(this.$route.params.id);
    }
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    inits(id) {
      this.form = {
        id: 10,
        distributor: "欧式家居展会门票",
        total: 998,
        clear: 30,
        place: "这是欧式家居展会门票说明",
        creatTime: "2019-03-06 09:45:55",
        state: 1
      };
    },
    dialogFormEdit() {
      this.$refs["checkForm"].validate(valid => {
        if (valid) {
          console.log(this.form);
        } else {
          return false;
        }
      });
    },
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
    },
    //改变页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.eachAction();
    },
    //修改条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.eachAction();
    }
  }
};
</script>

<style scoped lang="stylus">
.el-input {
  width: 350px;
}

.error-state {
  color: orangered;
  padding: 0 5px;
}

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

  .message-form {
    > div {
      margin-bottom: 20px;
    }

    span {
      font-size: 12px;
      vertical-align: middle;
    }

    input[type='checkbox'] {
      vertical-align: middle;
      width: 16px;
      margin-right: 5px;
    }

    textarea {
      width: 95%;
      height: 500px;
      resize: none;
      vertical-align: top;
    }

    #submit {
      width: 200px;
      height: 80px;
      color: #fff;
      background-color: $blue;
      border-radius: 5px;
      border: none;
      margin-left: 50%;
      transform: translateX(-100px);

      &:hover {
        background-color: $green;
        cursor: pointer;
      }
    }

    .title2 {
      color: $green;
      border-left: 5px solid $green;
      margin-top: 42px;

      h2 {
        margin-left: 10px;
      }
    }

    .received {
      width: 95%;
      padding: 10px;
      margin-bottom: 50px;
      background-color: rgba(242, 242, 242, 1);

      .keyword {
        span {
          font-size: 18px;
        }

        .el-input {
          width: 300px;
          margin-left: 20px;
        }

        .btn {
          cursor: pointer;
          padding: 5px 15px;
          font-size: 14px;
          background-color: #fff;
          border: 1px solid #797979;
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

      .result {
        margin-top: 30px;

        .btn {
          cursor: pointer;
          padding: 5px 15px;
          font-size: 14px;
          background-color: #fff;
          border: 1px solid #797979;
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

      .list {
        width: 100%;
        min-height: 200px;
        text-align: center;
        margin-top: 15px;
        font-size: 20px;
      }
    }
  }
}

// 新建通知
#Addmessage {
  .el-form-item {
    width: 600px;

    .el-form-item__label {
      width: 100px;
      text-align: left;
    }

    .el-input {
      width: 300px;
    }
  }
}

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
</style>


