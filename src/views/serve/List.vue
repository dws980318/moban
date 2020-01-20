<template>
  <div>
    <div class="recovery">
      <h2>点击进行数据恢复</h2>
      <el-button>确定恢复</el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.recovery {
  text-align: center;
  margin: 15% 0;
  h2 {
    font-size: 32px;
    margin-bottom: 150px;
  }
  .el-button {
    width: 140px;
    color: #000;
    border: 1px solid #000;
    &:hover {
      color: #000;
      background-color: #fff;
      border: 1px solid #000;
    }
  }
}
</style>
