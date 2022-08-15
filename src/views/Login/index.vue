<template>
  <el-form
    class="login-box"
    label-width="80px"
    :model="login"
    :rules="rules"
    ref="loginForm"
  >
    <h3 class="center">系统登录</h3>
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="login.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="passWord">
      <el-input type="password" v-model="login.passWord"></el-input>
    </el-form-item>
    <div class="center">
      <el-button type="primary" @click="submitLogin('loginForm')"
        >登录</el-button
      >
    </div>
  </el-form>
</template>

<style lang="less" scoped>
.login-box {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  width: 350px;
  padding: 35px;
  background-color: #fff;
  background-clip: padding-box;
  border: solid 1px #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .center {
    text-align: center;
  }
}
</style>

<script>
import { loginCheck } from "../../api/request.js";
export default {
  name: "loginIndex",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error("密码长度为6-16"));
      } else {
        callback();
      }
    };
    return {
      login: {
        userName: "",
        passWord: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 4,
            max: 15,
            message: "长度在 4 到 15 个字符",
            trigger: "change",
          },
        ],
        passWord: [
          { required: true, validator: validatePass, trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitLogin(n) {
      this.$refs[n].validate((v) => {
        if (v) {
          loginCheck(this.login).then((res) => {
            if (res.data.menuData) {
              // this.addRoutes(res.data.menuData)
              this.$store.commit('addRoutes',{data:res.data.menuData,router:this.$router})
              let sessionData = JSON.stringify({...this.login,...res.data})
              window.sessionStorage.setItem('token',sessionData)
              this.$router.push({ path: '/home' })
            } else {
              this.$message({
                type: "error",
                message: "用户名或密码错误",
              });
            }
          });
        }
      });
    },
    // addRoutes(data) {
    //   let menuData = []
    //   data.forEach(item => {
    //     if(item.children){
    //       item.children = item.children.map(v => {
    //         v.component = () => import(`../${v.url}`)
    //         return v
    //       })
    //       menuData.push(...item.children)
    //     }else{
    //         item.component = () => import(`../${item.url}`)
    //       menuData.push(item)
    //     }
    //   });
    //   menuData.forEach(item => {
    //     this.$router.addRoute('Main',item)
    //   });
    // }
  },
};
</script>