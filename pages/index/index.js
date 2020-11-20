//获取应用实例
const app = getApp()
import {
  getAction
} from '../../api/requests.js'

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
    orderList: [], // 订单列表
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
    console.log('获取首页数据')
    getAction('/api/errand/show', {
      page: 1,
      size: 4,
      content: ''
    }).then(res => {
      console.log(res)
      if (res.data.code === 1) {
        this.setData({
          orderList: res.data.data.list,
        })
        console.log(this.data.orderList)
      }
    })
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