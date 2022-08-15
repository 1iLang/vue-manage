<template>
  <el-container>
    <el-aside width="auto">
     <common-aside></common-aside> <!--左侧导航-->
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header> <!--头部-->
      </el-header>      
      <el-main>
        <common-tag></common-tag>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  name: 'MMain',
  data () {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>

<style scoped>
 .el-header {
    background-color: #000;
    color: #fff;
    height: 60px;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #fff;
  }
  
  .el-main {
    color: #333;
  }
</style>