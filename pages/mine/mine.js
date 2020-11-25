const app = getApp()
var tabar = require('../../templates/tabar/tabar.js');
import {
  getToken
} from '../../utils/cookies.js';
import {
  getAction,
  postAction
} from '../../api/requests.js'
Page({
  data: {
    userAvator: '',
    userName: '',
    tabActive: 0,
    num: 5,
    statusShowInfo: false,
    toComent: false, // 是否评价
    commentContent: '', //评价的内容
    // orderList: [],
    size: 12,
    myOrderList:[], // 我发布的跑腿
    myOrderTotal: 0,
    takeOrderList: [], // 我接的订单
    takeOrderTotal: 0,
    chosedOrder: {},// 点击查看的订单
    commentContentList: [],
    // [{
    //   userName: '花小花',
    //   avator: '/assets/images/avatar.jpg',
    //   createDate: '11.20',
    //   comment: '服务周到哈哈哈哈哈哈哈哈哈'
    // }, {
    //   userName: '花大花',
    //   avator: '/assets/images/avatar.jpg',
    //   createDate: '11.20',
    //   comment: '红红火火恍恍惚惚人生自古谁无死'
    // },{
    //   userName: '黄小黄',
    //   avator: '/assets/tabarImages/niumang.png',
    //   createDate: '12.01',
    //   comment: '夜空中最亮的星'
    // },{
    //   userName: '黄大黄',
    //   avator: '/assets/images/avatar.jpg',
    //   createDate: '12.20',
    //   comment: '春眠不觉晓处处闻啼鸟夜来风雨声花落知多少春眠不觉晓处处闻啼鸟夜来风雨声花落知多少'
    // }]
  },
  onLoad: function () {
    tabar.tabbar("tabBar", 1, this) //1表示第二个tabbar
    this.checkUserLogin()
    this.getMyOrderList()
    this.getTakeOrder()
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
    if (app.globalData.userInfo){
      this.setData({
        userAvator: app.globalData.userInfo.avatarUrl,
        userName: app.globalData.userInfo.nickName
      })
    }
  },
  // 当tab切换的时候触发
  tagChange(e) {
    switch(e.detail.name) {
      case 1:
        console.log('获取接单')
        this.getTakeOrder()
        break
      case 2:
        console.log('获取评价')
        this.getCommentList()
        break
      default: 
      console.log('default')
    }
  },
  // 下拉加载更多信息
  onReachBottom() {
      this.data.size += 12
      // 根据排序方式的不同，按照不同房时加载数据
      switch (this.data.tabActive) {
        case "1":
          this.getTakeOrder()
          break
        case "2":
          console.log('获取评论列表')
          // this.getCommentList()
          break
        default:
          this.getMyOrderList()
      }
  },
  // 获取订单列表
  getMyOrderList() {
    getAction('/api/errand/getMyAll',{
      page: 1,
      size: this.data.size,
    }).then( res => {
      this.setData({
        myOrderList: res.data.data.list,
        myOrderTotal: res.data.data.totalCount
      })
      console.log(this.data.myOrderList)
    })
  },
  // 获取接单列表
  getTakeOrder() {
    getAction('/api/order/getReceive', {
      size: this.data.size,
      page: 1,
      flag: 0
    }).then( res => {
      this.setData({
        takeOrderList: res.data.orderList.list,
        takeOrderTotal: res.data.orderList.totalCount
      })
      console.log('我接的单', res.data)
    })
  },
  // 获取评论列表
  getCommentList() {
    postAction('/api/comment/getCommentsByEmployeeId',{
      employeeId: app.globalData.userId
    }).then( res => {
      console.log('获取评论列表', res.data)
    })
  },
  // 从组件传过来的方法，包含order对象
  showOrderInfo(e) {
    e.detail.status = null
    this.setData({
      statusShowInfo: true,
      chosedOrder: e.detail,
    })
  },
  // 隐藏遮罩层
  onClickHide() {
    this.setData({
      statusShowInfo: false
    });
  },
  noop() {},
  // 点击订单状态对话框的“订单评价”显示评价订单的对话框
  showComment() {
    this.setData({
      toComent: true
    })
  },
  // 点击关闭“发表评价”的x，返回订单状态对话框
  backToInfo() {
    this.setData({
      toComent: false,
      commentContent: ''
    })
  },
  // 发表评价
  toComment() {
    if (this.data.commentContent) {
      console.log('评论内容', this.data.commentContent)
      console.log('被选择的订单id', this.data.chosedOrder.id)
      postAction('/api/comment/save', {
        orderId: this.data.chosedOrder.id,
        content: this.data.commentContent
      }).then( res => {
        console.log('我对订单发表了评论', res.data)
      })
      wx.showToast({
        title: '评价成功！',
      })
      this.setData({
        toComent: false,
        statusShowInfo: false,
        commentContent: ''
      })
    } else {
      wx.showToast({
        title: '评价不能为空',
        image: '/assets/images/close.png'
      })
    }
  }
})