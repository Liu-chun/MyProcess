<template>
  <div class="box">

    <div class="container">
      <div class="item" @click="toqj">
        <p>纤经</p>
      </div>
      <div class="item" @click="tozz">
        <p>织造</p>
      </div>
      <div class="item" @click="tobcp">
        <p>半成品检验</p>
      </div>
      <div class="item" @click="tocp">
        <p>成品检验</p>
      </div>
      <div class="item">
        <p>仓库</p>
      </div>
      <div class="item">
        <p>销售</p>
      </div>
      <div class="item">
        <p>计划</p>
      </div>
      <div class="item">
        <p>设备</p>
      </div>
      <div class="item">
        <p>采购</p>
      </div>
      <div class="item" style="opacity:0">
        <p>测试</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "zhongHeIndex",
    data(){
      return{

      }
    },
    created() {

    },
    methods: {
      toqj(){
        this.$router.push({
          path: 'qjBiao'
        })
      },
      tozz(){
        this.$router.push({
          path: 'zzBiao'
        })
      },
      tobcp(){
        this.$router.push({
          path:'bcpBiao'
        })
      },
      tocp(){
        this.$router.push({
          path:'cpBiao'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .box{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .container{
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      align-items: center;
      .item{
        width: 35%;
        height: 80px;
        margin-top: 10px;
        background-color: #f5f5f5;
        p{
          font-size: 18px;
          text-align: center;
          line-height: 80px;
        }
      }
    }
  }
</style>
