<template>
  <div class="index">
    <h3>罗浮宫家居</h3>
    <p>
      <!--      <router-link to="/info">账号中心</router-link>-->
      <!--      <router-link to="/game">游戏管理</router-link>-->
      <router-link to="/ticket/code">中奖核销</router-link>
      <router-link to="/menpiao/record/list">门票核销</router-link>
      <router-link to="/distribution/record/list">礼券核销</router-link>
      <!--      <span @click="logout()">退出登录</span>-->
    </p>
  </div>
</template>

<script>
export default {
  name: "Index",
  methods: {
    logout() {
      console.log("退出登录");
    }
  }
};
</script>

<style lang="stylus" scoped>
a {
  text-decoration: none;
}

div {
  margin-top: 240px;
}


</style>
