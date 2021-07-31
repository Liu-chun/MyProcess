<template>
  <div class="box">
    <div class="tab">
      <el-table
        size="small"
        border
        :data="list"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="dark"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :reserve-selection="true"
          type="selection"
          width="40"
        >
        </el-table-column>
        <el-table-column
          prop="materialid"
          label="原料编码"
        >
        </el-table-column>
        <el-table-column
          prop="sequence"
          label="序号"
          width="51"
        >
        </el-table-column>
        <el-table-column
          prop="stockroom"
          label="库位"
        >
        </el-table-column>
        <el-table-column
          prop="instock"
          label="现有"
          width="51"
        >
        </el-table-column>
        <el-table-column
          label="需要"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.requiremtrquantity"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fenye"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
      <el-button class="btn" @click="go" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
  import {api} from "../../api";

  export default {
    name: "inventoryFiber",
    data(){
      return{
        page: 1,
        pageSize: 10,
        total: 0,
        multipleSelection: [],
        list: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 处理分页刷新，导致复选框被刷新掉
      getRowKeys(row) {
        return row.id;
      },
      getList(){
        let params = {
          pageIndex: this.page,
          isQueryType: true
        };
        api.MaterialGetList(params).then((res) => {
          console.log(res.data)
          this.list = res.data.data.dataList
          this.pageSize = res.data.data.pageSize
          this.total = res.data.data.dataCount
        })
      },
      handleCurrentChange(val) {
        this.page = val
        this.getList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      go(){
        this.$router.push({
          path: '/createFiber',
          query: {
            kcData: this.multipleSelection
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .box {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .tab{
      padding-bottom: 50px;
      .el-table{
        margin-top: 8px;
      }
      .fenye{
        text-align: center;
      }
      .btn{
        margin-top: 8px;
        width: 100%;
      }
    }
  }
</style>
