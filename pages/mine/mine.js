const app = getApp()
var tabar = require('../../templates/tabar/tabar.js');
import {
  getToken
} from '../../utils/cookies.js'
Page({
  data: {},
  onLoad: function () {
    tabar.tabbar("tabBar", 1, this), //1表示第二个tabbar
      this.checkUserLogin()
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
  }

})