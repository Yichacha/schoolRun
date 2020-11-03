//获取应用实例
const app = getApp()
// import {
//   getToken
// } from '../../utils/cookies.js'
import {
  formatTimeTwo
} from '../../utils/util.js'
var tabar = require('../../templates/tabar/tabar.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false, // 控制遮罩层的显示与隐藏
    initIcon: true, // 控制图标颜色
    sortRules: [{
        text: '最新发布',
        value: '0'
      },
      {
        text: '发布最久',
        value: '1'
      },
      {
        text: '价格升序',
        value: '2'
      },
      {
        text: '价格降序',
        value: '3'
      },
      {
        text: '距离最近',
        value: '4'
      },
      {
        text: '距离最远',
        value: '5'
      },
    ],
    serachValue: '', // 搜索关键字
    orderList: [{
      value: 1
    }], // 订单列表
    order: {
      userName: '花花',
      createTime: '3分钟前',
      orderContent: '球带一份鸡肉卷球带一份鸡肉卷球带一份鸡肉卷',
      address1: '六饭',
      address2: '东十三',
      time1: '23:20',
      time2: '23:40',
      money: '5'
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onShow() {
    this.setData({ // 将暂存在全局的搜索关键字保存在searchValue中
      serachValue: app.globalData.serachKey
    })
  },
  onLoad: function () {
    tabar.tabbar("tabBar", 0, this) //0表示第一个tabbar
    this.getOrderList()
  },
  // 显示遮罩层
  onClickShow() {
    this.setData({
      show: true,
      initIcon: false
    });
  },
  // 隐藏遮罩层
  onClickHide() {
    this.setData({
      show: false,
      initIcon: true
    });
    console.log('遮罩层隐藏')

  },
  noop() {},
  // 获取首页订单数据
  getOrderList() {
    let time1 = formatTimeTwo(1488481383, 'M-D h:m')
    let time2 = formatTimeTwo(1604387662, 'h:m')
    console.log('转换后的时间：' + ' ' + time1 + ' ' + time2)
  },


  // 改变排序方式的方法
  changeSortRule(e) {
    this.setData({
      show: false,
      initIcon: true
    })
    // 点击的排序方式索引
    console.log(e.target.dataset.value)
  },
  // 点击搜索框导航至搜索页面
  toSearch() {
    wx.navigateTo({
      url: '/pages/serach/serach',
    })
  },
  // 从搜索页面回来的真正搜索
  toGetSearchList() {
    if (this.data.serachValue) {
      // 如果搜索关键字不为空，发起获取订单列表的请求
    } else {
      // 如果关键字为空，获取全部订单
    }
  },
})