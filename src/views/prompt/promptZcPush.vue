<template>
  <div class="box">
    <div class="search">
      <div>
        <span>处理人：</span>
        <el-select
          v-model="nameId"
          placeholder="请选择处理人"
          filterable
          clearable
          @change="changeName"
        >
          <el-option
            v-for="item in nameArr"
            :key="item.id"
            :label="item.names"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <span>状态：</span>
        <el-select v-model="status" placeholder="请选择状态" filterable clearable @change="changeName">
          <el-option
            v-for="item in statusArr"
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
        size="small"
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
          prop="handleUser"
          label="处理人"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="reason"
          label="推送消息"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
        >
        </el-table-column>
      </el-table>
    </div>

    <div class="btns">
      <el-button type="primary" size="small" @click="chuliOK" :disabled="isdis">处理OK</el-button>
      <el-button type="primary" size="small" @click="chuliNG" :disabled="isdis">处理NG</el-button>
      <el-button type="primary" size="small" @click="toYc">返回</el-button>
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
  import {Notify} from "vant";
  import storage from "../../api/storage";
  import {api} from "../../api";

  export default {
    name: "promptZcPush",
    data(){
      return{
        nameId: '',
        nameArr: [],
        status: '',
        statusArr: [{
          value: 0,
          label: '未接受未处理'
        },{
          value: 2,
          label: '已接受未处理'
        },{
          value: 1,
          label: '已处理待确认'
        },{
          value: 3,
          label: '已确认合格'
        },{
          value: 4,
          label: '已回退'
        }],
        list: [],
        page: 1,
        pageSize: 10,
        total: 0,
        operation: {},
        isdis: true
      }
    },
    created() {
      this.getList()
      this.getName()
    },
    methods: {
      changeName(){
        this.getList()
      },
      getName(){
        api.GetAllList().then((res) => {
          this.nameArr = res.data.data
        })
      },
      getList(){
        let params = {
          pageIndex: this.page,
          messageType: 2,
          handleUser: this.nameId,
          stateId: this.status,
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
        this.page = newpage
        this.getList()
      },
      toYc(){
        this.$router.push({
          path: '/promptYc'
        })
      },
      // 处理ok
      chuliOK(){
        if(!this.operation.hasOwnProperty("id")){
          return Notify({type: 'danger', message: '请选择要操作的数据'});
        }
        let params = {
          id: this.operation.id
        };
        api.ConfirmInformationOK(params).then((res) => {
          if(res.data.isSuccess){
            this.getList()
            return Notify({type: 'success', message: res.data.message});
          }else {
            this.getList()
            return Notify({type: 'danger', message: res.data.message});
          }
        })
      },
      // 处理ng
      chuliNG(){
        if(!this.operation.hasOwnProperty("id")){
          return Notify({type: 'danger', message: '请选择要操作的数据'});
        }
        let params = {
          id: this.operation.id
        };
        api.ConfirmInformationNG(params).then((res) => {
          if(res.data.isSuccess){
            this.getList()
            return Notify({type: 'success', message: res.data.message});
          }else {
            this.getList()
            return Notify({type: 'danger', message: res.data.message});
          }
        })
      },
      // 多选变单选
      select(selection, row){
        this.$refs.multipleTable.clearSelection();
        if(selection.length === 0) return ;
        this.$refs.multipleTable.toggleRowSelection(row, true);
        this.operation = row
        console.log(this.operation)
        // 根据当前数据状态禁用处理按钮
        if(this.operation.state === '已处理待确认'){
          this.isdis = false
        }else {
          this.isdis = true
        }
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
      .el-table{
        margin-top: 8px;
      }
    }
    .btns {
      display: flex;
      justify-content: space-around;
      padding-bottom: 10px;
      .el-button{
        width: 250px;
        margin-top: 10px;
      }
    }
    .el-pagination{
      text-align: center;
      padding-bottom: 55px;
    }
  }
</style>
