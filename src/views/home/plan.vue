<template>
  <div class="box">
    <div class="search">
      <div>
        <span>订单号：</span>
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
      <div>
        <span>品名：</span>
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
      <div>
        <span>状态：</span>
        <el-select v-model="status" placeholder="请选择">
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
        <el-table-column
                type="selection"
        >
        </el-table-column>
        <el-table-column
                prop="date"
                label="计划单号"
        >
        </el-table-column>
        <el-table-column
                prop="name"
                label="物料名称"
        >
        </el-table-column>
        <el-table-column
                prop="address"
                label="状态"
        >
        </el-table-column>
      </el-table>
      <el-button class="btn">确定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "plan",
    data(){
      return{
        sbInput: '',
        cardNumber: '',
        status: '',
        list: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '1516 弄'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
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
        if(row.ProductionStatus === 1 || row.ProductionStatus === 2){
          this.isdis = false
        }else {
          this.isdis = true
        }
        if(this.operation.ProductionStatus === 1 || this.operation.ProductionStatus === 3){
          this.isOk = true
        }else {
          this.isOk = false
        }
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
        this.$router.push({
          path: '/planDetail'
        })
      },
      handleCurrentChange(val){
        this.currentRow = val;
        this.selectedIndex= val.index;
      },
      rowClass({row, rowIndex}){
        if((this.selectedIndex) === rowIndex){
          // return { "background-color": "rgba(185, 221, 249, 0.75)" }
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
        display: flex;
        align-items: center;
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
      margin-bottom: 50px;
      .el-table{
        margin-top: 8px;
      }
      .btn{
        margin-top: 8px;
        float: right;
      }
    }
  }
</style>
