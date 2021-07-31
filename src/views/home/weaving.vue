<template>
  <div class="box">
    <div class="btns">
      <!--      <el-button type="primary" @click="oneOk" :disabled="isD">对样OK</el-button>-->
      <!--      <el-button type="primary" @click="oneNG" :disabled="isD">对样NG</el-button>-->

      <el-button type="primary" @click="fnder" size="small"
        >呼叫帮教工</el-button
      >
      <el-button type="primary" @click="kaigong" :disabled="isD" size="small"
        >开工</el-button
      >
      <el-button type="primary" @click="kaigong" :disabled="isD" size="small"
        >换纱对样</el-button
      >
      <el-button type="primary" @click="abnormal" size="small"
        >报异常</el-button
      >
      <el-button type="primary" @click="reportingWorks" size="small"
        >报工</el-button
      >
      <el-button type="primary" @click="weavingStore" size="small">呼叫接头</el-button>
      <el-button type="primary" @click="greige" size="small">胚布AGV</el-button>
      <el-button type="primary" @click="greige" size="small"
        >套样呼叫</el-button
      >
      <!-- <el-button type="primary" @click="workOrder" size="small"
        >工单调整</el-button
      > -->
      <!-- <el-button type="primary" @click="stopFn" size="small"
        >暂停/重启</el-button
      > -->
      <!-- <el-button type="primary" @click="gangOK" size="small">缸号确认</el-button> -->

      <!-- <el-button type="primary" @click="dosing" size="small">配料AGV</el-button> -->

      <!-- <el-button type="primary" @click="fenpeiFn" size="small">重新分配</el-button> -->
      <!-- <el-button type="primary" @click="shebeiFn" size="small">设备绑定</el-button> -->
      <!-- <el-button type="primary" @click="toWeavingYc" :disabled="isD" size="small">异常</el-button> -->
      <!-- <el-button type="primary" @click="toShiuFn" size="small">流水号</el-button> -->
    </div>
    <div class="search">
      <div>
        <span class="span ls">设备</span>
        <span class="ml">：</span>
        <el-input v-model="store.sbInput" @blur="sbBlur">
          <template slot="append" class="temBtn">
            <el-button type="primary" @click="getsb"> 扫码 </el-button>
          </template>
        </el-input>
      </div>
      <div>
        <span>任务书号：</span>
        <el-input v-model="store.cardNumber" @blur="renWu">
          <template slot="append" class="temBtn">
            <el-button type="primary" @click="getrws"> 扫码 </el-button>
          </template>
        </el-input>
      </div>
      <!--      <div>-->
      <!--        <span class="span ls3">流水号</span>-->
      <!--        <span class="ml3">：</span>-->
      <!--        <el-input-->
      <!--          v-model="store.waters"-->
      <!--          @blur="liuShui"-->
      <!--        >-->
      <!--          <template slot="append" class="temBtn">-->
      <!--            <el-button-->
      <!--              type="primary"-->
      <!--              @click="getlsh"-->
      <!--            >-->
      <!--              扫码-->
      <!--            </el-button>-->
      <!--          </template>-->
      <!--        </el-input>-->
      <!--      </div>-->
      <div>
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
        <el-table-column prop="taskNo" label="任务书号"> </el-table-column>
        <el-table-column prop="warpaxistypename" label="品名">
        </el-table-column>
        <!-- <el-table-column prop="deviceid" label="设备"> </el-table-column> -->
        <el-table-column prop="stateId" label="状态">
          <template slot-scope="scope">
            <span v-show="scope.row.stateId === 0">{{
              scope.row.stateId === 0 ? "待生产" : null
            }}</span>
            <span v-show="scope.row.stateId === 1">{{
              scope.row.stateId === 1 ? "暂停中" : null
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    <div class="tab" v-if="lists.length > 0">-->
    <!--      <el-table-->
    <!--        border-->
    <!--        @select="select"-->
    <!--        @select-all="selectAll"-->
    <!--        @row-click="handleRow"-->
    <!--        ref="multipleTables"-->
    <!--        :data="lists"-->
    <!--        :row-class-name="getTabIndex"-->
    <!--        style="width: 100%"-->
    <!--        :row-style="rowClass"-->
    <!--        highlight-current-row-->
    <!--        @current-change="handleCurrentChange"-->
    <!--      >-->
    <!--        <el-table-column-->
    <!--          type="selection"-->
    <!--        >-->
    <!--        </el-table-column>-->
    <!--        <el-table-column-->
    <!--          prop="serialNum"-->
    <!--          label="流水号"-->
    <!--        >-->
    <!--        </el-table-column>-->
    <!--        <el-table-column-->
    <!--          prop="taskNo"-->
    <!--          label="任务书号"-->
    <!--        >-->
    <!--        </el-table-column>-->
    <!--        <el-table-column-->
    <!--          prop="warpaxistypename"-->
    <!--          label="品名"-->
    <!--        >-->
    <!--        </el-table-column>-->
    <!--        <el-table-column-->
    <!--          prop="state"-->
    <!--          label="状态"-->
    <!--        >-->
    <!--          <template slot-scope="scope">-->
    <!--            <span v-show="scope.row.state === 0">{{scope.row.state === 0 ? '未报产' : null}}</span>-->
    <!--            <span v-show="scope.row.state === 1">{{scope.row.state === 1 ? '已报产' : null}}</span>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--      </el-table>-->
    <!--    </div>-->

    <!--    扫码-->
    <van-popup
      v-model="orCodeValStatic"
      position="right"
      :overlay="locationLayer"
      :class="locationLayer ? 'orBgcPop' : ''"
    >
      <!-- :orType 给子类传参，@onceOR 让子类可调用父类的方法 -->
      <orCdeSingle
        :orType="orCodeType"
        :orCodeStatic="orCodeStaticVal"
        @onceOR="onceOR"
        @twoOR="twoOR"
        @multipleOR="multipleOR"
        @endOrcodeWindow="endOrcodeWindow"
        @layerEnd="layerEnd"
      ></orCdeSingle>
    </van-popup>
    <!--    暂停弹框-->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
      <el-button size="small" type="primary" @click="dataFn('紧急插单')"
        >紧急插单</el-button
      >
      <el-button size="small" type="primary" @click="dataFn('对样有问题')"
        >对样有问题</el-button
      >
      <el-button size="small" type="primary" @click="dataFn('换纬纱')"
        >换纬纱</el-button
      >
      <div class="loading">
        <el-input size="small" v-model="qita">换纬纱</el-input>
        <el-button size="small" type="primary" @click="qitaFn">其他</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import orCdeSingle from "../../components/orCode/orCodePD";
import { api } from "../../api";
import storage from "../../api/storage";
import { Notify } from "vant";

export default {
  name: "weaving",
  components: {
    orCdeSingle,
  },
  data() {
    return {
      // 带有流水号禁用上面按钮
      isD: false,
      dialogVisible: false,
      qita: "",
      // 关于扫码
      orCodeValStatic: false,
      locationLayer: true,
      orCodeType: "",
      orCodeStaticVal: -1,
      // 数据
      list: [],
      lists: [],
      // 暂时未知
      currentRow: "",
      // 单选框对应当前行数据
      operation: {},
      selectedIndex: this.$route.query.row,
      store: {},
    };
  },
  // serialNum 流水号 带流水号的id 变成 ids
  created() {
    this.store = this.$store.state.weaving;
    // window.addEventListener('resize', this.resizeChart)
  },
  mounted() {
    if (this.store.waters.length > 0) {
      this.getLists();
    } else {
      this.getList();
    }
  },
  methods: {
    resizeChart() {
      console.log(123);
    },
    // 流水号
    toShiuFn() {
      if (!this.operation.hasOwnProperty("id")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$router.push({
        path: "/weavingShui",
        query: {
          pObjs: this.operation.taskNo,
        },
      });
    },
    // 呼叫接头
    weavingStore() {
      if (!this.operation.hasOwnProperty("id")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$router.push({
        path: "/weavingStore",
        query: {
          pObjs: this.operation.taskNo,
        },
      });
    },
    // 工单调整
    workOrder() {
      if (!this.operation.hasOwnProperty("id")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$router.push({
        path: "/weavingWorkOrder",
        query: {
          pObjs: this.operation,
        },
      });
    },
    // 暂停
    stopFn() {
      if (!this.operation.hasOwnProperty("id")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.dialogVisible = true;
    },
    // 暂停原因
    dataFn(data) {
      let params = {
        id: this.operation.id, // 210124016 this.store.cardNumber
        name: data,
      };
      api.SuspendWork(params).then((res) => {
        console.log(res.data);
        if (!res.data.isSuccess) {
          return Notify({ type: "danger", message: res.data.message });
        } else {
          this.getList();
          return Notify({ type: "success", message: res.data.message });
        }
      });
      this.dialogVisible = false;
    },
    // 其他
    qitaFn() {
      let params = {
        id: this.operation.id, // 210124016 this.store.cardNumber
        name: this.qita,
      };
      api.SuspendWork(params).then((res) => {
        console.log(res.data);
        if (!res.data.isSuccess) {
          return Notify({ type: "danger", message: res.data.message });
        } else {
          this.getList();
          return Notify({ type: "success", message: res.data.message });
        }
      });
      this.dialogVisible = false;
    },
    // 报工
    reportingWorks() {
      if (!this.operation.hasOwnProperty("id")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$router.push({
        path: "/weavingReportingWork",
        query: {
          pObjs: this.operation,
        },
      });
    },
    // 报异常
    abnormal() {
      if (!this.operation.hasOwnProperty("id")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$router.push({
        path: "/weavingYc",
        query: {
          pObjs: this.operation,
        },
      });
    },
    // 开工
    kaigong() {
      if (!this.operation.hasOwnProperty("id")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$router.push({
        path: "/weavingStartsOk",
        query: {
          pObjs: this.operation,
        },
      });
    },
    // 配料AGV
    dosing() {},
    // 胚布AGV
    greige() {},
    // 呼叫对样
    fnder() {
      if (!this.operation.hasOwnProperty("id")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$router.push({
        path: "/weavingFnder",
        query: {
          pObjs: this.operation,
        },
      });
    },
    // 获取列表 (设备，状态)
    getList() {
      this.isD = false;
      let params = {
        hadUser: true,
        hadNumber: true,
        deviceID: this.store.sbInput,
        status: this.store.status,
        orderID: this.store.cardNumber,
      };
      api.GetProductionList(params).then((res) => {
        console.log(res.data);
        if (!res.data.isSuccess) {
          return Notify({ type: "danger", message: res.data.message });
        } else {
          this.list = res.data.data;
          this.lists = [];
        }
      });
    },
    // 获取列表 (任务书，流水)
    getLists() {
      // this.isD = true
      let params = {
        orderID: this.store.cardNumber, // 210124016 this.store.cardNumber
        orderNO: this.store.waters,
      };
      api.GetProductionList3(params).then((res) => {
        this.lists = res.data.data.productionZZSerials;
        this.lists.map((item) => {
          item.warpaxistypename = res.data.data.productionZZ.productName;
          item.orderNo = res.data.data.productionZZ.orderNo;
          item.btotalwarpnum = res.data.data.productionZZ.btotalwarpnum;
          item.sidewarpnum = res.data.data.productionZZ.sidewarpnum;
          item.planedquantity = res.data.data.productionZZ.planedquantity;
          item.productrollnum = res.data.data.productionZZ.productrollnum;
          item.stateId = res.data.data.productionZZ.stateId;
          item.ids = res.data.data.productionZZ.id;
        });
        this.list = [];
        console.log(this.lists);
      });
    },
    // 设备失去焦点
    sbBlur() {
      // this.store.cardNumber = ''
      this.store.waters = "";
      this.getList();
    },
    // 任务书号失去焦点
    renWu() {
      if (this.store.cardNumber.length > 0) {
        // this.store.sbInput = ''
        this.store.waters = "";
        this.getList();
        // this.getLists()
      }
    },
    // 流水号
    liuShui() {
      if (this.store.waters.length > 0) {
        this.store.sbInput = "";
        this.store.cardNumber = "";
        this.getLists();
      }
    },
    // 状态改变
    changeStatus() {
      // this.store.cardNumber = ''
      this.store.waters = "";
      this.getList();
    },
    // 缸号确认
    gangOK() {
      this.$router.push({
        path: "/weavingGang",
      });
    },
    // // 对样OK
    // oneOk(){
    //   let params = {
    //     id: this.operation.id
    //   };
    //   api.SubmitFirstS(params).then((res) => {
    //     if(res.data.isSuccess){
    //       Notify({type: 'success', message: res.data.message});
    //       this.getList()
    //     }else {
    //       Notify({type: 'danger', message: res.data.message});
    //     }
    //   })
    // },
    // // 对样NG
    // oneNG(){
    //   let params = {
    //     id: this.operation.id
    //   };
    //   api.SubmitFirstNG(params).then((res) => {
    //     console.log(res.data)
    //     if(res.data.isSuccess){
    //       Notify({type: 'success', message: res.data.message});
    //       this.getList()
    //     }else {
    //       Notify({type: 'danger', message: res.data.message});
    //     }
    //   })
    // },
    // 开工
    // kaigong() {
    //   // 如果this.operation有id证明选中单选框在执行其他操作
    //   if (!this.operation.hasOwnProperty("id")) {
    //     return Notify({ type: "danger", message: "请选择要操作的数据" });
    //   }
    //   let params = {
    //     isMaterial: true,
    //     equipmentID: 1,
    //     deviceID: this.operation.deviceid,
    //     id: this.operation.id,
    //   };
    //   api.SubmittedStart2(params).then((res) => {
    //     console.log(res.data);
    //     if (res.data.isSuccess) {
    //       Notify({ type: "success", message: res.data.message });
    //       this.getList();
    //     } else {
    //       Notify({ type: "danger", message: res.data.message });
    //     }
    //   });
    // },
    // 跳转设备绑定
    shebeiFn() {
      this.$router.push({
        path: "/weavingShebei",
      });
    },
    // 重新分配
    fenpeiFn() {
      this.$router.push({
        path: "/weavingFenPei",
      });
      // 如果this.operation有id证明选中单选框在执行其他操作
      // if(!this.operation.hasOwnProperty("id")){
      //   return Notify({type: 'danger', message: '请选择要操作的数据'});
      // }
      // this.$router.push({
      //   path: '/weavingOk',
      //   query: {
      //     pObjs: this.operation,
      //     pathObjs: {
      //       one: this.store.sbInput,
      //       two: this.store.cardNumber,
      //       three: this.store.waters,
      //     }
      //   }
      // })
    },
    // 异常
    toWeavingYc() {
      // 如果this.operation有id证明选中单选框在执行其他操作
      if (!this.operation.hasOwnProperty("id")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$router.push({
        path: "/weavingYc",
        query: {
          pObjs: this.operation,
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
    // 扫码获取任务书
    getrws() {
      this.orCodeType = "BC";
      this.locationLayer = true;
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    // 扫码获取流水号
    getlsh() {
      this.orCodeType = "DC";
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    // 多选变单选
    select(selection, row) {
      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection();
      }
      if (this.$refs.multipleTables) {
        this.$refs.multipleTables.clearSelection();
      }
      if (selection.length === 0) return;
      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
      if (this.$refs.multipleTables) {
        this.$refs.multipleTables.toggleRowSelection(row, true);
      }
      this.operation = row;
      console.log(this.operation);
    },
    // 全选禁用
    selectAll() {
      this.$refs.multipleTable.clearSelection();
      // this.$refs.multipleTables.clearSelection()
    },
    // 设置index
    getTabIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    // 点击行 row 当前行数据
    handleRow(row) {
      this.$router.push({
        path: "/weavingDetail",
        query: {
          pObjs: row,
          pathObjs: {
            one: this.store.sbInput,
            two: this.store.cardNumber,
            three: this.store.waters,
          },
        },
      });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      this.selectedIndex = val.index;
    },
    rowClass({ row, rowIndex }) {
      if (parseInt(this.selectedIndex) === rowIndex) {
        return {
          border: "solid 1px #3dffef!important",
          "background-color": "#f5f5f5",
        };
      }
    },

    // 关于扫码
    onceOR(data) {
      this.store.sbInput = data;
      // this.store.cardNumber = ''
      this.store.waters = "";
      this.getList();
    },
    twoOR(data) {
      this.store.cardNumber = data;
      // this.store.sbInput = ''
      this.getList();
    },
    multipleOR(data) {
      this.store.waters = data;
      // this.store.sbInput = ''
      // this.getLists()
    },
    endOrcodeWindow() {
      this.orCodeStaticVal = 1;
      this.orCodeValStatic = false;
    },
    layerEnd() {
      this.locationLayer = false;
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
.temBtn {
  width: 0 !important;
  background-color: dodgerblue;
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
      /*width: 60px;*/
      width: 23%;
      margin: 5px 5px 0 0;
    }
  }
  .search {
    margin-top: 15px;
    padding-bottom: 5px;
    border-bottom: 5px solid #f5f5f5;
    div {
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
      .ls3 {
        letter-spacing: 8px;
      }
      .ml3 {
        margin-left: -8px;
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
    padding-bottom: 50px;
    .el-table {
      margin-top: 8px;
    }
  }
  .loading {
    margin-top: 15px;
    display: flex;
  }
}
</style>
