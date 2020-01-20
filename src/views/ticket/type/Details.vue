<template>
  <div class="details">
    <el-page-header @back="goBack" :content="$route.params.id?'编辑':'新增'"></el-page-header>
    <div class="form">
      <el-form :model="form" ref="checkForm" label-width="150px" :rules="formrules">
        <el-form-item v-if="form.id" label="id：" prop="id">
          <p>{{form.id}}</p>
        </el-form-item>
        <el-form-item label="角色名称：" prop="name">
          <el-input size="small" v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="权限：" prop="power">
          <el-col :span="24">
            <el-tree
              ref="tree"
              :data="powerList"
              node-key="id"
              :default-checked-keys="power"
              show-checkbox
              default-checked-all
              :props="props"
              @check-change="handleCheckChange"
            ></el-tree>
          </el-col>
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
import desk from "@/common/images/desk.png";
import money from "@/common/images/money.png";
import safa from "@/common/images/safa.png";
import Power from "@/utils/power.js";
export default {
  name: "Details",
  data() {
    const checkCommission = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入佣金比例"));
      } else if (value < 0 || value > 20) {
        callback(new Error("请输入正确佣金比例,范围0到20"));
      } else {
        callback();
      }
    };
    return {
      powerList: [],
      power: [],
      options: [
        {
          id: 1,
          name: "拆红包"
        }
      ],
      formrules: {},
      form: {
        state: 0
      },
      props: {
        label: "name",
        children: "children"
      }
    };
  },
  created() {
    this.powerList = Power.meun;
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    handleCheckChange(data) {
      this.power = this.$refs.tree.getCheckedKeys();
      // console.log(this.$refs.tree.getCheckedKeys())
    },
    goBack() {
      this.$router.back();
    },
    init(id) {
      let one =
        "1002,1003,1004,102,1005,1006,1007,1008,1009,2002,2003,2004,2005,2006,2007,2008,202,203,204,205,3,301,7,701,702,8,801,802";
      const power = one.split(",");
      console.log(power);
      this.power = power;
      this.$refs.tree.setCheckedKeys(power);
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
