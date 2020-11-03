const app = getApp()
var tabar = require('../../templates/tabar/tabar.js');
Page({
  data: {},
  onLoad: function () {
    tabar.tabbar("tabBar", 1, this), //1表示第二个tabbar
    this.checkUserLogin()
  },
  // 判断用户是否已登陆
  checkUserLogin() {
        // 判断用户是否已经登录
        if(!app.token){
          wx.showModal({
            title: '提示',
            content: '请先登录哦~',
            success: res=>{
              if(res.confirm){
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              }else{
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