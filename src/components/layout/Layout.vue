<template>
  <el-container>
    <el-aside :width="isCollapse?'64px':'250px'" style="height: 100%">
      <div class="company_box" :class="{'isCollapse': isCollapse}">
        <div class="img_box">
          <img v-if="isCollapse" src="@/assets/u64.png" alt />
          <img v-else src="@/assets/logo.png" alt />
        </div>
      </div>
      <sidebar :isCollapse="isCollapse"></sidebar>
    </el-aside>
    <el-container>
      <el-header height="50px" style>
        <div class="menu_col" @click="changeMune()">
          <i :class="isCollapse?'el-icon-s-grid':'el-icon-menu'"></i>
        </div>
        <div class="main_title">
          <span>广州大学考试系统</span>
        </div>
        <div style="height: 100%;float:right;">
          <el-dropdown style="width:50px; height: 100%;" trigger="click" @command="setting">
            <i class="el-icon-s-tools" style="margin:15px; font-size: 20px; cursor: pointer"></i>
            <el-dropdown-menu slot="dropdown" style="text-align: center;">
              <span class="drop_title" style="line-height: 40px; pointer-events: none">考试系统</span>
              <el-dropdown-item icon="el-icon-warning" command="info">账号中心</el-dropdown-item>
              <el-dropdown-item
                :icon="isCollapse?'el-icon-s-grid':'el-icon-menu'"
                command="changeMune"
              >
                <span>{{isCollapse?'展开菜单':'收起菜单'}}</span>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-warning" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!--        <div style="height: 100%;float:right; margin: 0 15px;">-->
        <!--          <theme-picker></theme-picker>-->
        <!--        </div>-->
      </el-header>
      <el-main>
        <div class="page_main" :style="isCollapse?'min-width:1096px':'min-width:910px'">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "./sidebar/SideBar";
import ThemePicker from "./ThemePicker";

export default {
  name: "Layout",
  components: {
    sidebar: Sidebar,
    "theme-picker": ThemePicker
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    setting(event) {
      if (event === "changeMune") {
        this.isCollapse = !this.isCollapse;
      } else if (event === "logout") {
        console.log("退出登录");
      } else if (event === "info") {
        this.$router.push("/info");
      }
    },
    changeMune() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.el-aside {
  background: $theme-color;
  transition: all 0.3s;
}

.company_box {
  width: 100%;
  height: auto;
  padding: 15px 0;
}

.company_box .img_box {
  width: 100%;
  height: auto;
  padding: 15px 15px;

  p {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
}

.company_box.isCollapse .img_box {
  padding: 2px;
}

.company_box .img_box img {
  width: 100%;
  height: auto;
}

.el-header {
  position: relative;
  background-color: #f8f8f8;
  color: #333;
  line-height: 50px;
  padding: 0;
}

.el-header:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #cccccc;
}

.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
  color: $theme-color;
}

.main_title {
  float: left;
  margin-left: 20px;
  font-size: 14px;
  color: $theme-color;
}

.page_main {
  min-width: 910px;
  width: 100%;
}

.menu_col {
  float: left;
  width: 50px;
  height: 50px;
  text-align: center;
  cursor: pointer;
  color: $theme-color;
}

.menu_col:hover {
  background: $theme-color;
  color: #ffffff;
}

.drop_title {
  color: $theme-color;
}
</style>
