import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'

Mock.mock('/home/getData',homeApi.getStatisticalData)

Mock.mock('/user/getUserList',userApi.getUserList)

Mock.mock('/user/operateUser',userApi.operateUser)

Mock.mock('/login',userApi.loginCheck)