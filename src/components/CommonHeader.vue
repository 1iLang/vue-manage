<template>
  <div class="top">
    <div class="l-content">
      <el-button
        @click="isShowMenu"
        icon="el-icon-menu"
        plain
        size="mini"
      ></el-button>
      <span>{{ this.$store.state.tab.pageName }}</span
      ><!---等同于 this.$store.state.tab.pageName--->
    </div>
    <div class="r-content">
      <el-dropdown @command="handleCommand" click="el-user" size="mini">
        <span>
          {{ userName }}<i class="el-icon-arrow-down el-icon--right el-pos"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="signOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  data() {
    return {
      pageName: "",
      userName: JSON.parse(window.sessionStorage.token).userName,
    };
  },
  beforeMount() {
    // this.pageNameC()
  },
  methods: {
    isShowMenu() {
      this.$store.commit("collapseMenu");
    },
    handleCommand(type) {
      switch(type){
        case 'signOut':
          this.$confirm("确定退出？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            window.sessionStorage.clear()
            this.$router.go(0)
            this.$router.push({path:'/login'})
          }).catch(() => {});
          break
      }    
    },
    // getPath(){
    //   let tagData = this.$store.state.tab.tagData
    //   tagData.forEach(e => {
    //    if(e.path === this.$route.path){
    //       this.pageName = e.label
    //       return
    //    }
    //   });
    // }
  },
  // watch: {
  //   '$route':'getPath'
  // },
};
</script>

<style scoped>
.top {
  display: flex;
  height: 100%;
  justify-content: space-between;
}
.l-content span {
  margin-left: 20px;
}
.r-content {
  width: 50px;
  height: 50px;
  margin-top: 5px;
  border-radius: 50%;
  background: #ccc;
}
.el-user {
  width: 100%;
  display: block;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.el-pos {
  position: absolute;
  right: -13px;
  top: 26px;
}
</style>

