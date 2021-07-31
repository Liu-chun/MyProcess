<template>
  <div class="box">
    <div class="p">
      <p>任务书号：{{renwuCard}}</p>
    </div>
    <div class="tab">
      <el-table
        size="small"
        border
        :data="list"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column
          prop="serialNum"
          label="流水号"
        >
        </el-table-column>
        <el-table-column
          prop="productionInputNumber"
          label="报工米数"
        >
        </el-table-column>
        <el-table-column
          prop="productionMachineNumber"
          label="数采米数"
        >
        </el-table-column>
        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <span v-show="scope.row.state === 0">{{scope.row.state === 0 ? '未报产' : null}}</span>
            <span v-show="scope.row.state === 1">{{scope.row.state === 1 ? '清零报产' : null}}</span>
            <span v-show="scope.row.state === 2">{{scope.row.state === 2 ? '换班报产' : null}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btn">
      <el-button type="primary" @click="go">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {api} from "../../api";

  export default {
    name: "weavingShui",
    data(){
      return{
        renwuCard: '',
        list: []
      }
    },
    created() {
      this.renwuCard = this.$route.query.pObjs
      this.getList()
    },
    methods: {
      getList(){
        let params = {
          orderID: this.renwuCard, // 210124016 this.store.cardNumber
        };
        api.GetProductionList3(params).then((res) => {
          console.log(res.data)
          this.list = res.data.data.productionZZSerials
        })
      },
      go(){
        this.$router.push({
          path: '/weaving',
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
    .p{
      margin: 10px 0;
      p{
        font-size: 16px;
      }
    }
    .btn{
      margin-top: 10px;
      float: right;
      padding-bottom: 55px;
    }
  }
</style>
