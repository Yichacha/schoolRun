const app = getApp()
var tabar = require('../../templates/tabar/tabar.js');
import {
  getToken
} from '../../utils/cookies.js'
Page({
  data: {
    tabActive: 2,
    num: 5,
    order: {
      userName: '花花',
      createTime: '3分钟前',
      orderContent: '球带一份鸡肉卷球带一份鸡肉卷球带一份鸡肉卷',
      address1: '六饭',
      address2: '东十三',
      time1: '23:20',
      time2: '23:40',
      money: '5'
    },
  },
  onLoad: function () {
    tabar.tabbar("tabBar", 1, this) //1表示第二个tabbar
      // this.checkUserLogin()
  },
  // 判断用户是否已登陆
  checkUserLogin() {
    const token = getToken('ACCESS_TOKEN');
    // 判断用户是否已经登录
    if (!token) {
      console.log(token)
      wx.showModal({
        title: '提示',
        content: '请先登录哦~',
        success: res => {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/login/login',
            })
          } else {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        }
      })
      return
    }
  },
  tagChange(e) {
    console.log(`切换到标签 ${e.detail.name}`)
  },
})