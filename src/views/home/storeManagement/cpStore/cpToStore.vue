<template>
  <div class="box">
    <!-- <div class="btns"> -->
    <!--      <el-button type="primary" @click="$router.push('/createFiber')">创建</el-button>-->

    <!-- <el-button type="primary" @click="workOrder">工单调整</el-button> -->
    <!-- <el-button type="primary" @click="kaigong">开工</el-button> -->
    <!--      <el-button type="primary" @click="$router.push('/move')">挪料</el-button>-->
    <!-- <el-button type="primary" @click="tofiberOk">报工</el-button> -->
    <!-- <el-button type="primary" @click="tofiberYc">报异常</el-button> -->
    <!-- </div> -->
    <div class="search">
      <div class="div">
        <span class="span ls">流水号</span>
        <span class="ml">：</span>
        <el-input
          v-model="store.waters"
          placeholder="请扫描流水号"
          @blur="lshBlur"
          @keyup.enter.native="lshBlur"
          ref="int"
        >
          <template slot="append" class="temBtn">
            <el-button type="primary" @click="getlsh"> 确定 </el-button>
          </template>
        </el-input>
      </div>
      <!-- <div class="div">
        <span class="span ls">仓库</span>
        <span class="ml">：</span>
        <el-select
          v-model="store.status"
          placeholder="请选择"
          @change="changeStatus(store.status)"
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
    <div class="tab">
      <el-table
        border
        @row-click="handleRow"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        :data="list"
        :row-class-name="getTabIndex"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column prop="BATCHNO" label="流水号"> </el-table-column>
        <el-table-column prop="MATERIALID" label="产品型号"> </el-table-column>
        <el-table-column
          prop="QUANTITY"
          width="60"
          label="净米"
        ></el-table-column>                                                                     
        <el-table-column fixed="right" label="操作" width="60">
          <template slot-scope="scope">
            <el-button
              @click.native.stop.prevent="deleteRow(scope.$index, list)"
              type="text"
              size="small"
              style="width: 100%"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table> 
      <div class="btn" v-if="list.length > 0">
        <el-button type="primary" size="small" @click="change">修改</el-button>
        <el-button type="primary" size="small" @click="submit">提交</el-button>
      </div>
    </div>   

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
import orCdeSingle from "../../../../components/orCode/orCodePD";
import { api } from "../../../../api";
import storage from "../../../../api/storage";
import localStorage from "../../../../api/localStorage";
import { Notify } from "vant";
export default {
  name: "cpIntoStore",
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
      //  用户
      user: localStorage.getUser(),
      // 暂时未知
      selectedIndex: this.$route.query.row,
      // 搜索条件在 vuex
      store: {},
      // 选中
      selection: [],
    };
  },
  created() {
    this.store = this.$store.state.weaving;
    let data = storage.getList();
    if (data.length > 0) {
      this.list = data;
    }  
  },
  components: {
    orCdeSingle,
  },
  methods: {
    // 移除
    deleteRow(index, rows) {
      if (!this.selection.length > 0) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      if (index >= 0) {
        rows.splice(index, 1);
      }
    },
    // 修改
    change() {
      if (!this.selection.length > 0) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      this.$prompt("输入净米", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "number",
        inputPattern: /^\d{2}$/,
      })
        .then(({ value }) => {
          this.selection.map((item) => {
            for (let i = 0; i < this.list.length; i++) {
              2;
              this.list[item.index].QUANTITY = parseInt(value);
            }
          });
          storage.saveList(this.list);
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "取消输入",
          });
        });
    },
    // 全选
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 流水号失去焦点
    lshBlur() {
      this.$refs.int.blur();
      let params = {
        Page: 1, 
        PageSize: 20,
        Entity: this.store.waters,
      };
      if (this.store.waters !== "") {
        api.getproductstockoutdata(this.$qs.stringify(params)).then((res) => {
          console.log(res.data);
          let data = res.data.Entities;
          if (res.data.Success === false) {
            return Notify({ type: "danger", message: res.data.Message });
          } else {
            this.list.push({
              BATCHNO: data[0].BATCHNO,
              CIMI: data[0].CIMI,
              MAOMI: data[0].MAOMI,
              MATERIALID: data[0].MATERIALID,
              QUANTITY: data[0].QUANTITY,
              RESERVEDNO1: data[0].RESERVEDNO1,
              SUBBATCHNO: data[0].SUBBATCHNO,
              WAREHOUSEID: data[0].WAREHOUSEID,
              STORAGEID: data[0].STORAGEID,
            });
            storage.saveList(this.list);
          }
        });
      }
      this.store.waters = "";
    },
    // 提交
    submit() {
      if (!this.selection.length > 0) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      let StkProductStockOutDetails = [];
      this.selection.map((item, index) => {
        if (item.WAREHOUSEID === null) {
          item.WAREHOUSEID = "002";
        }
        StkProductStockOutDetails.push({
          Row_Id: index + 1,
          RESERVEDNO1: item.RESERVEDNO1,
          WarehouseId: item.WAREHOUSEID,
          StorageId: item.STORAGEID,
          BatchNo: item.BATCHNO,
          MaterialId: item.MATERIALID,
          SUBBATCHNO: item.SUBBATCHNO,
          Quantity: item.QUANTITY,
        });
      });
      let params = {
        PersonId: this.user.PersonId,
        CreatorId: this.user.PersonId,
        StkProductStockOutDetails: [...StkProductStockOutDetails],
      };
      console.log(params);
      api.addstkproductstockout(this.$qs.stringify(params)).then((res) => {
        console.log(res);
        if (res.data.Success === false) {
          return Notify({ type: "danger", message: res.data.Message });
        } else {
          this.list = [];
          storage.removeList();
          return Notify({ type: "success", message: res.data.Message });
        }
      });
    },
    // 去详情
    handleRow(row) {
      this.$router.push({
        path: "/cpToStoreDetail",
        query: {
          pObjs: row,
        },
      });
    },

    // 扫码获取流水号
    getlsh() {
      this.orCodeType = "DC";
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    // *扫码
    onceOR(data) {
      // this.store.sbInput = data;
      this.store.waters = "";
      // this.$store.commit("fiberUpdataSbInput", data);
      this.lshBlur();
    },
    // 扫码成功执行函数
    multipleOR(data) {
      this.store.waters = data;
      // this.$store.commit("fiberUpdataCardNum", data);
      this.lshBlur();
    },
    // 扫码条件
    endOrcodeWindow() {
      this.orCodeStaticVal = 1;
      this.orCodeValStatic = false;
    },
    layerEnd() {
      this.locationLayer = false;
    },
    // 设置index
    getTabIndex({ row, rowIndex }) {
      row.index = rowIndex;
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
      // margin: 5px 5px 0 0;
    }
  }
  .search {
    width: 100%;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 5px solid #f5f5f5;
    .div {
      margin-top: 5px;
      span {
        font-size: 18px;
      }
      .span {
        margin-top: 5px;
      }
      //   .ls {
      //     letter-spacing: 3px;
      //   }
      //   .ml {
      //     margin-left: -35px;
      //   }
      .el-input,
      .el-select {
        width: 250px;
      }
    }
  }
  .tab {
    overflow: hidden;
    .el-table {
      margin-top: 8px;
      .el-button--text {
        color: #ff6700;
      }
    }
    .btn {
      float: right;
      margin-top: 30px;
      padding-bottom: 50px;

      // margin-right: 30px;
      .el-button {
        margin-left: 30px;
      }
    }
  }
}
</style>

<style>
.el-message-box {
  width: 100%;
}
.el-message {
  top: 0 !important;
}
</style>
