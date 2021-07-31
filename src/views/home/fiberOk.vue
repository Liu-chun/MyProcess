<template>
  <div class="box">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">经轴卡号：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.BILLNO }}
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
        <div class="grid-content bg-purple">机台：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ pObjs.WARPDEVICEID }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">人员：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ user.PersonName }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">数采数量：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          {{ scnum }}
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">实际数量：</div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          <el-input v-model="input" size="small" type="number"></el-input></div
      ></el-col>
    </el-row>
    <div class="btns">
      <el-button type="primary" @click="yes">确定</el-button>
      <el-button type="primary" @click="no">取消</el-button>
    </div>
  </div>
</template>

<script>
import { api } from "../../api";
import { Notify } from "vant";
import storage from "../../api/storage";
import localStorage from "../../api/localStorage";
export default {
  name: "fiberOk",
  data() {
    return {
      input: null,
      scnum: null,
      pObjs: {},
      equipmentId: "",
      user: localStorage.getUser(),
    };
  },
  created() {
    this.pObjs = this.$route.query.pObjs;
    this.equipmentId = this.$route.query.equipmentId;
    console.log(this.pObjs);
    console.log(this.equipmentId);
  },
  mounted() {
    this.getNum();
  },
  methods: {
    getNum() {
      let params = {
        code: this.pObjs.BILLNO,
      };
      console.log(params);
      api.GetQJSC(this.$qs.stringify(params)).then((res) => {
        console.log(res);
        if (res.data.Success == false) {
          return Notify({ type: "danger", message: res.data.Message });
        } else {
          this.scnum = res.data;
        }
      });
    },
    yes() {
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
        WARPWAY: this.pObjs.WARPWAY,
        WARPDEVICEID: this.pObjs.WARPDEVICEID,
        ProductionWorkersUsersID: this.user.UserId,
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
        PRODUCTIONINPUTNUMBER: this.input,
        PRODUCTIONMACHINENUMBER: this.pObjs.PRODUCTIONINPUTNUMBER,
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
      api.QJSubmitEnd(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        if (res.data.Success == true) {
          this.$router.go(-1)
          return Notify({ type: "success", message: res.data.Message });
        } else {
          return Notify({ type: "danger", message: res.data.Message });
        }
      });
    },
    no() {
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
  //     .btn {
  //       float: right;
  //       margin-right: 10px;
  //       line-height: 16px;
  //     }
  //   }
  //   .li {
  //     display: flex;
  //     align-items: center;
  //     padding: 5px 0;
  //     .el-input {
  //       width: 200px;
  //     }
  //   }
  // }
  .btns {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
  }
}
</style>
