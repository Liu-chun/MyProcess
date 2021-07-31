<template>
  <div class="box">
    <div class="bom">
      <div class="search">
        <div class="div">
          <span class="span" v-html="'设&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备：'"></span>
          <el-select
                  v-model="jitaiId"
                  placeholder="请选择"
                  filterable
                  clearable
                  @change="toggleSB"
          >
            <el-option
              v-for="item in jitaiArr"
              :key="item.id"
              :label="item.code"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="div">
          <span class="span">设备责任人：</span>
          <el-select
            v-model="nameId"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in nameArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="div">
          <span class="span">设备责任人2：</span>
          <el-select
                  v-model="nameId3"
                  placeholder="请选择"
                  filterable
                  clearable
          >
            <el-option
                    v-for="item in nameArr3"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="div">
          <span class="span">设备操作人1：</span>
          <el-select
                  v-model="nameId1"
                  placeholder="请选择"
                  filterable
                  clearable
          >
            <el-option
                    v-for="item in nameArr1"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="div">
          <span class="span">设备操作人2：</span>
          <el-select
            v-model="nameId2"
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in nameArr2"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
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
    name: "weavingShebei",
    data(){
      return{
        // 机台
        jitaiId: '',
        jitaiArr: [],
        // 负责人
        name: '',
        nameId: '',
        nameArr: [],
        // 负责人2
        name3: '',
        nameId3: '',
        nameArr3: [],
        // 操作1
        nameId1: '',
        nameArr1: [],
        // 操作2
        nameId2: '',
        nameArr2: [],
        // Objs: {},
      }
    },
    created() {
      this.getJT()
      this.getName()
    },
    methods: {
      getJT(){
        let params = {
          pageIndex: 0,
          typeId: 2
        };
        api.GetListJT(params).then((res) => {
          console.log(res.data)
          this.jitaiArr = res.data.data.dataList
        })
      },
      toggleSB(data){
        this.jitaiArr.map(item=>{
          if(item.id === data){
            this.nameId = item.heldUserID
            this.nameId3 = item.heldUserID2
            this.nameId1 = item.makeUserID
            this.nameId2 = item.makeUserID2
            console.log(item)
          }
        })
      },
      getName(){
        let params = {
          pageIndex: 0,
          id: 71
        };
        api.GetZZUser(params).then((res) => {
          this.nameArr = res.data
          this.nameArr1 = res.data
          this.nameArr2 = res.data
          this.nameArr3 = res.data
        })
      },
      yes(){
        if(this.jitaiId.length <= 0){
          return Notify({type: 'danger', message: '请先选择设备'});
        }
        let params = {
          heldUserID: this.nameId,// 负责人
          heldUserID2: this.nameId3,// 负责人2
          makeUserID: this.nameId1,// 操作1
          makeUserID2: this.nameId2,// 操作2
          id: this.jitaiId,
        }
        api.EquipmentUpdate(params).then((res) => {
          console.log(res.data)
          if(res.data.isSuccess){
            this.$router.push({
              path: '/weaving',
            })
            return Notify({type: 'success', message: res.data.message});
          }else {
            return Notify({type: 'danger', message: res.data.message});
          }
        })
      },
      no(){
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
