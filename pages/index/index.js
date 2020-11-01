//获取应用实例
const app = getApp()
import { getToken } from '../../utils/cookies.js'

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onLoad: function () {
    // const token = getToken(app.globalData.token);
    // if(token) {
    //   // 获取用户信息
    //   this.getUserInfo()
    // } else {
    //   // 跳转到登录页面
    //   wx.redirectTo({
    //     url: '../login/login'
    //   })
    // }
  },
  // 获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})
