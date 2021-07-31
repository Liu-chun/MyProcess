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
    <div class="search">
      <div>
        <!--        <p>时间:</p>-->
        <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          size="small"
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="updataTime"
        >
        </el-date-picker>
      </div>
      <div>
        <p>检验员：</p>
        <el-select
          v-model="bcpId"
          placeholder="请选择人员"
          size="small"
          clearable
          filterable
          @change="getList"
        >
          <el-option
            v-for="item in bcpArr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <p>机台：</p>
        <el-select
          v-model="jitaiId"
          placeholder="请选择状态"
          size="small"
          clearable
          filterable
          @change="getList"
        >
          <el-option
            v-for="item in jitaiArr"
            :key="item.code"
            :label="item.code"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="middle">
      <div class="title">
        <p>检验统计报表</p>
      </div>
      <p class="p">检验米数{{ list }}</p>
      <p class="p">缺陷米数{{ list }}</p>
      <p class="p">合格米数{{ list }}</p>
      <!-- <p class="p">实际整经米数：{{ list }}</p> -->
      <el-button type="primary" size="small" @click="tobcpscmx"
        >检验明细</el-button
      >
    </div>
    <div class="middle">
      <div class="title">
        <p>扣分统计报表</p>
      </div>
      <p class="p">总扣分{{ list }}</p>
      <!-- <p class="p">实际整经米数：{{ list }}</p> -->
      <el-button type="primary" size="small" @click="tokfmx"
        >扣分明细</el-button
      >
    </div>
    <div class="middle">
      <div class="title">
        <p>生产异常报表</p>
      </div>
      <p class="p">生产总时间：{{ list }}</p>
      <p class="p">异常时间：{{ list }}</p>
      <p class="p" style="font-weight: 800">作业时间：{{ list }}</p>
      <!-- <p class="p">上盘时间：{{ list }}</p> -->
      <p class="p" style="font-weight: 800">固定时间：{{ list }}</p>
      <div class="btn">
        <el-button type="primary" size="small" @click="tobcpycmx"
          >异常明细</el-button
        >
        <el-button type="primary" size="small" @click="tozhIndex"
          >返回</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../../../../api";

export default {
  name: "bcpBiao",
  data() {
    return {
      list: null,
      num: 2,
      // 时间段
      time: [],
      // 开始时间
      startTime: null,
      // 结束时间
      endTime: null,
      // 纤经
      bcpId: "",
      bcpArr: [],
      // 机台
      jitaiId: "",
      jitaiArr: [],
    };
  },
  created() {
    this.getJiTai();
    this.getName();
    this.getList();
  },
  methods: {
    getJiTai() {
      api.GetQJEquipment().then((res) => {
        console.log(res.data);
        this.jitaiArr = res.data;
        this.getList(this.num);
      });
    },
    getName() {
      api.GetQJUsers().then((res) => {
        console.log(res.data);
        this.qjArr = res.data;
        this.getList(this.num);
      });
    },
    getList() {},
    // 当天
    updataNum(num) {
      this.num = num;
      this.getList(this.num)
    },
    // 修改时间
    updataTime() {
      this.startTime = this.time !== null ? this.time[0] + " 00:00:00" : null;
      this.endTime = this.time !== null ? this.time[1] + " 23:59:59" : null;
      console.log(this.startTime);
      // if(this.time === null){
      //   this.getList(this.num)
      // }else {
      //   this.getList('')
      // }
    },
    tozhIndex() {
      this.$router.push({
        path: "/zhongHeIndex",
      });
    },
    tobcpscmx() {
      this.$router.push({
        path: "/bcpSc",
      });
    },
    tobcpycmx() {
      this.$router.push({
        path: "/bcpYc",
      });
    },
    tokfmx() {
      this.$router.push({
        path: "/bcpKf",
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

  .btns {
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
  }
  .search {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 2px solid #f5f5f5;
    flex-wrap: wrap;
    div {
      display: flex;
      align-items: center;
      padding-top: 5px;
      p {
        font-size: 15px;
        padding-top: 5px;
      }
      .el-option {
        width: 230px;
      }
      .el-date-picker {
        width: 280px;
      }
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
    .el-button {
      margin-top: 20px;
    }
    .btn {
      padding-bottom: 55px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
