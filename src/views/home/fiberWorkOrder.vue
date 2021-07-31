<template>
  <div class="box">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple type">经轴卡号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light type">
          {{ pObjs.BILLNO }}
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
        <div class="grid-content bg-purple">机台：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          <!-- {{pObjs.warpDeviceID}} -->
          <template>
            <el-select v-model="input" placeholder="请选择">
              <el-option
                v-for="item in jitaiArr"
                :label="item.EQUIPMENTNAME"
                :value="item.EQUIPMENTNO"
                :key="item.EQUIPMENTNO"
              >
              </el-option>
            </el-select>
          </template>
          <!-- <el-input v-model="jitaiArr.EQUIPMENTID" size="small"></el-input> -->
          <!-- {{ pObjs.warpDeviceID }} -->
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">纤经工：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          <template>
            <el-select
              v-model="person"
              @change="changePerson"
              placeholder="请选择"
            >
              <el-option
                v-for="item in personArr"
                :label="item.PERSONNAME"
                :value="item.PERSONID"
                :key="item.PERSONID"
              >
              </el-option>
            </el-select>
          </template></div
      ></el-col>
    </el-row>
    <div class="btn">
      <el-button type="primary" @click="UpdateQJEquipment">确定</el-button>
      <el-button type="primary" @click="go">取消</el-button>
    </div>
  </div>
</template>

<script>
import { api } from "../../api";
import { Notify } from "vant";
export default {
  name: "fiberDetail",
  data() {
    return {
      pObjs: {},
      jitaiArr: [],
      personArr: [],
      input: "",
      person: "",
      billno: "",
    };
  },
  created() {
    this.pObjs = this.$route.query.pObjs;
    this.billno = this.$route.query.billno;
    console.log(this.pObjs);
    this.GetEquipmentList();
    this.GetUserList();
  },
  methods: {
    // 获取机台
    GetEquipmentList() {
      let params = {
        Page: 1,
        PageSize: 50,
        Entity: {
          // Code: "",
          Type: "",
        },
      };
      api.GetEquipmentList(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        this.jitaiArr = res.data.Entities;
        // this.getList(this.num);
      });
    },
    // 获取人员
    GetUserList() {
      let params = {
        Page: 1,
        PageSize: 50,
        Entity: {
          // Code: "",
          Type: "",
        },
      };
      api.GetUserList(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        this.personArr = res.data.Entities;
        // this.getList(this.num);
      });
    },
    changePerson(val) {
      console.log(this.person);
    },
    //更新纤经机台
    UpdateQJEquipment() {
      let params = {
        ORGID: this.pObjs.ORGID,
        BILLNO: this.pObjs.BILLNO,
        BILLDATE: this.pObjs.BILLDATE,
        ORDERID: this.pObjs.ORDERID,
        GATEWIDTH: this.pObjs.GATEWIDTH,
        LOOMTYPEID: this.pObjs.LOOMTYPEID,
        PRODUCTID: this.pObjs.PRODUCTID,
        BEAMTYPEID: this.pObjs.BEAMTYPEID,
        PLANMETERNUM: this.pObjs.PLANMETERNUM,
        PLANOCCUPY: this.pObjs.PLANOCCUPY,
        ROLLNUM: this.pObjs.ROLLNUM,
        TOTALBEAMAMOUNT: this.pObjs.TOTALBEAMAMOUNT,
        SIDEBEAMAMOUNT: this.pObjs.SIDEBEAMAMOUNT,
        WARPWAY: this.pObjs.WARPWAY,
        WARPDEVICEID: this.input,
        ProductionWorkersUsersID: this.person,
        WORKSHOP: this.pObjs.WORKSHOP,
        WARPSUPPLIERID: this.pObjs.WARPSUPPLIERID,
        ISWARPORDER: this.pObjs.ISWARPORDER,
        ISWARPFALL: this.pObjs.ISWARPFALL,
        ISWARPEND: this.pObjs.ISWARPEND,
        ISCOUNT: this.pObjs.ISCOUNT,
        WARPENDDATE: this.pObjs.WARPENDDATE,
        WARPNO: this.pObjs.WARPNO,
        ISWEAVORDER: this.pObjs.ISWEAVORDER,
        ISWEAVFALL: this.pObjs.ISWEAVFALL,
        WEAVFALLDATE: this.pObjs.WEAVFALLDATE,
        PRODUCTIONSTARTDATE: this.pObjs.PRODUCTIONSTARTDATE,
        PRODUCTIONENDDATE: this.pObjs.PRODUCTIONENDDATE,
        PRODUCTIONINPUTNUMBER: this.pObjs.PRODUCTIONINPUTNUMBER,
        PRODUCTIONMACHINENUMBER: this.pObjs.PRODUCTIONMACHINENUMBER,
        WEAVDEVICEID: this.pObjs.WEAVDEVICEID,
        WEAVSUPPLIERID: this.pObjs.WEAVSUPPLIERID,
        ISWEAVEND: this.pObjs.ISWEAVEND,
        FLAG: this.pObjs.FLAG,
        STATEID: this.pObjs.STATEID,
        ISPRINT: this.pObjs.ISPRINT,
        REALTIMEINVENTORY: this.pObjs.REALTIMEINVENTORY,
        ISREADY: this.pObjs.ISREADY,
        REMARKS: this.pObjs.REMARKS,
        CreatorId: this.pObjs.CreatorId,
      };
      console.log(params);
      api.UpdateQJEquipment(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        if ((res.data.Success = true)) {
          // this.getList();
          this.$router.push({
            path: "/fiber",
            query: {
              row: this.$route.query.pObjs.index,
            },
          });
          return Notify({ type: "success", message: res.data.Message });
        } else {
          return Notify({ type: "danger", message: res.data.Message });
        }
      });
    },
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
  .btn {
    margin-top: 10px;
    //   float: right;
    display: flex;
    justify-content: space-around;
  }
}
</style>
