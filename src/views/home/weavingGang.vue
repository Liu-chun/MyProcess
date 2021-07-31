<template>
  <div class="box">
    <div class="btns">
      <el-button type="primary" @click="gangOK">缸号录入</el-button>
      <el-button type="primary" @click="fanhui">返回</el-button>
    </div>
    <div class="search">
      <div>
        <span v-html="'设&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备：'"></span>
        <el-input
          v-model="store.sbInput"
          @blur="sbBlur"
        >
          <template slot="append" class="temBtn">
            <el-button
              type="primary"
              @click="getsb"
            >
              扫码
            </el-button>
          </template>
        </el-input>
      </div>
      <div>
        <span>任务书号：</span>
        <el-input
          v-model="store.cardNumber"
          @blur="renWu"
        >
          <template slot="append" class="temBtn">
            <el-button
              type="primary"
              @click="getrws"
            >
              扫码
            </el-button>
          </template>
        </el-input>
      </div>
      <div>
        <span v-html="'状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：'"></span>
        <el-select v-model="store.status" placeholder="请选择" @change="changeStatus">
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
        ref="multipleTable"
        :data="list"
        :row-class-name="getTabIndex"
        style="width: 100%"
        :row-style="rowClass"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column
          type="selection"
        >
        </el-table-column>
        <el-table-column
          prop="taskNo"
          label="任务书号"
        >
        </el-table-column>
        <el-table-column
          prop="warpaxistypename"
          label="品名"
        >
        </el-table-column>
        <el-table-column
          prop="stateId"
          label="状态"
        >
          <template slot-scope="scope">
            <span v-show="scope.row.stateId === 0">{{scope.row.stateId === 0 ? '待生产' : null}}</span>
            <span v-show="scope.row.stateId === 1">{{scope.row.stateId === 1 ? '暂停中' : null}}</span>
            <span v-show="scope.row.stateId === 3">{{scope.row.stateId === 3 ? '已对样' : null}}</span>
            <span v-show="scope.row.stateId === 4">{{scope.row.stateId === 4? '生产中' : null}}</span>
            <span v-show="scope.row.stateId === 5">{{scope.row.stateId === 5 ? '生产已完工' : null}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    扫码-->
    <van-popup
      v-model="orCodeValStatic"
      position="right"
      :overlay="locationLayer"
      :class="locationLayer ? 'orBgcPop' :''"
    >
      <orCdeSingle
        :orType="orCodeType"
        :orCodeStatic="orCodeStaticVal"
        @onceOR="onceOR"
        @twoOR="twoOR"
        @endOrcodeWindow="endOrcodeWindow"
        @layerEnd="layerEnd"
      ></orCdeSingle>
    </van-popup>
  </div>
</template>

<script>
  import orCdeSingle from '../../components/orCode/orCodePD'
  import {api} from "../../api";
  import storage from "../../api/storage";
  import {Notify} from "vant";

  export default {
    name: "weavingGang",
    components: {
      orCdeSingle,
    },
    data(){
      return{
        // 带有流水号禁用上面按钮
        isD: false,
        // 关于扫码
        orCodeValStatic: false,
        locationLayer: true,
        orCodeType: '',
        orCodeStaticVal: -1,
        // 数据
        list: [],
        // 暂时未知
        currentRow: '',
        // 单选框对应当前行数据
        operation: {},
        selectedIndex: this.$route.query.row,
        store: {}
      }
    },
    // serialNum 流水号 带流水号的id 变成 ids
    created() {
      this.store = this.$store.state.weaving
      console.log(this.store)
    },
    mounted() {
      this.getList()
    },
    methods: {
      // 获取列表 (设备，状态)
      getList(){
        this.isD = false
        let params = {
          // true
          hadUser: false,
          hadNumber: false,
          deviceID: this.store.sbInput,
          orderID: this.store.cardNumber,
          status: this.store.status
        };
        api.GetProductionList(params).then((res) => {
          console.log(res.data)
          this.list = res.data.data
        })
      },
      // 设备失去焦点
      sbBlur(){
        this.store.cardNumber = ''
        this.store.waters = ''
        this.getList()
      },
      renWu(){
        if(this.store.cardNumber.length > 0){
          this.store.sbInput = ''
          this.getList()
        }
      },
      // 状态改变
      changeStatus(){
        this.getList()
      },
      // 缸号录入
      gangOK(){
        console.log(this.operation)
        // 如果this.operation有id证明选中单选框在执行其他操作
        if(!this.operation.hasOwnProperty("id")){
          return Notify({type: 'danger', message: '请选择要操作的数据'});
        }
        this.$router.push({
          path: '/weavingGangLR',
          query: {
            pObjs: this.operation,
          }
        })
      },
      fanhui(){
        this.$router.push({
          path: '/weaving',
        })
      },
      // 扫码获取设备
      getsb(){
        this.orCodeType = "YC";
        this.locationLayer = true;
        this.orCodeStaticVal = 2;
        this.orCodeValStatic = true;
      },
      // 扫码获取任务书
      getrws(){
        this.orCodeType = "BC";
        this.locationLayer = true;
        this.orCodeStaticVal = 2;
        this.orCodeValStatic = true;
      },
      // 多选变单选
      select(selection, row){
        this.$refs.multipleTable.clearSelection();
        if(selection.length === 0) return ;
        this.$refs.multipleTable.toggleRowSelection(row, true);
        this.operation = row
        console.log(this.operation)
      },
      // 全选禁用
      selectAll(){
        this.$refs.multipleTable.clearSelection()
      },
      // 设置index
      getTabIndex({row, rowIndex}){
        row.index = rowIndex;
      },
      handleCurrentChange(val){
        this.currentRow = val;
        this.selectedIndex= val.index;
      },
      rowClass({row, rowIndex}){
        if((parseInt(this.selectedIndex)) === rowIndex){
          return { "border": "solid 1px #3dffef!important","background-color": "#f5f5f5" }
        }
      },

      // 关于扫码
      onceOR(data) {
        this.store.sbInput = data
        this.store.cardNumber = ''
        this.store.waters = ''
        this.getList()
      },
      twoOR(data){
        this.store.cardNumber= data
        this.store.sbInput = ''
        this.getList()
      },
      endOrcodeWindow() {
        this.orCodeStaticVal = 1;
        this.orCodeValStatic = false;
      },
      layerEnd() {
        this.locationLayer = false;
      },
    }
  }
</script>

<style scoped lang="less">
  .van-popup--right {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .temBtn{
    width: 0!important;
    background-color: dodgerblue;
  }

  .box {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .btns{
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 5px;
      border-bottom: 5px solid #f5f5f5;
      .el-button{
        width: 110px;
        margin: 5px 5px 0 0;
      }
    }
    .search{
      margin-top: 15px;
      padding-bottom: 5px;
      border-bottom: 5px solid #f5f5f5;
      div{
        margin-top: 5px;
        span{
          margin-top: 5px;
          font-size: 18px;
        }
        .el-input{
          width: 250px;
        }
      }
    }
    .tab{
      padding-bottom: 50px;
      .el-table{
        margin-top: 8px;
      }
    }
  }
</style>
