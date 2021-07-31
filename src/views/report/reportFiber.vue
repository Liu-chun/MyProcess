<template>
  <div class="box">
    <div class="btns">
      <el-button type="primary" size="small" @click="updataNum(1)"
        >昨天</el-button
      >
      <el-button type="primary" size="small" @click="updataNum(2)"
        >当天</el-button
      >
      <el-button type="primary" size="small" @click="updataNum(3)"
        >当周</el-button
      >
      <el-button type="primary" size="small" @click="updataNum(4)"
        >当月</el-button
      >
    </div>
    <div class="middle">
      <div class="title">
        <p>生产情况</p>
      </div>
      <p class="p">纤经工：{{ list.productionWorkersName }}</p>
      <p class="p">累计米数：{{ list.warpNumber }}</p>
      <p class="p">累计经轴数：{{ list.warpCount }}</p>
    </div>
    <div class="btn">
      <el-button type="primary" size="small" @click="updataNum(4)"
        >数据报错</el-button
      >
    </div>
    <div class="tab">
      <div class="title">
        <p>任务信息</p>
      </div>
      <el-table border :data="list.mqjDetaile">
        <el-table-column prop="beamCardNo" label="经轴卡号"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-show="scope.row.stateId === 0">
              {{ scope.row.stateId === 0 ? "已落实待生产" : null }}
            </span>
            <span v-show="scope.row.stateId === 1">{{
              scope.row.stateId === 1 ? "未落实" : null
            }}</span>
            <span v-show="scope.row.stateId === 2">{{
              scope.row.stateId === 2 ? "生产中" : null
            }}</span>
            <span v-show="scope.row.stateId === 100">
              {{ scope.row.stateId === 100 ? "已完工" : null }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="iDate" label="日期"> </el-table-column>
      </el-table>
    </div>
    <div class="btn">
      <el-button type="primary" size="small" @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { api } from "../../api";

export default {
  name: "reportFiber",
  data() {
    return {
      num: 2,
      list: {},
    };
  },
  created() {
    this.getList(2);
  },
  methods: {
    getList(day) {
      let params = {
        // 1==昨天,2==当天,3==当周,4==当月
        dataType: day,
      };
      api.GetQJDetail(params).then((res) => {
        this.list = res.data.data;
      });
    },
    // 当天
    updataNum(num) {
      this.num = num;
      this.getList(this.num);
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .btns {
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
    padding-bottom: 5px;
    border-bottom: 5px solid #f5f5f5;
  }
  .btn {
    // float: right;
    overflow: hidden;
    // margin-right: 30px;
    button {
      float: right;
      margin-right: 30px;
    }
  }
  .middle {
    margin-top: 8px;
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
    .p {
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
