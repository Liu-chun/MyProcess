<template>
  <div class="box">
    <div class="btns">
      <el-badge :value="zcNum">
        <el-button type="primary" size="small" @click="$router.push('/promptZc')">
          正常提示
        </el-button>
      </el-badge>
      <el-badge :value="yjNum">
        <el-button type="primary" size="small" disabled>预警提示</el-button>
      </el-badge>
      <el-badge :value="ycNum">
        <el-button type="primary" size="small" @click="$router.push('/promptYc')">
          任务提示
        </el-button>
      </el-badge>
    </div>
    <div class="tab">
      <el-table
        border
        @row-click="handleRow"
        :data="list"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column
          prop="aa"
          label="推送人"
        >
        </el-table-column>
        <el-table-column
          prop="bb"
          label="推送消息"
        >
        </el-table-column>
        <el-table-column
          prop="cc"
          label="状态"
        >
        </el-table-column>
      </el-table>
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
  import storage from "../../api/storage";
  import {api} from "../../api";

  export default {
    name: "promptYj",
    data(){
      return{
        zcNum: '',
        yjNum: '',
        ycNum: '',
        page: 1,
        pageSize: 10,
        total: 0,
        list: []
      }
    },
    created() {
      this.getNum()
      this.getList()
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
      getList(){
        let params = {
          pageIndex: this.page,
          messageType: 2,
          userID: storage.getUser().users.id
          // userID: 16
        };
        api.GetMessageList(params).then((res) => {
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
      // 点击行 row 当前行数据
      handleRow(row){
        console.log(row)
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
    .tab{
      .el-table{
        margin-top: 8px;
      }
    }
    .el-pagination{
      text-align: center;
      padding-bottom: 50px;
      margin-top: 10px;
    }
  }
</style>
