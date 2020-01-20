<template>
  <el-col :span="24">
    <el-tabs
      style="min-width:1280px;"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="招生章程" name="/sell/one"></el-tab-pane>
      <el-tab-pane label="报名公告" name="/sell/two"></el-tab-pane>
      <el-tab-pane label="网上报名操作实例" name="/sell/three"></el-tab-pane>
    </el-tabs>

    <router-view></router-view>
  </el-col>
</template>

<script>
export default {
  name: "Panel",
  data() {
    return {
      activeName: "/sell/one",
      historyActive: "/sell/two",
    };
  },
  created() {
    if (this.$route.matched[2]) {
      this.activeName = this.$route.matched[2].path;
      this.historyActive = this.$route.matched[2].path;
    }
  },
  watch: {
    $route(to, from) {
      // console.log(from);
    //   if (from.matched[2].path !== "/admin/doorMessage1") {
    //     this.$router.replace({
    //       name: "doorMessage",
    //       params: {
    //         path: to.path
    //       }
    //     });
    //   }
    }
  },
  methods: {
    handleClick(tab, event) {
        this.historyActive = tab.name;
        this.$router.push(tab.name);
      // console.log(tab)
      // console.log(event)
    }
  }
};
</script>

<style>
.el-submenu.is-active.is-opened>.el-submenu__title{background-color: #000;}
.el-tabs__item.is-active{color:#009cd1}
.el-tabs__item:hover{color:#009cd1;cursor:pointer}
.el-tabs__active-bar{
    background-color: #009cd1;
}
</style>
