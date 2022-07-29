<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <div class="u-img"></div>
          <div class="u-info">
            <p>admin</p>
            <p>超级管理员</p>
          </div>
        </div>

        <div class="login-info">
          <p>上次登录时间：<span>2022-4-9</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col style="margin-top: 20px" :span="16">
      <div class="order">
        <el-card
          style="margin-bottom: 10px"
          v-for="item in countData"
          :key="item.name"
          shadow="hover"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="'el-icon-' + item.icon"
            :style="{ background: item.color }"
          ></i>
          <div>
            <p class="money">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <el-card style="margin-top: 10px; height: 280px">
        <echart :chartData="echartData.order" style="height:280px"/>
      </el-card>

      <div class="graph">
        <el-card style="height:260px">
        <echart :chartData="echartData.user" style="height:260px"/>
        </el-card>
        <el-card style="height:260px">
        <echart :chartData="echartData.video" :isAxisChart="false" style="height:260px"/>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
p {
  margin: 10px;
}
.user {
  display: flex;
}
.u-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #ccc;
}
.order {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.order>div {
  width: 32.5%;
  box-sizing: border-box;
}
.order .icon {
  display: flex;
  width: 80px;
  font-size: 30px;
  color: #fff;
  justify-content: center;
  align-items: center;
}
.order p {
  text-indent: 20px;
}
.money {
  font-size: 25px;
}
.txt {
  font-size: 12px;
  color: #999;
}
.graph {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}
.graph>div {
  width:49%
}
</style>

<script>
import {getData} from '../../api/data.js' 
import Echart from '../../components/ECharts.vue'
// import * as echarts from 'echarts'
export default {
  name: "HHome",
  components: {
    Echart
  },
  data() {
    return {
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "小米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "三星",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    };
  },
  mounted() {
    getData().then(res => {
      // console.log(res)
      const {code,data} = res.data
      if (code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        //折线图
        this.echartData.order.xData = xData
        this.echartData.order.series = series

        //柱状图
        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
            {
              name: '新增用户',
              type: 'bar',
              data: data.userData.map(item => item.new),
            },
            {
              name: '活跃用户',
              type: 'bar',
              data: data.userData.map(item => item.active),
            },
          ]

        //饼图
        this.echartData.video.series = [
            {
              type: 'pie',
              data: data.videoData
            },
          ]
      }
    })
  }
};
</script>
