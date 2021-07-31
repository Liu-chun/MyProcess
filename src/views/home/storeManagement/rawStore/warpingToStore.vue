<template>
  <div class="box">
    <div class="search">
      <el-row>
        <el-col :span="24">
          <div class="div">
            <span class="span">经轴卡号：</span>
            <el-input
              v-model="currentRow"
              placeholder="请扫描经轴卡"
              ref="lsh"
              size="small"
              @keyup.enter.native="confirmFn"
            >
              <template slot="append">
                <el-button type="primary" size="small">扫码</el-button>
              </template>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="div">
            <span class="span">整经户：</span>
            <el-input
              v-model="pObj.SUPPLIERID"
              placeholder="请输入整经户"
              size="small"
              disabled
            >
            </el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="div">
            <span class="span ls">机台：</span>
            <el-input
              v-model="pObj.WARPDEVICEID"
              placeholder="请输入机台"
              ref="storeLocation"
              size="small"
              disabled
            >
            </el-input>
          </div>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <div class="div">
            <span class="span">仓<span style="opacity: 0">库</span>库：</span>
            <el-select
              v-model="store.status"
              placeholder="请选择"
              @change="changeStatus(store.status)"
              size="small"
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
        </el-col>
        <el-col :span="12"> </el-col>
      </el-row> -->
      <!-- <div class="div">
        <span class="span ls">流水号</span>
        <span class="ml">：</span>
        <el-input
          v-model="store.waters"
          placeholder="请扫描流水号"
          @blur="lshBlur"
          @keyup.enter.native="lshBlur"
          ref="int"
        >
        </el-input>
      </div>
      <div class="div">
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
    <!-- <div class="ma">
      <el-row>
        <el-col :span="8">
          <span class="span">缓存区库位码：</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="storagema" placeholder="请输入内容" size="small">
            <template slot="append">
              <el-button type="primary" size="small">扫码</el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span class="span">扫物料条码：</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="materialma" placeholder="请输入内容" size="small">
            <template slot="append">
              <el-button type="primary" size="small">扫码</el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>
    </div> -->
    <div class="tab">
      <el-table
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        :data="list"
        :row-class-name="getTabIndex"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column prop="MATERIALID" label="原料编码"> </el-table-column>
        <el-table-column prop="WAITCOLLECTED" label="待领数量">
        </el-table-column>
        <el-table-column prop="QUANTITY" label="领用数量">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.val"
              type="text"
              size="small"
              style="width: 100%"
              @blur="lyblur(scope.row)"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.stop.prevent="detail(scope.row, list)"
              type="text"
              size="small"
              style="width: 100%"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn">
        <el-col :span="11"
          ><el-button type="primary" size="small" @click="submit"
            >保存（呼叫AGV）</el-button
          ></el-col
        >
        <el-col :span="11"
          ><el-button
            type="primary"
            size="small"
            @click="$router.push('/rawStore')"
            >取消</el-button
          ></el-col
        >
      </div>
    </div>
    <el-dialog :visible.sync="details" width="98%">
      <el-table
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        :data="detailList"
        :row-class-name="getTabIndex"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column prop="MATERIALID" label="原料" width="120">
        </el-table-column>
        <el-table-column prop="WAREHOUSEID" label="仓库" width="65">
        </el-table-column>
        <el-table-column prop="STORAGEID" label="货位" width="60">
        </el-table-column>
        <el-table-column prop="SUBBATCHNO" label="缸号 " width="60">
        </el-table-column>
        <el-table-column prop="QUANTITY" label="数量" width="60">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="details = false">取 消</el-button>
        <el-button type="primary" @click="details = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <van-popup
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
    </van-popup> -->
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
      pObj: {},
      // 经轴卡号
      currentRow: "",
      // 单选框对应当前行数据
      operation: {},
      selectedIndex: this.$route.query.row,
      // 搜索条件在 vuex
      store: {},
      // 库位
      storeLocation: {
        WarehouseId: null,
        StorageId: null,
        kw: null,
      },
      // 供应商
      supplier: "",
      // 操作员
      operator: "",
      // 用户
      user: localStorage.getUser(),
      // 选中
      selection: [],
      // 物料码
      materialma: "",
      // 库位码
      storagema: "",
      //   详情
      detailList: [],
      details: false,
      // 领用类型
      collectType: false,
      // 待领
      waitCollected: "",
      lists: [],
      rowObj: {},
    };
  },
  created() {
    this.store = this.$store.state.weaving;
    console.log(this.store);
    let data = storage.getLists();
    if (data.length > 0) {
      this.list = data;
    }
  },
  components: {
    orCdeSingle,
  },
  methods: {
    //   获取数据
    confirmFn() {
      this.$refs.lsh.blur();
      let params = {
        Code: this.currentRow,
      };
      api.getwarpdata(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        if (res.data.Success === false) {
          return Notify({ type: "danger", message: res.data.Message });
        } else {
          this.list = res.data.Enttity.MaterialData;
          this.pObj = res.data.Enttity;
          this.list.map((item) => {
            this.$set(
              item,
              "WAITCOLLECTED",
              item.NEEDQUANTITY - item.GETQUANTITY
            );
          });
          if (res.data.Enttity.PICKTYPE == 0) {
            this.collectType = false;
          } else if (res.data.Enttity.PICKTYPE == 1) {
            this.collectType = true;
          }
        }
      });
    },
    lyblur(row) {
      console.log(row);
      this.rowObj = row;
    },
    // 仓管员
    changeStatus(val) {
      console.log(val);
    },
    // 供应商
    supplierblur() {},
    // 操作员
    operatorblur() {},
    // 去详情
    detail(row) {
      this.details = true;
      this.detailList = row.MaterialDetailList;
    },
    // 全选
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 提交
    submit() {
      let StkProductStockInDetails = [];
      this.detailList.forEach((item, index) => {
        StkProductStockInDetails.push({
          ROW_ID: index + 1,
          MATERIALID: item.MATERIALID,
          WAREHOUSEID: item.WAREHOUSEID,
          STORAGEID: item.STORAGEID,
          SUBBATCHNO: item.SUBBATCHNO,
          QUANTITY: this.rowObj.val,
          UNITID: item.UNITID,
          HAVEQUANTITY: 0,
          NEEDQUANTITY: 0,
          GETQUANTITY: 0,
        });
      });
      let params = {
        WARPNO: this.currentRow,
        PICKTYPE: this.collectType,
        SUPPLIERID: this.pObj.SUPPLIERID,
        WARPDEVICEID: this.pObj.WARPDEVICEID,
        PERSONID: this.pObj.PERSONID,
        MaterialDetailData: StkProductStockInDetails,
      };
      console.log(params);
    },
    // 异常
    // 设置index
    getTabIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
  },
};
</script>


