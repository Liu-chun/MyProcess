<template>
  <div class="box">
    <ul>
      <li>订单号：</li>
      <li>品名：</li>
      <li>状态：</li>
      <li>经轴类型：</li>
      <li>总经（根）：</li>
      <li>边经（根）：</li>
      <li>整经长度（米）：</li>
      <li>总匹数：</li>
      <li>备注：</li>
    </ul>
    <el-button class="btn">确定</el-button>
  </div>
</template>

<script>
  export default {
    name: "planDetail",
    data(){
      return{

      }
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
  .box {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    ul{
      li{
        font-size: 16px;
        line-height: 2em;
        border-bottom: 1px solid #f5f5f5;
      }
    }
    .btn{
      margin-top: 10px;
      float: right;
    }
  }
</style>
