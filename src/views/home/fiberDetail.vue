<template>
  <div class="box">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple type">织机类型：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light type">
          {{ pObjs.LOOMTYPEID }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">订单号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.ORDERID }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">品名：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.PRODUCTID }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">状态：</div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light" v-show="pObjs.STATEID === 0">
          {{ pObjs.STATEID === 0 ? "未落实" : null }}
        </div>
        <div class="grid-content bg-purple-light" v-show="pObjs.STATEID === 1">
          {{ pObjs.STATEID === 1 ? "已落实未领料" : null }}
        </div>
        <div class="grid-content bg-purple-light" v-show="pObjs.STATEID === 2">
          {{ pObjs.STATEID === 2 ? "已领料待生产" : null }}
        </div>
        <div class="grid-content bg-purple-light" v-show="pObjs.STATEID === 3">
          {{ pObjs.STATEID === 3 ? "生产中" : null }}
        </div>
        <div class="grid-content bg-purple-light" v-show="pObjs.STATEID === 4">
          {{ pObjs.STATEID === 4 ? "已完工" : null }}
        </div>
        <div class="grid-content bg-purple-light" v-show="pObjs.STATEID === 4">
          {{ pObjs.STATEID === 4 ? "委外未发料" : null }}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">经轴类型：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.BEAMTYPEID }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">总经（根）：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.TOTALBEAMAMOUNT }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">边经（根）：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.SIDEBEAMAMOUNT }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">整经长度(米)：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.PLANMETERNUM }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">总匹数：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.ROLLNUM }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">备注：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light type">
          {{ pObjs.REMARKS }}
        </div></el-col
      >
    </el-row>
    <el-button type="primary" class="btn" @click="go">确定</el-button>
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
        path: "/fiber",
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
  // .type {
  //   white-space: nowrap;
  //   text-overflow: ellipsis;
  //   overflow: hidden;
  //   color: red;
  //   font-weight: 700;
  // }
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
