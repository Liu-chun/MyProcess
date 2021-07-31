<template>
  <div class="box">
    <div class="container">
      <div class="item" @click="oneFn">
        <p :class="one ? 'red' : null">A故障</p>
      </div>
      <div class="item" @click="twoFn">
        <p :class="two ? 'red' : null">B故障</p>
      </div>
      <div class="item" @click="threeFn">
        <p :class="three ? 'red' : null">C故障</p>
      </div>
      <div class="item" @click="fourFn">
        <p :class="four ? 'red' : null">D故障</p>
      </div>
      <div class="item" @click="fiveFn">
        <p :class="five ? 'red' : null">E故障</p>
      </div>
      <div class="item" @click="sixFn">
        <p :class="six ? 'red' : null">F故障</p>
      </div>
    </div>
    <div class="why">
      <span>故障原因录入：</span>
      <el-input v-model="why"></el-input>
    </div>
    <div class="btns">
      <el-button type="primary" @click="$router.go(-1)">确认</el-button>
      <el-button type="primary" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "equipmentM",
    data(){
      return{
        // 只显示当前
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        //
        why: ''
      }
    },
    created() {

    },
    methods: {
      oneFn(){
        this.one = !this.one
      },
      twoFn(){
        this.two = !this.two
      },
      threeFn(){
        this.three = !this.three
      },
      fourFn(){
        this.four = !this.four
      },
      fiveFn(){
        this.five = !this.five
      },
      sixFn(){
        this.six = !this.six
      },
    }
  }
</script>

<style scoped lang="less">
  .red{
    color: #ff0000;
  }
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
    .why{
      font-size: 16px;
      margin-top: 15px;
      margin-left: 30px;
      display: flex;
      align-items: center;
      .el-input{
        width: 150px;
      }
    }
    .btns{
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }

  }
</style>
