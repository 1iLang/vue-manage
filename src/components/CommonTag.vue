<template>
 <div>
  <el-tag 
  v-for="(item,index) in tagData" 
  :key="item.label" closable 
  style="margin: 0 5px"
  @click="clickTag(item)" 
  @close="closable(item.path,index)"
  :effect="$route.path === item.path ? 'dark' : 'plain'">
    {{item.label}}
  </el-tag>
 </div>
</template>

<style lang="less" scoped>
</style>

<script>
import { mapState } from 'vuex';
export default {
  name: 'CommonTag',
  methods: {
    clickTag(item){
      if(this.$route.path !== item.path) {//防止同一页面多次点击
        this.$router.push({name:item.name})
        this.$store.commit('changePageName',item.label)
      }
    },
    closable(path,i) {
      this.$store.commit('tagDelete',i)
      let tagData = this.tagData , tagDataL = tagData.length - 1
      if(this.$route.path === path && tagData.length !== 0){
          if(i < tagDataL) {
            this.$router.push({name:tagData[i].name})
            this.$store.commit('changePageName',tagData[i].label)
          }else{
            this.$router.push({name:tagData[tagDataL].name})
            this.$store.commit('changePageName',tagData[tagDataL].label)
          }
      }
    }
  },
  computed: {//等同于 this.$store.state.tab.tagData
    ...mapState({
      tagData: state => state.tab.tagData  
    })
  }
};
</script>