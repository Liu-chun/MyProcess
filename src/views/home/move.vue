<template>
  <div class="box">
    <div class="search">
      <div>
        <span>从：</span>
        <el-input
          @blur="congFn"
          v-model="cong"
        >
          <template slot="append" class="temBtn">
            <el-button
              type="primary"
              @click="getIn"
            >
              扫码
            </el-button>
          </template>
        </el-input>
      </div>
      <div>
        <span>到：</span>
        <el-input
          v-model="dao"
        >
          <template slot="append" class="temBtn">
            <el-button
              type="primary"
              @click="getOut"
            >
              扫码
            </el-button>
          </template>
        </el-input>
      </div>
      <div>
        <span>人员：</span>
        <el-select v-model="name" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.names"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="bom">
      <el-table
        :data="list"
        size="small"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="materialid"
          label="物料编号"
        >
        </el-table-column>
        <el-table-column
          label="挪动重量"
        >
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.weight"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btns">
      <el-button type="primary" @click="yes">确定</el-button>
      <el-button type="primary" @click="no">取消</el-button>
    </div>

    <van-popup
      v-model="orCodeValStatic"
      position="right"
      :overlay="locationLayer"
      :class="locationLayer ? 'orBgcPop' :''"
    >
      <orCdeSingle
        :orType="orCodeType"
        :orCodeStatic="orCodeStaticVal"
        @onceOR="onceOR"
        @multipleOR="multipleOR"
        @endOrcodeWindow="endOrcodeWindow"
        @layerEnd="layerEnd"
      ></orCdeSingle>
    </van-popup>
  </div>
</template>

<script>
  import orCdeSingle from "../../components/orCode/orCodePD";
  import {api} from "../../api";
  import {Notify} from "vant";

  export default {
    name: "move",
    components: {
      orCdeSingle,
    },
    data(){
      return{
        // 关于扫码
        orCodeValStatic: false,
        locationLayer: true,
        orCodeType: '',
        orCodeStaticVal: -1,
        //
        cong: '',
        dao: '',
        name: '',
        options: [],
        list: []
      }
    },
    created() {
      this.getName()
    },
    methods: {
      // 目前问题：从的接口添加一个 weight 字段默认值 0
      // 选择人员是否使用id字段， 提交接口 500
      // 获取人员
      getName(){
        let params = {
          asc: false,
          isQueryType: true,
          orderby: "id",
          pageIndex: 0,
          status: 2
        };
        api.UsersGetList(params).then((res) => {
          console.log(res.data)
          if(res.data.isSuccess){
            this.options = res.data.data.dataList
          }
        })
      },
      congFn(){
        let params = {
          code: this.cong
        };
        api.Movematerial(params).then((res) => {
          console.log(res.data)
          if(res.data.isSuccess){
            this.list = res.data.data
          }
        })
      },
      getIn(){
        this.orCodeType = "YC";
        this.locationLayer = true;
        this.orCodeStaticVal = 2;
        this.orCodeValStatic = true;
      },
      getOut(){
        this.orCodeType = "DC";
        this.orCodeStaticVal = 2;
        this.orCodeValStatic = true;
      },
      yes(){
        this.list.map(item=>{
          item.beamCardNo2 = this.dao
          item.weight = 12
          item.moveuser = this.name
          item.status = true
        })
        console.log(this.list)
        api.MovematerialSave(this.list).then((res) => {
          console.log(res.data)
          // if(res.data.isSuccess){
          //   this.options = res.data.data.dataList
          // }
        })

        // Notify({type: 'success', message: '挪料成功'})
        // this.$router.go(-1)
      },
      no(){
        this.$router.go(-1)
      },
      onceOR(data){
        this.cong = data
      },
      // 扫码成功执行函数
      multipleOR(data) {
        this.dao = data
      },
      // 扫码条件
      endOrcodeWindow() {
        this.orCodeStaticVal = 1;
        this.orCodeValStatic = false;
      },
      layerEnd() {
        this.locationLayer = false;
      },
    }
  }
</script>

<style scoped lang="less">
  .van-popup--right {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
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
    .bom{
      font-size: 16px;
      margin-top: 15px;
      display: flex;
      justify-content: space-around;
    }
    .btns{
      padding-bottom: 60px;
      margin-top: 15px;
      display: flex;
      justify-content: space-around;
    }
  }
</style>
