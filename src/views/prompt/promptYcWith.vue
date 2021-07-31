<template>
  <div class="box">
    <div class="top">
      <p>推送人：{{pObjs.sendUser}}</p>
      <p>推送消息内容：{{pObjs.reason}}</p>
      <p>是否处理：是</p>
    </div>
    <div class="ma" v-show="pObjs.typeID === '501'">
      <span>任务书号：</span>
      <el-input v-model="cardNumber">
        <template slot="append" class="temBtn">
          <el-button
            type="primary"
            @click="getrws"
          >
            扫码
          </el-button>
        </template>
      </el-input>
    </div>
    <div class="search" v-show="pObjs.typeID !== '501'">
      <div>
        <span>异常类别：</span>
        <el-select v-model="ycId" placeholder="请选择" filterable clearable>
          <el-option
            v-for="item in ycArr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <span>异常原因：</span>
        <el-input v-model="ycVal"></el-input>
      </div>
    </div>
    <div class="btnA">
      <el-button type="primary" class="btn" @click="chuli" v-show="pObjs.typeID !== '501'">
        处理
      </el-button>
      <el-button type="primary" class="btn" @click="dOk" v-show="pObjs.typeID === '501'">
        对样成功
      </el-button>
      <el-button type="primary" class="btn" @click="dSb" v-show="pObjs.typeID === '501'">
        对样失败
      </el-button>
      <el-button type="primary" class="btn" @click="fanhuiFn">
        返回
      </el-button>
    </div>

    <!--    扫码-->
    <van-popup
      v-model="orCodeValStatic"
      position="right"
      :overlay="locationLayer"
      :class="locationLayer ? 'orBgcPop' :''"
    >
      <orCdeSingle
        :orType="orCodeType"
        :orCodeStatic="orCodeStaticVal"
        @multipleOR="multipleOR"
        @endOrcodeWindow="endOrcodeWindow"
        @layerEnd="layerEnd"
      ></orCdeSingle>
    </van-popup>
  </div>
</template>

<script>
  import {Notify} from "vant";
  import storage from "../../api/storage";
  import {api} from "../../api";
  import orCdeSingle from "../../components/orCode/orCodePD";

  export default {
    name: "promptYcWith",
    components: {
      orCdeSingle,
    },
    data(){
      return{
        // 关于扫码
        orCodeValStatic: false,
        locationLayer: true,
        orCodeType: '',
        orCodeStaticVal: -1,

        cardNumber: '',
        ycId: '',
        ycArr: [],
        ycVal: '',
        pObjs: {},
        isdis: true
      }
    },
    created() {
      this.pObjs = this.$route.query.pObjs
      this.yc = this.$route.query.pObjs.typeID
      console.log(this.pObjs)
      this.getLeibie()      
    },
    methods: {
      getLeibie(){
        let params = {
          id: this.pObjs.typeID
        };
        api.GetProblemDetail(params).then((res) => {
          console.log(res.data)
          this.ycArr = res.data
        })
      },
      chuli(){
        let params = {
          id: this.pObjs.id,
          typeLineID: this.ycId,
          abnormalReason: this.ycVal
        };
        api.HandleInformation(params).then((res) => {
          console.log(res.data)
          if(res.data.isSuccess){
            Notify({type: 'success', message: res.data.message});
            this.$router.push({
              path: '/promptYc',
            })
          }else {
            Notify({type: 'danger', message: res.data.message});
            this.$router.push({
              path: '/promptYc',
            })
          }
        })
      },
      // 对样成功
      dOk(){
        if(this.cardNumber.length < 1){
          return Notify({type: 'danger', message: '请输入任务书号'});
        }
        let params = {
          id: this.pObjs.id,
          taskNo: this.cardNumber
        };
        api.SubmitFirstAA(params).then((res) => {
          console.log(res.data)
          if(res.data.isSuccess){
            Notify({type: 'success', message: res.data.message});
            this.$router.push({
              path: '/promptYc',
            })
          }else {
            Notify({type: 'danger', message: res.data.message});
            this.$router.push({
              path: '/promptYc',
            })
          }
        })
      },
      // 对样失败
      dSb(){
        if(this.cardNumber.length < 1){
          return Notify({type: 'danger', message: '请输入任务书号'});
        }
        let params = {
          id: this.pObjs.id,
          taskNo: this.cardNumber
        };
        api.SubmitFirstNGAA(params).then((res) => {
          console.log(res.data)
          if(res.data.isSuccess){
            Notify({type: 'success', message: res.data.message});
            this.$router.push({
              path: '/promptYc',
            })
          }else {
            Notify({type: 'danger', message: res.data.message});
            this.$router.push({
              path: '/promptYc',
            })
          }
        })
      },
      fanhuiFn(){
        this.$router.push({
          path: '/promptYc',
        })
      },

      // 扫码
      getrws(){
        this.orCodeType = "DC";
        this.orCodeStaticVal = 2;
        this.orCodeValStatic = true;
      },
      // 扫码成功执行函数
      multipleOR(data) {
        this.cardNumber = data
      },
      // 扫码条件
      endOrcodeWindow() {
        this.orCodeStaticVal = 1;
        this.orCodeValStatic = false;
      },
      layerEnd() {
        this.locationLayer = false;
      },
    }
  }
</script>

<style scoped lang="less">
  .van-popup--right {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .box {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;

    .top{
     background-color: #f5f5f5;
      p{
        font-size: 17px;
        line-height: 2em;
        margin-top: 10px;
      }
    }
    .ma{
      margin-top: 8px;
      display: flex;
      align-items: center;
      span{
        font-size: 17px;
      }
      .el-input{
        width: 250px;
      }
    }
    .search{
      margin-top: 15px;
      padding-bottom: 5px;
      border-bottom: 5px solid #f5f5f5;
      div{
        margin-top: 5px;
        span{
          margin-top: 5px;
          font-size: 18px;
        }
        .el-input{
          width: 250px;
        }
      }
    }
    .btnA{
      margin-top: 15px;
    }
  }
</style>
