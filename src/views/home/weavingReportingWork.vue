<template>
  <div class="box">
    <div class="details">任务书详情</div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">任务书号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.beamCardNo }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">订单号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.orderNo }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">品名：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.weavingName }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">状态：</div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light" v-show="pObjs.stateId === 0">
          {{ pObjs.stateId === 0 ? "未开始" : null }}
        </div>
        <div class="grid-content bg-purple-light" v-show="pObjs.stateId === 1">
          {{ pObjs.stateId === 1 ? "料未到" : null }}
        </div>
        <div class="grid-content bg-purple-light" v-show="pObjs.stateId === 2">
          {{ pObjs.stateId === 2 ? "生产中" : null }}
        </div>
        <div
          class="grid-content bg-purple-light"
          v-show="pObjs.stateId === 100"
        >
          {{ pObjs.stateId === 100 ? "已完工" : null }}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">机台：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.warpDeviceID }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">挡车工：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.productionWorkersName }}
        </div></el-col
      >
    </el-row>
    <div class="details">报工信息</div>
    <ul>
      <li>
        <span class="span ls" style="letter-spacing: 5px">流水号</span>
        <span class="ml">：</span>
        <el-input v-model="store.sbInput" size="small">
          <template slot="append" class="temBtn">
            <el-button type="primary" @click="getsb"> 扫码 </el-button>
          </template>
        </el-input>
      </li>
      <li>
        <span class="span ls">缸<span class="y">缸号</span>号</span>
        <span class="ml">：</span>
        <el-input v-model="store.sbInput" size="small"> </el-input>
      </li>
      <li>
        <span class="span ls">数采米数</span>
        <span class="ml">：</span>
        <el-input v-model="store.sbInput" size="small"> </el-input>
      </li>
      <li>
        <span class="span ls">确认米数</span>
        <span class="ml">：</span>
        <el-input v-model="store.sbInput" size="small"> </el-input>
      </li>
    </ul>
    <div class="btn">
      <el-button type="primary" @click="go">确定</el-button>
      <el-button type="primary" @click="go">取消</el-button>
    </div>
    <van-popup
      v-model="orCodeValStatic"
      position="right"
      :overlay="locationLayer"
      :class="locationLayer ? 'orBgcPop' : ''"
    >
      <orCdeSingle
        :orType="orCodeType"
        :orCodeStatic="orCodeStaticVal"
        @onceOR="onceOR"
        @twoOR="twoOR"
        @multipleOR="multipleOR"
        @endOrcodeWindow="endOrcodeWindow"
        @layerEnd="layerEnd"
      ></orCdeSingle>
    </van-popup>
  </div>
</template>

<script>
import orCdeSingle from "../../components/orCode/orCodePD";
export default {
  name: "weavingReportingWork",
  components: {
    orCdeSingle,
  },
  data() {
    return {
      pObjs: {},
      // 关于扫码
      orCodeValStatic: false,
      locationLayer: true,
      orCodeType: "",
      orCodeStaticVal: -1,
      store: {},
    };
  },
  created() {
    // this.pObjs = this.$route.query.pObjs;
    this.store = this.$store.state.weaving;
    console.log(this.pObjs);
  },
  methods: {
    go() {
      this.$router.push({
        path: "/weaving",
        query: {
          row: this.$route.query.pObjs.index,
        },
      });
    },
    // 扫码获取流水号
    getsb() {
      this.orCodeType = "DC";
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    onceOR(data) {
      this.store.sbInput = data;
      // this.store.cardNumber = ''
      this.store.waters = "";
      this.getList();
    },
    twoOR(data) {
      this.store.cardNumber = data;
      // this.store.sbInput = ''
      this.getList();
    },
    multipleOR(data) {
      this.store.waters = data;
      // this.store.sbInput = ''
      // this.getLists()
    },
    endOrcodeWindow() {
      this.orCodeStaticVal = 1;
      this.orCodeValStatic = false;
    },
    layerEnd() {
      this.locationLayer = false;
    },
  },
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  .grid-content {
    font-size: 16px;
    line-height: 2em;
    border-bottom: 1px solid #f5f5f5;
  }
  .details {
    padding: 5px 0;
    font-size: 16px;
    color: #000;
    background-color: #ccc;
    text-align: center;
  }
  ul {
    li {
      font-size: 16px;
      line-height: 2em;
      border-bottom: 1px solid #f5f5f5;
      padding: 5px 0;
      .y {
        opacity: 0;
      }
      .temBtn {
        width: 0 !important;
        background-color: dodgerblue;
      }
      .el-input {
        width: 75%;
      }
    }
  }
  .btn {
    margin-top: 10px;
    //   float: right;
    display: flex;
    justify-content: space-around;
  }
}
</style>