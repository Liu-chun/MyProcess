<template>
  <div class="box">
    <div class="top">
      <ul>
        <li>任务书号：{{pObjs.taskNo}}</li>
      </ul>
    </div>
    <div class="bom">
      <div class="search">
        <div class="div">
          <span class="span">机台：</span>
          <el-select v-model="jitaiId" placeholder="请选择" filterable clearable>
            <el-option
              v-for="item in jitaiArr"
              :key="item.code"
              :label="item.code"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
<!--        <div class="div">-->
<!--          <span class="span">人员：</span>-->
<!--          <el-select-->
<!--            v-model="nameId"-->
<!--            placeholder="请选择"-->
<!--            filterable-->
<!--            clearable-->
<!--            @change="toggleName(nameId,nameArr)"-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="item in nameArr"-->
<!--              :key="item.id"-->
<!--              :label="item.name"-->
<!--              :value="item.id"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </div>-->
      </div>
      <div class="btns">
        <el-button type="primary" @click="yes">确定</el-button>
        <el-button type="primary" @click="no">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {api} from "../../api";
  import storage from "../../api/storage";
  import {Notify} from "vant";

  export default {
    name: "weavingOk",
    data(){
      return{
        // 机台
        jitaiId: '',
        jitaiArr: [],
        // 人员
        name: '',
        nameId: '',
        nameArr: [],
        pObjs: {},
      }
    },
    created() {
      this.getJT()
      // this.getName()
      this.pObjs = this.$route.query.pObjs
      this.jitaiId = this.$route.query.pObjs.deviceid
    },
    methods: {
      toggleName(id,arr){
        arr.map(item=>{
          if(item.id === id){
            this.name = item.name
          }
        })
      },
      getJT(){
        let params = {
          pageIndex: 0,
          typeId: 2
        };
        api.GetListJT(params).then((res) => {
          this.jitaiArr = res.data.data.dataList
        })
      },
      // getName(){
      //   let params = {
      //     pageIndex: 0,
      //     id: 71
      //   };
      //   api.GetZZUser(params).then((res) => {
      //     this.nameArr = res.data
      //   })
      // },
      yes(){
        this.pObjs.deviceid = this.jitaiId
        // this.pObjs.productionWorkersUsersID = this.nameId
        // this.pObjs.productionWorkersName = this.name
        let params = this.pObjs
        api.SubmitUser(params).then((res) => {
          if(res.data.isSuccess){
            this.$router.push({
              path: '/weavingFenPei',
              query: {
                row: this.$route.query.pObjs.index,
              }
            })
            return Notify({type: 'success', message: res.data.message});
          }else {
            return Notify({type: 'danger', message: res.data.message});
          }
        })
      },
      no(){
        this.$router.push({
          path: '/weavingFenPei',
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
    .top{
      margin-top: 5px;
      .title{
        width: 100%;
        height: 40px;
        background-color: #f5f5f5;
        p{
          font-size: 16px;
          line-height: 40px;
          text-align: center;
        }
      }
      ul{
        li{
          font-size: 16px;
          line-height: 2em;
          border-bottom: 1px solid #f5f5f5;
        }
        .li{
          display: flex;
          align-items: center;
          padding: 5px 0;
          .el-input{
            width: 200px;
          }
        }
      }
    }
    .bom{
      margin-top: 5px;
      .title{
        width: 100%;
        height: 40px;
        background-color: #f5f5f5;
        p{
          font-size: 16px;
          line-height: 40px;
          text-align: center;
        }
      }
      .search{
        width: 100%;
        margin-top: 15px;
        p{
          font-size: 18px;
          line-height: 2em;
        }
        .div{
          margin-top: 5px;
          .span{
            margin-top: 5px;
            font-size: 18px;
          }
          .el-input{
            width: 250px;
          }
        }
      }
      .btns{
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
      }
    }

  }
</style>
