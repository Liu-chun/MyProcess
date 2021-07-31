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
          v-model="personId"
          placeholder="请选择人员"
          size="small"
          clearable
          filterable
          @change="changeName"
        >
          <el-option
            v-for="item in personArr"
            :key="item.PERSONID"
            :label="item.PERSONNAME"
            :value="item.PERSONID"
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
          @change="changeJiTai"
        >
          <el-option
            v-for="item in jitaiArr"
            :label="item.EQUIPMENTNAME"
            :value="item.EQUIPMENTNO"
            :key="item.EQUIPMENTNO"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="middle" v-cloak>
      <el-row>
        <div class="title">
          <p>检验统计报表</p>
        </div>
        <p class="p">
          <span>检验米数：</span>
          <span>{{ list.CheckTotal }}</span>
        </p>
        <p class="p">
          <span>缺陷米数：</span>
          <span>{{ list.DefectTotal }}</span>
        </p>
        <p class="p">
          <span>合格米数：</span>
          <span>{{ list.QuantityTotal }}</span>
        </p>
        <!-- <p class="p">实际整经米数：{{ list }}</p> -->
        <el-button type="primary" size="small" @click="tocpscmx"
          >检验明细</el-button
        >
      </el-row>
    </div>

    <div class="middle">
      <div class="title">
        <p>检验统计报表</p>
      </div>
      <p class="p">
        <span>回修匹数：</span>
        <span>{{ repairTotalData.Num }}</span>
      </p>
      <p class="p">
        <span>回修米数：</span>
        <span>{{ repairTotalData.RepairTotal }}</span>
      </p>
      <el-button type="primary" size="small" @click="tohxmx"
        >回修明细</el-button
      >
    </div>
    <div class="middle">
      <div class="title">
        <p>生产异常报表</p>
      </div>
      <p class="p">生产总时间：</p>
      <p class="p">异常时间：</p>
      <p class="p" style="font-weight: 800">作业时间：</p>
      <!-- <p class="p">上盘时间：</p> -->
      <p class="p" style="font-weight: 800">固定时间：</p>
      <div class="btn">
        <el-button type="primary" size="small" @click="tocpycmx"
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
import {Notify} from 'vant'
export default {
  name: "bcpBiao",
  data() {
    return {
      list: {},
      num: 2,
      // 时间段
      time: [],
      // 开始时间
      startTime: null,
      // 结束时间
      endTime: null,
      // 纤经
      personId: "",
      personArr: [],
      // 机台
      jitaiId: "",
      jitaiArr: [],
      // 回修
      repairTotalData: {},
    };
  },
  created() {
    this.getJiTai();
    this.getName();

    this.getList(2);
  },
  computed: {
    // CheckTotal() {
    //   return this.list.CheckTotal.CheckTotal
    //     ? this.list.CheckTotal.CheckTotal
    //     : "";
    // },
    // DefectTotal() {
    //   return this.list.CheckTotal.DefectTotal
    //     ? this.list.CheckTotal.DefectTotal
    //     : "";
    // },
    // QuantityTotal() {
    //   return this.list.CheckTotal.QuantityTotal
    //     ? this.list.CheckTotal.QuantityTotal
    //     : "";
    // },
  },
  methods: {
    // 获取机台
    getJiTai() {
      let params = {
        Page: 1,
        PageSize: 50,
        Entity: {
          Code: "",
          Type: "",
        },
      };
      api.GetEquipmentList(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        this.jitaiArr = res.data.Entities;
        // this.getList(this.num);
      });
    },
    changeJiTai(val) {
      console.log(val);
      this.jitaiId = val;
    },
    // 获取人员
    getName() {
      let params = {
        Page: 1,
        PageSize: 50,
        Entity: {
          Code: "",
          Type: "",
        },
      };
      api.GetUserList(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        this.personArr = res.data.Entities;
        // this.getList(this.num);
      });
    },
    changeName(val) {
      console.log(val);
      this.personId = val;
    },
    getList(num) {
      let params = {
        DateType: num,
        PersonId: this.personId,
        MachineId: this.jitaiId,
      };
      console.log(params);
      api.getcheckstatistics(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        if (res.data.Success === false) {
          return Notify({ type: "danger", message: res.data.Message });
        } else {
          this.list = res.data.Enttity.CheckTotal;
          this.repairTotalData = res.data.Enttity.RepairTotal;
          console.log(this.list);
        }
      });
    },

    // 当天
    updataNum(num) {
      this.num = num;
      console.log(num);
      this.getList(num);
    },
    // 修改时间
    updataTime() {
      this.startTime = this.time !== null ? this.time[0] : null;
      this.endTime = this.time !== null ? this.time[1] : null;
      let params = {
        StateDate:  this.startTime,
        EndDate: this.endTime,
        PersonId: this.personId,
        MachineId: this.jitaiId,
      };
      console.log(params);
      api.getcheckstatistics(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        if (res.data.Success === false) {
          return Notify({ type: "danger", message: res.data.Message });
        } else {
          this.list = res.data.Enttity.CheckTotal;
          this.repairTotalData = res.data.Enttity.RepairTotal;
          console.log(this.list);
        }
      });
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
    tocpscmx() {
      this.$router.push({
        path: "/cpSc",
      });
    },
    tocpycmx() {
      this.$router.push({
        path: "/cpYc",
      });
    },
    tohxmx() {
      this.$router.push({
        path: "/cpHx",
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
