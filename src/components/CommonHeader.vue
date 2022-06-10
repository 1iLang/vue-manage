<template>
  <div class="top">
    <div class="l-content">
      <el-button @click="isShowMenu" icon="el-icon-menu" plain size="mini"></el-button>
      <span>首页</span>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          头像<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  methods: {
    isShowMenu() {
      this.$store.commit('collapseMenu')
    }
  }
}
</script>

<style scoped>
.top {
  display: flex;
  height: 100%;
  justify-content: space-between;
}
/* .l-content {
  width: 20%;
  float: left;
  overflow: hidden;
} */
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
</style>

