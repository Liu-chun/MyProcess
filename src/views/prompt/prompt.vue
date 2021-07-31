<template>
  <div class="box">
    <div class="btns">
      <el-button type="primary" size="small" @click="$router.push('/promptZc')">正常提示</el-button>
      <el-button type="primary" size="small">预警提示</el-button>
      <el-button type="primary" size="small" @click="$router.push('/promptYc')">异常提示</el-button>
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
        <el-table-column
          type="selection"
        >
        </el-table-column>
        <el-table-column
          prop="cc"
          label="消息编号"
        >
        </el-table-column>
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
        <!-- <el-table-column
          prop="cc"
          label="状态"
        >
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "prompt",
    data(){
      return{
        list: [{
          aa: 123,
          bb: 456,
          cc: 789,
        },{
          aa: 13,
          bb: 46,
          cc: 79,
        }]
      }
    },
    created() {

    },
    methods: {
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
      // 当选择项发生变化时会触发该事件，进行赋值
      handle_selectionChange(row) {
        this.selectedList =row;
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
    .tab{
      padding-bottom: 50px;
      .el-table{
        margin-top: 8px;
      }
    }
  }
</style>
