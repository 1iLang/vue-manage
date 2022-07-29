<template>
  <el-menu
    :default-active="$route.path"
    :test="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    text-color="#fff"
    active-text-color="#ffd04b"
    background-color="#545c64"
  >
    <h3>{{isCollapse? '后台' : '通用后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template slot="title">
      <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="(subItem,subI) in item.children" :key="subI">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  background: #545c64;
  border: none;
  color: #fff;
  h3 {
    font-size: 15px;
    text-align: center;
  }
}
</style>

<script>
export default {
  data() {
    return {
      menu: [
        {
          path:'/home',
          name:'home',
          label:'首页',
          icon:'s-home',
          url:'Home/Home',
        },
        {
          path:'/mall',
          name:'mall',
          label:'商品管理',
          icon:'video-play',
          url:'MallManage/MallManage',
        },
        {
          path:'/user',
          name:'user',
          label:'用户管理',
          icon:'user',
          url:'Usermanage/Usermanage',
        },
        {
          label:'其他',
          path:'other',
          icon:'location',
          children:[
            {
              path:'/page1',
              name:'page1',
              label:'页面1',
              icon:'setting',
              url:'Other/PageOne',
            },
            {
              path:'/page2',
              name:'page2',
              label:'页面2',
              icon:'setting',
              url:'Other/PageTwo',
            },
          ]
        },
      ]
    };
  },
  beforeMount() {
    this.upDatePageN()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {//点击侧栏改变header头部名称
      if(this.$route.path !== item.path) {//防止同一页面多次点击
        this.$router.push({name:item.name})
        this.$store.commit('changePageName',item.label)
      }
    },
    upDatePageN(){//页面刷新header头部名称保持状态
      let noChildren = this.noChildren
      let hasChildren = this.hasChildren
      let path = this.$route.path , istrue = true
      noChildren.forEach(i => {
        if(path === i.path) {
          this.$store.commit('changePageName',i.label)
          return istrue = false
        }
        return
      });
      istrue && hasChildren.forEach(x => {
        x.children.forEach(y => {
          if(path === y.path) {
            this.$store.commit('changePageName',y.label)
            return;
          }
        })
      })
    }
  },
  computed: {
    noChildren() {
     return this.menu.filter(item => !item.children)
    },
    hasChildren() {
     return this.menu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  }
};
</script>