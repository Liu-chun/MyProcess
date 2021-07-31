<template>
  <div class="box">
    <!--    备注，经轴类型-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">任务书号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.taskNo }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">经轴1/2：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.beamno }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">织造计划号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.weavingplanid }}
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
          {{ pObjs.warpaxistypename }}
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
          {{ pObjs.stateId === 4 ? "生产中" : null }}
        </div>
        <div class="grid-content bg-purple-light" v-show="pObjs.stateId === 2">
          {{ pObjs.stateId === 5 ? "生产已完工" : null }}
        </div>
        <div class="grid-content bg-purple-light" v-show="pObjs.stateId === 2">
          {{ pObjs.stateId === 6 ? "半成品验布中" : null }}
        </div>
        <div class="grid-content bg-purple-light" v-show="pObjs.stateId === 2">
          {{ pObjs.stateId === 7 ? "半成品验布已完工" : null }}
        </div>
        <div class="grid-content bg-purple-light" v-show="pObjs.stateId === 2">
          {{ pObjs.stateId === 8 ? "成品验布中" : null }}
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
        <div class="grid-content bg-purple">总经（根）：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.btotalwarpnum }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">边经（根）：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.sidewarpnum }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">整经长度(米)：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.planedquantity }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">总匹数：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.productrollnum }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">机台号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.deviceid }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">决议交期：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.planEndDate }}
        </div></el-col
      >
    </el-row>
    <!-- <ul>
      <li>任务书号：{{ pObjs.taskNo }}</li>
      <li>经轴1/2：{{ pObjs.beamno }}</li>
      <li>织造计划号：{{ pObjs.weavingplanid }}</li>
      <li>订单号：{{ pObjs.orderNo }}</li>
      <li>品名：{{ pObjs.warpaxistypename }}</li>
      <li v-show="pObjs.stateId === 0">
        状态：{{ pObjs.stateId === 0 ? "未开始" : null }}
      </li>
      <li v-show="pObjs.stateId === 4">
        状态：{{ pObjs.stateId === 4 ? "生产中" : null }}
      </li>
      <li v-show="pObjs.stateId === 5">
        状态：{{ pObjs.stateId === 5 ? "生产已完工" : null }}
      </li>
      <li v-show="pObjs.stateId === 6">
        状态：{{ pObjs.stateId === 6 ? "半成品验布中" : null }}
      </li>
      <li v-show="pObjs.stateId === 7">
        状态：{{ pObjs.stateId === 7 ? "半成品验布已完工" : null }}
      </li>
      <li v-show="pObjs.stateId === 8">
        状态：{{ pObjs.stateId === 8 ? "成品验布中" : null }}
      </li>
      <li v-show="pObjs.stateId === 100">
        状态：{{ pObjs.stateId === 100 ? "已完工" : null }}
      </li>
      <li>总经（根）：{{ pObjs.btotalwarpnum }}</li>
      <li>边经（根）：{{ pObjs.sidewarpnum }}</li>
      <li>整经长度（米）：{{ pObjs.planedquantity }}</li>
      <li>总匹数：{{ pObjs.productrollnum }}</li>
      <li>机台号：{{ pObjs.deviceid }}</li>
      <li>决议交期：{{ pObjs.planEndDate }}</li>
    </ul> -->
    <div class="btn">
      <el-button type="primary" @click="go">确定</el-button>
    </div>
  </div>
</template>

<script>
import { api } from "../../api";

export default {
  name: "weavingDetail",
  data() {
    return {
      pObjs: {},
    };
  },
  created() {
    this.pObjs = this.$route.query.pObjs;
    console.log(this.$route.query);
    this.getList();
  },
  methods: {
    getList() {
      if (this.$route.query.pathObjs.two.length > 0) {
        let params = {
          orderID: this.$route.query.pathObjs.two, // 210124016 this.store.cardNumber
        };
        api.GetProductionList3(params).then((res) => {
          console.log(res.data);
        });
      }
    },
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
  ul {
    li {
      font-size: 16px;
      line-height: 2em;
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    margin-top: 10px;
    float: right;
    padding-bottom: 55px;
  }
}
</style>