<style scoped lang="less">
@deep:~ '>>>';
.van-popup--right {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.box {
  @{deep} .el-dialog__body {
    padding: 0;
    padding-top: 20px;
  }
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
    padding-bottom: 15px;
    border-bottom: 5px solid #f5f5f5;

    .div {
      display: flex;
      align-items: center;
      margin-top: 10px;
      span {
        font-size: 16px;
      }
      .span {
        margin-top: 5px;
        // width: 65%;
        white-space: nowrap;
      }
      .ls {
        margin-left: 5px;
      }
      //   .ls {
      //     letter-spacing: 3px;
      //   }
      //   .ml {
      //     margin-left: -35px;
      //   }
      //   .el-input,
      //   .el-select {
      //     width: 250px;
      //   }
    }
  }
  .ma {
    width: 100%;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 5px solid #f5f5f5;
    .el-row {
      display: flex;
      align-items: center;
      margin-top: 10px;
      img {
        width: 100px;
        height: 40px;
      }
    }
    .span {
      font-size: 16px;
    }
  }
  .tab {
    // padding-bottom: 50px;
    .el-table {
      margin-top: 8px;
      .el-button--text {
        color: #ff6700;
      }
    }
    .btn {
      display: flex;
      justify-content: space-around;
      //   float: right;
      margin-top: 30px;
      //   margin-right: 30px;
      padding-bottom: 50px;
      button {
        width: 100%;
      }
    }
  }
}
</style>
