<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-button style="margin-left: 80px; margin-bottom: 20px;" class="null" plain>账号信息</el-button>
        <el-form-item label="学院：" prop="typeid">
          <el-select style="width: 350px;" size="small" v-model="form.typeid" placeholder="请选择学院">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名：" prop="code">
          <el-input size="small" v-model="form.code" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="orderid">
          <el-input type="text" size="small" v-model="form.orderid" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="orderid">
          <el-input type="text" size="small" v-model="form.orderid" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="QQ：" prop="orderid">
          <el-input type="text" size="small" v-model="form.orderid" placeholder="请输入QQ"></el-input>
        </el-form-item>
        <el-button style="margin-left: 80px; margin-bottom: 20px;" class="null" plain>账号设置</el-button>
        <el-form-item label="角色：" prop="typeid">
          <el-select style="width: 350px;" size="small" v-model="form.typeid" placeholder="请选择角色">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号：" prop="code">
          <el-input size="small" v-model="form.code" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="orderid">
          <el-input type="text" size="small" v-model="form.orderid" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="orderid">
          <el-input type="text" size="small" v-model="form.orderid" placeholder="请再次输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-left: 150px">
        <el-button size="small" type="primary" @click="dialogFormEdit('formEdit')">确 定</el-button>
        <el-button size="small" @click="$router.back()">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    const checkOrderid = (rule, value, callback) => {
      if (Boolean(this.form.state)) {
        if (!value) {
          callback(new Error("请输入订单号"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      options: [
        {
          id: 1,
          name: "国际汽车展览会1"
        },
        {
          id: 2,
          name: "国际汽车展览会2"
        },
        {
          id: 3,
          name: "国际汽车展览会3"
        },
        {
          id: 4,
          name: "国际汽车展览会4"
        },
        {
          id: 5,
          name: "国际汽车展览会5"
        }
      ],
      formrules: {
        code: [
          { required: true, message: "请输入门票识别码", trigger: "blur" }
        ],
        typeid: [
          { required: true, message: "请选择票种类型", trigger: "blur" }
        ],
        orderid: [
          { required: true, validator: checkOrderid, trigger: "blur" }
        ],
      },
      form: {
        state: 0
      }
    };
  },
  watch: {
    "form.state"(val, oldVal) {
      if (val && Boolean(val)) {
        this.formrules.orderid[0].required = true;
      } else {
        this.formrules.orderid[0].required = false;
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    init(id) {
      this.form = {
        id: id,
        code: "1354652132",
        typeid: 2,
        creatTime: "2019-03-06 09:45:55",
        orderid: "",
        state: 0
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
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 350px;
}
</style>
