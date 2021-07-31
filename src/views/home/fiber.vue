<template>
  <div class="box">
    <div class="btns">
      <!--      <el-button type="primary" @click="$router.push('/createFiber')">创建</el-button>-->
      <!-- <el-button type="primary" @click="workOrder">工单调整</el-button> -->
      <el-button type="primary" @click="kaigong">开工</el-button>
      <!--      <el-button type="primary" @click="$router.push('/move')">挪料</el-button>-->
      <el-button type="primary" @click="tofiberYc">报异常</el-button>
      <el-button type="primary" @click="tofiberOk">报工</el-button>
    </div>
    <div class="search">
      <div class="div">
        <span class="span ls">设备</span>
        <span class="ml">：</span>
        <el-input
          v-model="store.sbInput"
          placeholder="请扫描设备"
          @blur="sbBlur"
        >
          <template slot="append" class="temBtn">
            <el-button type="primary" @click="getsb"> 扫码 </el-button>
          </template>
        </el-input>
      </div>
      <div class="div">
        <span class="span">经轴卡号：</span>
        <el-input
          v-model="store.cardNumber"
          placeholder="请输入经轴卡号"
          @blur="cardBlur"
        >
          <!-- <template slot="append" class="temBtn">
            <el-button type="primary" @click="getCard"> 扫码 </el-button>
          </template> -->
        </el-input>
      </div>
      <div class="div">
        <span class="span ls">状态</span>
        <span class="ml">：</span>
        <el-select
          v-model="store.status"
          placeholder="请选择"
          @change="changeStatus"
        >
          <el-option
            v-for="item in store.statusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="tab">
      <el-table
        border
        @select="select"
        @select-all="selectAll"
        @row-click="handleRow"
        ref="multipleTable"
        :data="list"
        :row-class-name="getTabIndex"
        style="width: 100%"
        :row-style="rowClass"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column prop="BILLNO" label="经轴卡号"> </el-table-column>
        <el-table-column prop="PRODUCTID" label="品名"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-show="scope.row.STATEID === 0">{{
              scope.row.STATEID === 0 ? "未落实" : null
            }}</span>
            <span v-show="scope.row.STATEID === 1">
              {{ scope.row.STATEID === 1 ? "已落实未领料" : null }}
            </span>
            <span v-show="scope.row.STATEID === 2">{{
              scope.row.STATEID === 2 ? "已领料待生产" : null
            }}</span>
            <span v-show="scope.row.STATEID === 3">{{
              scope.row.STATEID === 3 ? "生产中" : null
            }}</span>
            <span v-show="scope.row.STATEID === 4">{{
              scope.row.STATEID === 4 ? "已完工" : null
            }}</span>
            <span v-show="scope.row.STATEID === 5">
              {{ scope.row.STATEID === 5 ? "委外未发料" : null }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <van-pagination
      v-model="listPage.page"
      :items-per-page="listPage.PageSize"
      :total-items="total"
      mode="simple"
      @change="handleSizeChange"
    />
    <van-popup
      v-model="orCodeValStatic"
      position="right"
      :overlay="locationLayer"
      :class="locationLayer ? 'orBgcPop' : ''"
    >
      <orCdeSingle
        :orType="orCodeType"
        :orCodeStatic="orCodeStaticVal"
        @onceOR="onceOR"
        @multipleOR="multipleOR"
        @endOrcodeWindow="endOrcodeWindow"
        @layerEnd="layerEnd"
      ></orCdeSingle>
    </van-popup>
  </div>
</template>

<script>
import orCdeSingle from "../../components/orCode/orCodePD";
import { api } from "../../api";
import storage from "../../api/storage";
import localStorage from "../../api/localStorage";
import { Notify } from "vant";
export default {
  name: "fiber",
  data() {
    return {
      // 关于扫码
      orCodeValStatic: false,
      locationLayer: true,
      orCodeType: "",
      orCodeStaticVal: -1,
      // 数据
      list: [],
      // 暂时未知
      currentRow: "",
      // 单选框对应当前行数据
      operation: {},
      selectedIndex: this.$route.query.row,
      // 搜索条件在 vuex
      store: {},
      user: localStorage.getUser(),
      listPage: {
        Page: 1,
        PageSize: 10,
      },
      total: 0,
    };
  },
  created() {
    this.store = this.$store.state.fiber;
    console.log(this.store);
    this.getList();
  },
  components: {
    orCdeSingle,
  },
  methods: {
    // 获取列表
    getList() {
      let params = {
        Page: this.listPage.Page,
        PageSize: this.listPage.PageSize,
        Entity: {
          // KeyWord: "string",
          // UserID: this.user.UserId,
          EquipmentID: this.store.sbInput,
          // OrderID: "string",
          STATEID: this.store.status,
          BillID: this.store.cardNumber,
        },
      };
      // console.log(params);
      api.GetQJInfoList(this.$qs.stringify(params)).then((res) => {
        this.list = res.data.Entities;
        this.total = res.data.Total;

      });
    },
    // 状态改变
    changeStatus() {
      this.getList();
    },
    // 设备失去焦点
    sbBlur() {
      this.getList();
    },
    // 经轴卡号失去焦点
    cardBlur() {
      this.getList();
    },
    //分页
    handleSizeChange(val) {
      this.listPage.Page = val;
      this.getList();
    },

    // 开工
    kaigong() {
      console.log(this.user);
      // 如果this.operation有id证明选中单选框在执行其他操作
      if (!this.operation.hasOwnProperty("BILLNO")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      let params = {
        ORGID: this.operation.ORGID,
        BILLNO: this.operation.BILLNO,
        BILLDATE: this.operation.BILLDATE,
        ORDERID: this.operation.ORDERID,
        GATEWIDTH: this.operation.GATEWIDTH,
        LOOMTYPEID: this.operation.LOOMTYPEID,
        PRODUCTID: this.operation.PRODUCTID,
        BEAMTYPEID: this.operation.BEAMTYPEID,
        PLANMETERNUM: this.operation.PLANMETERNUM,
        PLANOCCUPY: this.operation.PLANOCCUPY,
        ROLLNUM: this.operation.ROLLNUM,
        WARPWAY: this.operation.WARPWAY,
        WARPDEVICEID: this.operation.WARPDEVICEID,
        ProductionWorkersUsersID: this.user.UserId,
        WORKSHOP: this.operation.WORKSHOP,
        WARPSUPPLIERID: this.operation.WARPSUPPLIERID,
        ISWARPORDER: this.operation.ISWARPORDER,
        ISWARPFALL: this.operation.ISWARPFALL,
        ISWARPEND: this.operation.ISWARPEND,
        ISCOUNT: this.operation.ISCOUNT,
        WARPENDDATE: this.operation.WARPENDDATE,
        WARPNO: this.operation.WARPNO,
        ISWEAVORDER: this.operation.ISWEAVORDER,
        ISWEAVFALL: this.operation.ISWEAVFALL,
        WEAVFALLDATE: this.operation.WEAVFALLDATE,
        PRODUCTIONSTARTDATE: this.operation.PRODUCTIONSTARTDATE,
        PRODUCTIONENDDATE: this.operation.PRODUCTIONENDDATE,
        PRODUCTIONINPUTNUMBER: this.operation.PRODUCTIONINPUTNUMBER,
        PRODUCTIONMACHINENUMBER: this.operation.PRODUCTIONMACHINENUMBER,
        WEAVDEVICEID: this.operation.WEAVDEVICEID,
        WEAVSUPPLIERID: this.operation.WEAVSUPPLIERID,
        ISWEAVEND: this.operation.ISWEAVEND,
        FLAG: this.operation.FLAG,
        STATEID: this.operation.STATEID,
        ISPRINT: this.operation.ISPRINT,
        REALTIMEINVENTORY: this.operation.REALTIMEINVENTORY,
        ISREADY: this.operation.ISREADY,
        REMARKS: this.operation.REMARKS,
        CreatorId: this.operation.CreatorId,
      };
      console.log(params);
      api.QJSubmitStart(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        if (res.data.Success == true) {
          this.getList();
          return Notify({ type: "success", message: res.data.Message });
        } else {
          return Notify({ type: "danger", message: res.data.Message });
        }
      });
    },
    // 工单调整
    workOrder() {
      if (!this.operation.hasOwnProperty("BILLNO")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$router.push({
        path: "/fiberWorkOrder",
        query: {
          pObjs: this.operation,
          billno: this.store.cardNumber,
        },
      });
    },
    // 报工
    tofiberOk() {
      // 如果this.operation有id证明选中单选框在执行其他操作
      if (!this.operation.hasOwnProperty("BILLNO")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$router.push({
        path: "/fiberOk",
        query: {
          pObjs: this.operation,
          equipmentId: this.store.sbInput,
        },
      });
    },
    // 异常
    tofiberYc() {
      if (!this.operation.hasOwnProperty("BILLNO")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$router.push({
        path: "/fiberYc",
        query: {
          pObjs: this.operation,
        },
      });
    },
    // 去详情
    handleRow(row) {
      console.log(row);
      this.$router.push({
        path: "/fiberDetail",
        query: {
          pObjs: row,
        },
      });
    },
    // 扫码获取设备
    getsb() {
      this.orCodeType = "YC";
      this.locationLayer = true;
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    onceOR(data) {
      // this.store.sbInput = data
      this.$store.commit("fiberUpdataSbInput", data);
      this.getList();
    },
    // 扫码成功执行函数
    multipleOR(data) {
      this.$store.commit("fiberUpdataCardNum", data);

      this.getList();
    },
    // 扫码条件
    endOrcodeWindow() {
      this.orCodeStaticVal = 1;
      this.orCodeValStatic = false;
    },
    layerEnd() {
      this.locationLayer = false;
    },
    // 多选变单选
    select(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) return;
      this.$refs.multipleTable.toggleRowSelection(row, true);
      this.operation = row;
      console.log(this.operation);
    },
    // 全选禁用
    selectAll() {
      this.$refs.multipleTable.clearSelection();
    },
    // 设置index
    getTabIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    // 点击行 row 当前行数据

    handleCurrentChange(val) {
      this.currentRow = val;
      this.selectedIndex = val.index;
    },
    rowClass({ row, rowIndex }) {
      if (parseInt(this.selectedIndex) === rowIndex) {
        return {
          border: "solid 1px #3dffef!important",
          "background-color": "#cccccc",
        };
      }
    },
  },
};
</script>

<style scoped lang="less">
.van-popup--right {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .btns {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 5px;
    border-bottom: 5px solid #f5f5f5;
    .el-button {
      width: 110px;
      margin: 5px 5px 0 0;
    }
  }
  .search {
    width: 100%;
    margin-top: 15px;
    padding-bottom: 5px;
    border-bottom: 5px solid #f5f5f5;
    .div {
      margin-top: 5px;
      span {
        font-size: 18px;
      }
      .span {
        margin-top: 5px;
      }
      .ls {
        letter-spacing: 35px;
      }
      .ml {
        margin-left: -35px;
      }
      .el-input,
      .el-select {
        width: 250px;
      }
    }
  }
  .tab {
    padding-bottom: 20px;
    .el-table {
      margin-top: 8px;
    }
  }
  .van-pagination {
    padding-bottom: 50px;
  }
}
</style>
