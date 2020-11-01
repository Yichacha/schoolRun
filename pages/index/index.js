//获取应用实例
const app = getApp()
import { getToken } from '../../utils/cookies.js'
var tabar = require('../../templates/tabar/tabar.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false, // 控制遮罩层的显示与隐藏
    sortRules: [
      { text: '最新发布', value: '0' },
      { text: '发布最久', value: '1' },
      { text: '价格升序', value: '2' },
      { text: '价格降序', value: '3' },
      { text: '距离最近', value: '4' },
      { text: '距离最远', value: '5' },
    ],
    serachValue: '', // 搜索关键字
    orderList: [], // 订单列表
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onLoad: function () {
    tabar.tabbar("tabBar", 0, this)//0表示第一个tabbar
    this.setData({ // 将暂存在全局的搜索关键字保存在searchValue中
      serachValue: app.globalData.serachKey,
    })
    console.log('我是首页的搜索关键字：' + this.data.serachValue)
    const token = getToken();
    if(token) {
      // 获取用户信息

      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
   
    }
    //  else {
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
  onClickShow() {
    this.setData({ show: true });
    console.log('遮罩层出现')
  },

  onClickHide() {
    this.setData({ show: false });
    console.log('遮罩层隐藏')

  },
  noop() {},
  // 改变排序方式的方法
  changeSortRule(e) {
    // 点击的排序方式索引
    console.log(e.target.dataset.value)
  },
  // 点击搜索框导航至搜索页面
  toSearch(){
    wx.navigateTo({
      url: '/pages/serach/serach',
    })
  },
  // 从搜索页面回来的真正搜索
  toGetSearchList(){
    if(this.data.serachValue){
      // 如果搜索关键字不为空，发起获取订单列表的请求
    }else{
      // 如果关键字为空，获取全部订单
    }
  }
})
