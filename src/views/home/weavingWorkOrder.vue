<template>
  <div class="box">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">经轴卡号：</div>
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
        <div class="grid-content bg-purple">经轴类型：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.warpAxisType }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">总经（根）：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.sideBy }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">边经（根）：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.orderNo }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">整经长度(米)：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.needNumber }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">总匹数：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.productrollNum }}
        </div></el-col
      >
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
        <div class="grid-content bg-purple">挡车工</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.productionWorkersName }}
        </div></el-col
      >
    </el-row>
    <ul>
      <!-- <li>经轴卡号：{{ pObjs.beamCardNo }}</li>
      <li>订单号：{{ pObjs.orderNo }}</li>
      <li>品名：{{ pObjs.weavingName }}</li>
      <li v-show="pObjs.stateId === 0">
        状态：{{ pObjs.stateId === 0 ? "未开始" : null }}
      </li>
      <li v-show="pObjs.stateId === 1">
        状态：{{ pObjs.stateId === 1 ? "料未到" : null }}
      </li>
      <li v-show="pObjs.stateId === 2">
        状态：{{ pObjs.stateId === 2 ? "生产中" : null }}
      </li>
      <li v-show="pObjs.stateId === 100">
        状态：{{ pObjs.stateId === 100 ? "已完工" : null }}
      </li> -->
      <!-- <li>经轴类型：{{ pObjs.warpAxisType }}</li> -->
      <!-- <li>报工米数：{{ pObjs.productionInputNumber }}</li> -->
      <!-- <li>总经（根）：{{ pObjs.totalBy }}</li> -->
      <!-- <li>边经（根）：{{ pObjs.sideBy }}</li> -->
      <!-- <li>整经长度（米）：{{ pObjs.needNumber }}</li> -->
      <!-- <li>总匹数：{{ pObjs.productrollNum }}</li> -->
      <!-- <li>备注：{{ pObjs.remark }}</li> -->
      <!-- <li class="f">机台：{{ pObjs.warpDeviceID }}</li> -->
      <!-- <li class="f">纤经工：{{ pObjs.productionWorkersName }}</li> -->
    </ul>
    <div class="btn">
      <el-button type="primary" @click="go">确定</el-button>
      <el-button type="primary" @click="go">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "fiberDetail",
  data() {
    return {
      pObjs: {},
    };
  },
  created() {
    this.pObjs = this.$route.query.pObjs;
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
  // ul {
  //   li {
  //     font-size: 16px;
  //     line-height: 2em;
  //     border-bottom: 1px solid #f5f5f5;
  //     input {
  //       border: 1px solid #ccc;
  //       // box-shadow: inset 0 0 10px #f5f4f4;
  //       background-color: #fff;
  //     }
  //   }
  //   .f {
  //     display: flex;
  //     align-items: center;
  //   }
  // }
  .btn {
    margin-top: 10px;
    //   float: right;
    display: flex;
    justify-content: space-around;
  }
}
</style>
