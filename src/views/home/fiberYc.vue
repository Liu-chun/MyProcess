<template>
  <div class="box">

    <div class="container">
      <div
        class="item"
        v-for="(item,index) of list"
        :key="item.id"
        @click="toggleNum(item.code,index)"
      >
        <p :class="index === indexs ? 'red' : null">{{item.name}}</p>
      </div>
    </div>
    <div class="btns">
      <el-button type="primary" @click="yes">确认</el-button>
      <el-button type="primary" @click="no">取消</el-button>
    </div>
  </div>
</template>

<script>
  import storage from "../../api/storage";
  import {api} from "../../api";
  import {Notify} from "vant";
  export default {
    name: "fiberYc",
    data(){
      return{
        // 只显示当前
        indexs: null,
        num: 0,
        pObjs: {},
        list: []
      }
    },
    created() {
      // this.pObjs = this.$route.query.pObjs
      console.log(this.pObjs)
      this.getList()
    },
    methods: {
      getList(){
        api.GetProblemList().then((res) => {
          console.log(res.data)
          this.list = res.data
          this.list.map((item,index)=>{
            item.index = index
          })
        })
      },
      toggleNum(num,index){
        this.num = num
        this.indexs = index
      },
      yes(){
        let params = {
          beamCardNo: this.pObjs.beamCardNo,
          noType: "QJ",
          equipmentCode: this.pObjs.warpDeviceID,
          sendUser: storage.getUser().users.id,
          typeID: this.num
        };
        api.AddInformation(params).then((res) => {
          console.log(res.data)
          if(res.data.isSuccess){
            this.$router.go(-1)
            return Notify({type: 'success', message: res.data.message});
          }else {
            return Notify({type: 'danger', message: res.data.message});
          }
        })
      },
      no(){
        this.$router.go(-1)
      },
    }
  }
</script>

<style scoped lang="less">
  .red{
    color: #ff0000;
  }
  .box{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .container{
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      align-items: center;
      .item{
        width: 35%;
        height: 80px;
        margin-top: 10px;
        background-color: #f5f5f5;
        p{
          font-size: 18px;
          text-align: center;
          line-height: 80px;
        }
      }
    }
    .btns{
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
    }
  }
</style>
