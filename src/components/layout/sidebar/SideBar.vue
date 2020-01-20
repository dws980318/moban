<template>
  <div class="sidebar">
    <el-menu
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :default-active="currentMenu"
      :collapse="isCollapse"
      :router="true"
    >
      <el-menu-item index="/">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/ticket">
        <template slot="title">
          <i class="el-icon-present"></i>
          <span slot="title">权限管理</span>
        </template>
        <el-menu-item-group>
          <!-- <span slot="title">权限管理</span> -->
          <el-menu-item index="/ticket/type">角色管理</el-menu-item>
          <el-menu-item index="/ticket/code">管理员账号管理</el-menu-item>
          <el-menu-item index="/ticket/examinee">考生账号管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-present"></i>
          <span slot="title">考试管理</span>
        </template>
        <el-menu-item-group>
          <!-- <span slot="title">考试管理</span> -->
          <el-menu-item index="/order/examination">考试管理</el-menu-item>
          <el-menu-item index="/order/informationCollect">信息采集模板管理</el-menu-item>
          <el-menu-item index="/order/professional">专业管理</el-menu-item>
          <el-menu-item index="/order/subject">科目管理</el-menu-item>
          <el-menu-item index="/order/academy">学院管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/signIn">
        <template slot="title">
          <i class="el-icon-present"></i>
          <span slot="title">考场管理</span>
        </template>
        <el-menu-item-group>
          <!-- <span slot="title">考场管理</span> -->
          <el-menu-item index="/signIn/list">考生签到管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/check">
        <template slot="title">
          <i class="el-icon-present"></i>
          <span slot="title">审核管理</span>
        </template>
        <el-menu-item-group>
          <!-- <span slot="title">审核管理</span> -->
          <el-menu-item index="/check/list">信息采集管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/distribution">
        <template slot="title">
          <i class="el-icon-money"></i>
          <span slot="title">成绩管理</span>
        </template>
        <el-menu-item-group>
          <!-- <span slot="title">成绩管理</span> -->
          <el-menu-item index="/distribution/distributor">考生初试成绩管理</el-menu-item>
          <el-menu-item index="/distribution/preliminary">考生初试入围成绩管理</el-menu-item>
          <el-menu-item index="/distribution/record">考生复试成绩管理</el-menu-item>
          <el-menu-item index="/distribution/reexamination">考生复试入围成绩管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/examineeData">
        <template slot="title">
          <i class="el-icon-money"></i>
          <span slot="title">数据统计</span>
        </template>
        <el-menu-item-group>
          <!-- <span slot="title">数据统计</span> -->
          <el-menu-item index="/examineeData/distributor">考生数据统计</el-menu-item>
          <el-menu-item index="/examineeData/record">考试情况统计</el-menu-item>
          <el-menu-item index="/examineeData/qualified">专业合格统计</el-menu-item>
          <el-menu-item index="/examineeData/apply">报名统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/sell">
        <template slot="title">
          <i class="el-icon-money"></i>
          <span slot="title">信息管理</span>
        </template>
        <el-menu-item-group>
          <!-- <span slot="title">信息管理</span> -->
          <el-menu-item index="/sell/inform">通知管理</el-menu-item>
          <el-menu-item index="/sell/one">门户信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/serve">
        <template slot="title">
          <i class="el-icon-money"></i>
          <span slot="title">数据管理</span>
        </template>
        <el-menu-item-group>
          <!-- <span slot="title">数据管理</span> -->
          <el-menu-item index="/serve/backup">数据备份</el-menu-item>
          <el-menu-item index="/serve/list">数据恢复</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: ["isCollapse"],
  data() {
    return {
      currentMenu: "/"
    };
  },
  watch: {
    "$route.path"(val, oldVal) {
      if (val && val !== oldVal) {
        this.currentMenu = sessionStorage.getItem("path");
        this.getUrl();
      }
    }
  },
  created() {
    this.getUrl();
  },
  methods: {
    // 设置导航初始化
    getUrl() {
      if (this.$route.matched.length > 3) {
        this.currentMenu = this.$route.matched[2].path;
      } else {
        this.currentMenu = this.$route.matched[1].path;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-menu {
  background: $theme-color;
}

.el-menu-item, .el-submenu__title {
  color: #ffffff;

  i {
    color: #ffffff;
  }
}

.el-menu-item.is-active {
  opacity-color(0.5);
  color: $theme-color;
}

.el-menu-item.is-active, .el-menu-item:hover, .el-menu-item:focus, .el-submenu__title:hover * {
  color: $theme-color !important;

  i {
    color: $theme-color;
  }
}

.el-submenu {
  .el-menu {
    background: $theme-color !important;
  }
}

.el-submenu__title * {
  color: #ffffff !important;
  font-size: 16px;
}

.el-menu-item-group {
  background: rgba(0, 0, 0, 0.05);

  .el-menu-item-group__title {
    color: #fafafa !important;
  }
}

.el-menu-item {
  font-size: 16px;
}


</style>


