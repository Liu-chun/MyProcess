<template>
  <div class="box">
    <div class="btns">
      <el-badge :value="zcNum">
        <el-button type="primary" size="small" @click="$router.push('/promptZc')">
          正常提示
        </el-button>
      </el-badge>
      <el-badge :value="yjNum">
        <el-button type="primary" size="small" @click="$router.push('/promptYj')">
          预警提示
        </el-button>
      </el-badge>
      <el-badge :value="ycNum">
        <el-button type="primary" size="small" disabled>任务提示</el-button>
      </el-badge>
    </div>
    <div class="btns">
      <el-button type="primary" size="small" @click="dChuliFn">待我处理消息</el-button>
      <el-button type="primary" size="small" @click="$router.push('/promptZcPush')">
        我推送的消息
      </el-button>
      <el-button type="primary" size="small" @click="chuliFn">我已处理消息</el-button>
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
        <el-table-column
          type="selection"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="消息编号"
        >
        </el-table-column>
        <el-table-column
          prop="sendUser"
          label="推送人"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="reason"
          label="推送消息"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="state"
          label="状态"
        >
        </el-table-column> -->
      </el-table>
    </div>

    <div class="btnJ" v-show="isChuLi">
      <el-button type="primary" size="small" @click="jieFn">接收</el-button>
      <el-button type="primary" size="small" @click="toWith">任务处理</el-button>
    </div>
    <el-pagination
      background
      @current-change="handleChange"
      :current-page.sync="page"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
  import {api} from "../../api";
  import storage from "../../api/storage";
  import {Notify} from "vant";

  export default {
    name: "promptYc",
    data(){
      return{
        page: 1,
        pageSize: 10,
        total: 0,
        list: [],
        zcNum: '',
        yjNum: '',
        ycNum: '',
        operation: {},
        isChuLi: true
      }
    },
    created() {
      this.getNum()
      this.getList(2)
    },
    methods: {
      // 提示条数
      getNum(){
        let params = {
          userID: storage.getUser().users.id
        };
        api.GetMessageCount(params).then((res) => {
          console.log(res.data)
          this.zcNum = res.data.data.normalCount
          this.yjNum = res.data.data.warnCount
          this.ycNum = res.data.data.abnormalCount
          // if(this.num === 0){
          //   this.num = ''
          // }
        })
      },
      getList(num){
        console.log(this.page);
        let params = {
          pageIndex: this.page,
          messageType: num,
          userID: storage.getUser().users.id
        };
        api.GetAbnormalList(params).then((res) => {
          console.log(res.data)
          this.list = res.data.data.dataList
          this.pageSize = res.data.data.pageSize
          this.total = res.data.data.dataCount
        })
      },
      // 分页
      handleChange(newpage){
        console.log(newpage);
        this.page = newpage
        this.getList(2)
      },
      // 接收
      jieFn(){
        let params = {
          id: this.operation.id
        };
        api.ReceiveInformation(params).then((res) => {
          if(res.data.isSuccess){
            this.getNum()
            this.getList(1)
            return Notify({type: 'success', message: res.data.message});
          }else {
            return Notify({type: 'danger', message: res.data.message});
          }
        })
      },
      dChuliFn(){
        this.getList(1)
        this.isChuLi = true
      },
      chuliFn(){
        this.getList(3)
        this.isChuLi = false
      },
      // 跳转异常处理
      toWith(){
        if(!this.operation.hasOwnProperty("id")){
          return Notify({type: 'danger', message: '请选择要操作的数据'});
        }
        this.$router.push({
          path: '/promptYcWith',
          query: {
            pObjs: this.operation
          }
        })
      },
      // 多选变单选
      select(selection, row){
        this.$refs.multipleTable.clearSelection();
        if(selection.length === 0) return ;
        this.$refs.multipleTable.toggleRowSelection(row, true);
        console.log(row)
        this.operation = row
      },
      // 全选禁用
      selectAll(){
        this.$refs.multipleTable.clearSelection()
      },
      // 设置index
      getTabIndex({row, rowIndex}){
        row.index = rowIndex;
      },
      // 点击行 row 当前行数据
      handleRow(row){
        console.log(row)
      },
      handleCurrentChange(val){
        this.currentRow = val;
        this.selectedIndex= val.index;
      },
      rowClass({row, rowIndex}){
        if((parseInt(this.selectedIndex)) === rowIndex){
          return { "border": "solid 1px #3dffef!important","background-color": "#cccccc" }
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .box {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .btns{
      display: flex;
      justify-content: space-around;
      margin-top: 5px;
      padding-bottom: 5px;
      border-bottom: 5px solid #f5f5f5;
    }
    .el-pagination{
      text-align: center;
      margin: 10px 0;
      padding-bottom: 60px;
    }
    .btnJ{
      display: flex;
      justify-content: space-around;
      margin-top: 5px;
    }
    .tab{
      padding-bottom: 5px;
      .el-table{
        margin-top: 8px;
      }
    }
  }
</style>
