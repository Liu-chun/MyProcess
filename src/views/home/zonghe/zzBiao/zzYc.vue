<template>
  <div class="box">
    <div class="search">
      <div class="div">
        <span class="span">提报人：</span>
        <el-select
          v-model="tNameId"
          placeholder="请选择"
          @change="changeCard"
          filterable
          clearable
        >
          <el-option
            v-for="item in tNameArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="div">
        <span class="span">接收人：</span>
        <el-select
          v-model="jNameId"
          placeholder="请选择"
          @change="changeName"
          filterable
          clearable
        >
          <el-option
            v-for="item in jNameArr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="tab">
      <el-table
        :data="list"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="异常ID"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="提报人"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="接收人"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="处理时长"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="btn">
      <el-button type="primary" @click="tozz">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {api} from "../../../../api";

  export default {
    name: "zzYc",
    data(){
      return{
        // 提报人
        tNameId: '',
        tNameArr: [],
        // 接收人
        jNameId: '',
        jNameArr: [],
        list: []
      }
    },
    created() {
      this.getList()
      this.getName()
      this.getCard()
    },
    methods:{
      getList(){

      },
      getCard(){

      },
      getName(){
        api.GetQJUsers().then((res) => {
          console.log(res.data)
        })
      },
      changeCard(){
        this.getList()
      },
      changeName(){
        this.getList()
      },
      tozz(){
        this.$router.push({
          path: '/zzBiao'
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
    .search{
      width: 100%;
      margin-top: 15px;
      padding-bottom: 5px;
      border-bottom: 5px solid #f5f5f5;
      .div{
        margin-top: 5px;
        .span{
          margin-top: 5px;
          font-size: 18px;
        }
      }
    }
    .tab{
      margin-top: 8px;
    }
    .btn{
      padding-bottom: 55px;
      .el-button{
        width: 80%;
        margin-left: 10%;
        margin-top: 8px;
      }
    }
  }
</style>
