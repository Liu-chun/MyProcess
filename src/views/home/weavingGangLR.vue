<template>
  <div class="box">
    <ul>
      <li>任务书号：{{pObjs.taskNo}}</li>
      <li>订单号：{{pObjs.orderNo}}</li>
      <li>品名：{{pObjs.warpaxistypename}}</li>
      <li v-show="pObjs.stateId === 0">状态：{{pObjs.stateId === 0 ? '未开始' : null}}</li>
      <li v-show="pObjs.stateId === 4">状态：{{pObjs.stateId === 4 ? '生产中' : null}}</li>
      <li v-show="pObjs.stateId === 5">状态：{{pObjs.stateId === 5 ? '生产已完工' : null}}</li>
      <li v-show="pObjs.stateId === 6">状态：{{pObjs.stateId === 6 ? '半成品验布中' : null}}</li>
      <li v-show="pObjs.stateId === 7">状态：{{pObjs.stateId === 7 ? '半成品验布已完工' : null}}</li>
      <li v-show="pObjs.stateId === 8">状态：{{pObjs.stateId === 8 ? '成品验布中' : null}}</li>
      <li v-show="pObjs.stateId === 100">状态：{{pObjs.stateId === 100 ? '已完工' : null}}</li>
      <li>经轴类型：{{pObjs.beamno}}</li>
      <li>总经（根）：{{pObjs.btotalwarpnum}}</li>
      <li>边经（根）：{{pObjs.sidewarpnum}}</li>
      <li>整经长度（米）：{{pObjs.planedquantity}}</li>
      <li>总匹数：{{pObjs.productrollnum}}</li>
      <li>机台：{{pObjs.deviceid}}</li>
      <li>挡车工：{{pObjs.productionWorkersName}}</li>
    </ul>
    <div class="gang">
      <span>缸号：</span>
      <el-input v-model="pObjs.taskjarmark"></el-input>
    </div>
    <div class="btns">
      <el-button type="primary" @click="okFn">确认</el-button>
      <el-button type="primary" @click="noFn">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {api} from "../../api";
  import storage from "../../api/storage";
  import {Notify} from "vant";

  export default {
    name: "weavingGangLR",
    data(){
      return{
        sbInput:　'',
        pObjs: {}
      }
    },
    created() {
      this.pObjs = this.$route.query.pObjs
      console.log(this.pObjs)
    },
    methods: {
      // 确认
      okFn(){
        let params = this.pObjs
        api.SubmitUser(params).then((res) => {
          if(res.data.isSuccess){
            Notify({type: 'success', message: res.data.message});
            this.$router.push({
              path: '/weavingGang',
            })
          }else {
            Notify({type: 'danger', message: res.data.message});
            this.$router.push({
              path: '/weavingGang',
            })
          }
        })
      },
      // 取消
      noFn(){
        this.$router.push({
          path: '/weavingGang',
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
    ul{
      li{
        font-size: 16px;
        line-height: 2em;
        border-bottom: 1px solid #f5f5f5;
      }
    }
    .gang{
      margin: 8px 0;
      span{
        font-size: 17px;
      }
      .el-input{
        width: 250px;
      }
    }
    .btns{
      display: flex;
      justify-content: space-around;
      padding-bottom: 55px;
    }
  }
</style>
