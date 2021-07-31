<template>
  <div class="login">
    <div class="max">
      <div class="top">
        <img src="../assets/img/timg.jpg" alt="" />
      </div>
      <div class="form">
        <van-form @submit="onSubmit">
          <van-cell-group>
            <van-field
              v-model="loginForm.UserId"
              name="usersName"
              label="用户名"
              placeholder="请填写用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            >
              <template #button>
                <van-button
                  size="small"
                  type="primary"
                  @click="startRecognize"
                  native-type="button"
                >
                  扫码
                </van-button>
              </template>
            </van-field>
          </van-cell-group>

          <van-cell-group>
            <van-field
              v-model="loginForm.Password"
              :type="value ? 'text' : 'password'"
              name="usersPwd"
              label="密码"
              placeholder="请填写密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            >
              <template #button>
                <van-switch
                  v-model="value"
                  size="18px"
                  active-color="#13ce66"
                  inactive-color="#ccc"
                />
              </template>
            </van-field>
          </van-cell-group>

          <div class="dl">
            <van-button round block type="info" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
    <van-popup
      v-model="orCodeValStatic"
      position="right"
      :overlay="locationLayer"
      :class="locationLayer ? 'orBgcPop' : ''"
    >
      <orCdeSingle
        :orType="orCodeType"
        :orCodeStatic="orCodeStaticVal"
        @multipleOR="multipleOR"
        @endOrcodeWindow="endOrcodeWindow"
        @layerEnd="layerEnd"
      ></orCdeSingle>
    </van-popup>
  </div>
</template>

<script>
import { Notify, Switch } from "vant";
import { api } from "../api";
import storage from "../api/storage";
import localStorage from "../api/localStorage";
import orCdeSingle from "./orCode/orCodePD";
export default {
  name: "Login",
  data() {
    return {
      // 关于扫码
      orCodeValStatic: false,
      locationLayer: true,
      orCodeType: "",
      orCodeStaticVal: -1,
      // 登录
      loginForm: {
        UserId: "",
        Password: "",
      },
      value: false,
    };
  },
  created() {
    // this.denglu();
  },
  methods: {
    // denglu() {
    //   let paths = storage.getUser();
    //   let path = storage.getUser().users;
    //   if (paths.token !== undefined) {
    //     if (
    //       path.isMV_ProductionQJ &&
    //       path.isMV_ProductionZZ &&
    //       path.isMV_ProductionZZAudit
    //     ) {
    //       this.$router.push({
    //         path: "/Home",
    //       });
    //     } else if (path.isMV_ProductionZZ || path.isMV_ProductionZZAudit) {
    //       this.$router.push({
    //         path: "/weaving",
    //       });
    //     } else if (path.isMV_ProductionQJ) {
    //       this.$router.push({
    //         path: "/fiber",
    //       });
    //     } else {
    //       this.$router.push({
    //         path: "/",
    //       });
    //     }
    //   }
    // },
    onSubmit(values) {
      console.log(values);
      let params = {
        UserId: values.usersName,
        Password: values.usersPwd,
      };
      // values.equipmentTypeID = 2;
      api.login(this.$qs.stringify(params)).then((res) => {
        console.log(res);
        let data = res.data;
        if (data.Succeed) {
          let user = {};
          user = {
            UserId: this.loginForm.UserId,
            Password: this.loginForm.Password,
            checked: this.loginForm.checked,
            Token: data.Token,
            PersonId: data.PersonId,
            PersonName: data.PersonName,
            Urls: data.Urls,
          };
          localStorage.setUser(user);
          this.$router.push("/Home");
        } else {
          this.show = false;
          Notify({ type: "danger", message: "账号或密码错误" });
        }
        // if (data.isSuccess) {
        //   // 保存到local中
        //   storage.saveUser(data.data);
        //   // 跳转
        //   let path = data.data.users;
        //   if (
        //     path.isMV_ProductionQJ &&
        //     path.isMV_ProductionZZ &&
        //     path.isMV_ProductionZZAudit
        //   ) {
        //     this.$router.push({
        //       path: "/Home",
        //     });
        //   } else if (path.isMV_ProductionZZ || path.isMV_ProductionZZAudit) {
        //     this.$router.push({
        //       path: "/weaving",
        //     });
        //   } else if (path.isMV_ProductionQJ) {
        //     this.$router.push({
        //       path: "/fiber",
        //     });
        //   }
        // } else {
        //   Notify({ type: "danger", message: data.message });
        // }
      });
      // this.$router.push('/Home')
    },
    // 扫码
    startRecognize() {
      this.orCodeType = "DC";
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    // 扫码成功执行函数
    multipleOR(data) {
      console.log(data);
      let params = {
        code: data,
        equipmentTypeID: 2,
      };
      api.GetJwtBySM(params).then((res) => {
        let { data } = res;
        console.log(data);
        if (data.isSuccess) {
          // 保存到local中
          localStorage.setUser(data.data);
          // 跳转
          let path = data.data.users;
          if (
            path.isMV_ProductionQJ &&
            path.isMV_ProductionZZ &&
            path.isMV_ProductionZZAudit
          ) {
            this.$router.push({
              path: "/Home",
            });
          } else if (path.isMV_ProductionZZ || path.isMV_ProductionZZAudit) {
            this.$router.push({
              path: "/weaving",
            });
          } else if (path.isMV_ProductionQJ) {
            this.$router.push({
              path: "/fiber",
            });
          }
        } else {
          Notify({ type: "danger", message: data.message });
        }
      });
    },
    // 扫码条件
    endOrcodeWindow() {
      this.orCodeStaticVal = 1;
      this.orCodeValStatic = false;
    },
    layerEnd() {
      this.locationLayer = false;
    },
  },
  components: {
    orCdeSingle,
  },
};
</script>

<style scoped lang="less">
.van-cell {
  align-items: center;
}
.login {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  .max {
    .top {
      text-align: center;
      padding-top: 100px;
      img {
        width: 80%;
        /*height: 70px;*/
      }
    }
    .form {
      margin-top: 50px;
      .dl {
        margin: 30px 16px;
      }
    }
  }
}
.van-popup--right {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
