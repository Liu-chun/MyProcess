<template>
  <div class="box">
    <div class="btns">
      <el-button type="primary" @click="maintain = true"
        >保养完成确认</el-button
      >
      <el-button type="primary" @click="$router.push('/equipmentM')"
        >设备维修</el-button
      >
    </div>
    <div class="search">
      <div>
        <span>设备码：</span>
        <el-input v-model="sbInput">
          <template slot="append" class="temBtn">
            <el-button type="primary" @click="getsb"> 扫码 </el-button>
          </template>
        </el-input>
      </div>
      <div>
        <span>设备责任人：</span>
        <el-select v-model="cardNumber" placeholder="请选择">
          <el-option
            v-for="item in options"
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
        @selection-change="handle_selectionChange"
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
        <el-table-column prop="date" label="设备责任人"> </el-table-column>
        <el-table-column prop="name" label="设备编码"> </el-table-column>
        <el-table-column prop="address" label="设备类型"> </el-table-column>
        <el-table-column prop="state" label="保养状态"> </el-table-column>
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
        @multipleOR="multipleOR"
        @endOrcodeWindow="endOrcodeWindow"
        @layerEnd="layerEnd"
      ></orCdeSingle>
    </van-popup>
    <!-- 保养 -->
    <el-dialog title="添加" :visible.sync="maintain" width="80%">
      <span>是否确认保养完成</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="maintain = false">取 消</el-button>
        <el-button type="primary" @click="maintainOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import orCdeSingle from "../../components/orCode/orCodePD";

export default {
  name: "equipment",
  components: {
    orCdeSingle,
  },
  data() {
    return {
      // 关于扫码
      orCodeValStatic: false,
      locationLayer: true,
      orCodeType: "",
      orCodeStaticVal: -1,
      //
      sbInput: "",
      cardNumber: "",
      status: "",
      currentRow: "",
      options: [
        {
          value: "选项1",
          label: "管理员",
        },
        {
          value: "选项2",
          label: "李华",
        },
        {
          value: "选项5",
          label: "刘志宏",
        },
      ],
      list: [
        {
          date: "刘志宏",
          name: "JZ034",
          address: "SWL808S",
          state: "待保养",
        },
        {
          date: "李华",
          name: "JZ001",
          address: "SWL808D",
          state: "待保养",
        },
        {
          date: "管理员",
          name: "JZ025",
          address: "SWL680D",
          state: "待保养",
        },
        {
          date: "管理员",
          name: "JZ028",
          address: "H32JMTT",
          state: "保养完成",
        },
        {
          date: "李华",
          name: "JZ026",
          address: "H64JMTT",
          state: "保养完成",
        },
      ],
      // 保养
      maintain: false,
    };
  },
  created() {},
  methods: {
    // 保养
    maintainOk(){
      this.maintain = false
    },
    // 扫码获取设备
    getsb() {
      this.orCodeType = "DC";
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    // 多选变单选
    select(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) return;
      this.$refs.multipleTable.toggleRowSelection(row, true);
      console.log(row);
      this.operation = row;
    },
    // 全选禁用
    selectAll() {
      this.$refs.multipleTable.clearSelection();
    },
    // 当选择项发生变化时会触发该事件，进行赋值
    handle_selectionChange(row) {
      this.selectedList = row;
    },
    // 设置index
    getTabIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    // 点击行 row 当前行数据
    handleRow(row) {
      console.log(row);
      this.$router.push({
        path: "/equipmentDetail",
        query: {
          pObjs: row,
        },
      });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      this.selectedIndex = val.index;
    },
    rowClass({ row, rowIndex }) {
      if (this.selectedIndex === rowIndex) {
        return {
          border: "solid 1px #3dffef!important",
          "background-color": "#cccccc",
        };
      }
    },
    //
    multipleOR(data) {
      this.sbInput = data;
    },
    // 扫码条件
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
    justify-content: space-around;
    padding-bottom: 5px;
    border-bottom: 5px solid #f5f5f5;
    margin-top: 5px;
  }
  .search {
    margin-top: 5px;
    padding-bottom: 5px;
    border-bottom: 5px solid #f5f5f5;
    div {
      margin-top: 5px;
      span {
        margin-top: 5px;
        font-size: 18px;
      }
      .el-input {
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
