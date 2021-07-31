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
        <p>生产和检查情况</p>
      </div>
      <p class="p">挡车工：{{ list.productionWorkersName }}</p>
      <p class="p">累计米数：{{ list.volumeNumber }}</p>
      <p class="p">累计卷数：{{ list.volumeCount }}</p>
      <p class="p">缺陷米数：{{ list.defectNumber }}</p>
      <p class="p">半成品检验合格米数：{{ list.halfNumber }}</p>
      <p class="p">缺陷米数：{{ list.halfNumber }}</p>
      <p class="p">未检米数：{{ list.halfNumber }}</p>
      <p class="p">扣分情况：{{ list.halfNumber }}</p>
    </div>
    <div class="btn">
      <el-button type="primary" size="small">数据报错</el-button>
    </div>
    <div class="tab">
      <div class="title">
        <p>任务信息</p>
      </div>
      <el-table border :data="list.mzzDetaile">
        <el-table-column prop="taskNo" label="任务书号"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-show="scope.row.stateId === 0">{{
              scope.row.stateId === 0 ? "已落实待生产" : null
            }}</span>
            <span v-show="scope.row.stateId === 1">{{
              scope.row.stateId === 1 ? "未落实" : null
            }}</span>
            <span v-show="scope.row.stateId === 3">{{
              scope.row.stateId === 3 ? "已对样" : null
            }}</span>
            <span v-show="scope.row.stateId === 4">{{
              scope.row.stateId === 4 ? "生产中" : null
            }}</span>
            <span v-show="scope.row.stateId === 5">{{
              scope.row.stateId === 5 ? "生产已完工" : null
            }}</span>
            <span v-show="scope.row.stateId === 6">{{
              scope.row.stateId === 6 ? "半成品验布中" : null
            }}</span>
            <span v-show="scope.row.stateId === 7">{{
              scope.row.stateId === 7 ? "半成品验布已完工" : null
            }}</span>
            <span v-show="scope.row.stateId === 8">{{
              scope.row.stateId === 8 ? "成品验布中" : null
            }}</span>
            <span v-show="scope.row.stateId === 100">{{
              scope.row.stateId === 100 ? "已完工" : null
            }}</span>
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
  name: "reportWeaving",
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
      api.GetZZDetail(params).then((res) => {
        console.log(res.data);
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
  padding-bottom: 50px;
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
    margin-top: 10px;
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
    // padding-bottom: 50px;
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
