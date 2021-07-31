<template>
  <div class="box">
    <div class="btns">
      <el-button type="primary" style="opacity: 0">半成品入库</el-button>
      <el-button type="primary" @click="bcpOutStore">半成品出库</el-button>
    </div>
    <div class="search">
      <div class="div">
        <span class="span ls">流水号</span>
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
        <span class="span ls">仓<span style="opacity: 0">号</span>库</span>
        <span class="ml">：</span>
        <el-select
          v-model="store.status"
          placeholder="请选择仓库"
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
      <!-- <div class="div">
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
      </div> -->
    </div>
    <div class="data">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">订单号：</div>
        </el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">缸号：</div>
        </el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">已出库数量：</div>
        </el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">剩余库存数量：</div>
        </el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
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
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column prop="orderNo" width="70" label="订单号">
        </el-table-column>
        <el-table-column prop="productName" label="产品型号"> </el-table-column>
        <el-table-column prop="beamCardNo" label="任务号"> </el-table-column>
        <el-table-column prop="weavingName" label="流水号"> </el-table-column>
        <!-- <el-table-column label="状态">
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
        </el-table-column> -->
      </el-table>
    </div>
    <!-- 扫码 -->
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
    <!-- 出库 -->
    <el-dialog :visible.sync="outStore" width="90%">
      <span>XXXX流水号后整理方式不一致，是否确定要出库？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="outStore = false">取 消</el-button>
        <el-button type="primary" @click="outStoreOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import orCdeSingle from "../../../../components/orCode/orCodePD";
import { api } from "../../../../api";
import storage from "../../../../api/storage";
import { Notify } from "vant";
export default {
  name: "bcp",
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
      // 出库
      outStore: false,
      //   仓库
      sto: {},
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
        deviceID: this.store.sbInput,
        orderID: this.store.cardNumber,
        status: this.store.status,
      };
      api.ProductionQJGetList(params).then((res) => {
        console.log(res.data);
        this.list = res.data.data;
      });
    },
    // 状态改变
    changeStatus() {
      this.getList();
    },
    // 半成品入库
    // bcpIntoStore() {},
    // 半成品出库
    bcpOutStore() {
      this.outStore = true;
    },
    outStoreOk(){
      this.outStore = false
    },
    // 设备失去焦点
    sbBlur() {
      this.getList();
    },
    // 经轴卡号失去焦点

    // 开工

    // 工单调整

    // 完工

    // 异常

    // 扫码获取设备
    getsb() {
      this.orCodeType = "DC";
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    // 扫码获取经轴卡

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
    handleRow(row) {
      console.log(row);
      // this.$router.push({
      //   path: "/fiberDetail",
      //   query: {
      //     pObjs: row,
      //   },
      // });
    },
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
  .data {
    background-color: #f5f5f5;
    font-size: 16px;
    line-height: 2em;
  }
  .btns {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    // padding-bottom: 5px;
    padding: 20px 0;
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
}
</style>
