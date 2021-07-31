<template>
  <div class="box">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">流水号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.BATCHNO }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">次米：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.CIMI }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">毛米：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.MAOMI }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">产品型号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.MATERIALID }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">净米：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.QUANTITY }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">订单号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.RESERVEDNO1 }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">缸号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.SUBBATCHNO }}
        </div></el-col
      >
    </el-row>

    <!-- <ul>
      <li class="type">织机类型：{{ pObjs.remark }}</li>
      <li>订单号：{{ pObjs.orderNo }}</li>
      <li>品名：{{ pObjs.warpAxisTypeName }}</li>
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
      </li>
      <li>经轴类型：{{ pObjs.warpAxisType }}</li>
      <li>报工米数：{{ pObjs.productionInputNumber }}</li>
      <li>总经（根）：{{ pObjs.totalBy }}</li>
      <li>边经（根）：{{ pObjs.sideBy }}</li>
      <li>整经长度（米）：{{ pObjs.needNumber }}</li>
      <li>总匹数：{{ pObjs.productrollNum }}</li>
      <li>总匹数：{{ pObjs.productrollNum }}</li>
      <li>备注：{{ pObjs.remark }}</li>
    </ul> -->
    <el-button type="primary" class="btn" @click="go">确定</el-button>
  </div>
</template>

<script>
export default {
  name: "cpIntoStoreDetail",
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
        path: "/cpIntoStore",
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
  .type {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: red;
    font-weight: 700;
  }
  // ul {
  //   li {
  //     font-size: 16px;
  //     line-height: 2em;
  //     border-bottom: 1px solid #f5f5f5;
  //   }
  //   .type {
  //     white-space: nowrap;
  //     text-overflow: ellipsis;
  //     overflow: hidden;
  //     color: red;
  //     font-weight: 700;
  //   }
  // }
  .btn {
    margin-top: 10px;
    float: right;
  }
}
</style>
