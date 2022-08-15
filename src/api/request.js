import axios from './axios'
// export const getMenu = (param) => {
//     return axios.request({
//       url: '/permission/getMenu',
//       method: 'post',
//       data: param
//     })
// }

export const getData = () => {//home图表数据
    return axios.request({
      url: '/home/getData',
    })
}

export const getUserList = (data) => {//user表格数据
  return axios.request({
    url: '/user/getUserList',
    data
  })
}

export const operateUser = (data) => {//user表格操作
  return axios.request({
    url: '/user/operateUser',
    data
  })
}

export const loginCheck = (data) => {//login检测并根据权限返回menu数据
  return axios.request({
    url: '/login',
    method: 'post',
    data
  })
}