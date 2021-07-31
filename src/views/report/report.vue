<template>
  <div class="box">
    <div class="btns">
      <el-button type="primary" size="small" @click="qianjing">纤经</el-button>
      <el-button type="primary" size="small" @click="zhizao">织造</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "reportWeaving",
    data(){
      return{

      }
    },
    created() {

    },
    methods: {
      qianjing(){
        this.$router.push({
          path: '/reportFiber'
        })
      },
      zhizao(){
        this.$router.push({
          path: '/reportWeaving'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .box {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .btns{
      display: flex;
      justify-content: space-around;
      margin-top: 5px;
      padding-bottom: 5px;
      border-bottom: 5px solid #f5f5f5;
    }
    .middle{
      margin-top: 8px;
      .title{
        width: 100%;
        height: 35px;
        background-color: #cccccc;
        p{
          text-align: center;
          line-height: 35px;
          font-size: 16px;
        }
      }
      .p{
        margin-left: 30px;
        line-height: 2em;
        font-size: 16px;
      }
    }
    .tab {
      margin-top: 8px;
      padding-bottom: 50px;
      .title {
        width: 100%;
        height: 35px;
        background-color: #cccccc;
        p {
          text-align: center;
          line-height: 35px;
          font-size: 16px;
        }
      }
    }
  }
</style>
