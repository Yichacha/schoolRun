//获取应用实例
const app = getApp()
import {
  getAction
} from '../../api/requests.js';

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
        text: '价格升序',
        value: '1'
      },
      {
        text: '价格降序',
        value: '2'
      }
    ],
    serachValue: '', // 搜索关键字
    orderList: [], // 订单列表
    size: 12, // 获取跑腿订单数量
    total: 0, //订单总数量
    showLoadingGif: false, // 控制加载数据图标的显示与隐藏
    noMore: false,
    sortWay: ''
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
    this.setData({
      serachValue: app.globalData.serachKey
    })
    return getAction('/api/errand/show', {
      page: 1,
      size: this.data.size,
      content: this.data.serachValue
    }).then(res => {
      console.log(res)
      if (res.data.code === 1) {
        this.setData({
          orderList: res.data.data.list,
          total: res.data.data.totalCount
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 下拉加载更多跑腿
  onReachBottom() {
    if (this.data.orderList.length && this.data.orderList.length < this.data.total) {
      this.setData({
        showLoadingGif: true
      })
      this.data.size += 12
      // 根据排序方式的不同，按照不同房时加载数据
      switch (this.data.sortWay) {
        case "1":
          this.sortByPrice(0)
          break
        case "2":
          this.sortByPrice(1)
          break
        default:
          this.setData({sortWay: ''})
          this.getOrderList()
      }
      this.setData({
        showLoadingGif: false
      })
    } else if (this.data.orderList.length && this.data.orderList.length >= this.data.total) {
      this.setData({
        noMore: true
      })
    }
  },

  // 改变排序方式的方法
  changeSortRule(e) {
    this.setData({
      show: false,
      initIcon: true,
      serachValue: ''
    })
    app.globalData.serachKey = ''
    // 点击的排序方式索引
    switch (e.target.dataset.value) {
      case "1":
        this.setData({
          sortWay: "2",
          size: 12,
          total: 0,
          serachValue: ''
        })
        this.sortByPrice(0)
        break
      case "2":
        this.setData({
          sortWay: "3",
          size: 12,
          total: 0,
        })
        this.sortByPrice(1)
        break
      default:
        this.setData({
          sortWay: '',
          size: 12,
          total: 0,
        })
        this.getOrderList()
    }
  },
  // 价格升降序排序
  sortByPrice(type) {
    getAction('/api/errand/searchByPrice', {
      page: 1,
      size: this.data.size,
      type: type,
      content: this.data.serachValue
    }).then(res => {
      if (res.data.code === 1) {
        this.setData({
          orderList: res.data.data.list,
          total: res.data.data.totalCount
        })
      }
    })
  },
  // 点击搜索框导航至搜索页面
  toSearch() {
    wx.navigateTo({
      url: '/pages/serach/serach',
    })
  },
  // 删除订单
  deleteOrder(e) {
    console.log(e.detail)
  }
})