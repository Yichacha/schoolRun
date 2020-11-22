const app = getApp()
var tabar = require('../../templates/tabar/tabar.js');
import {
  getToken
} from '../../utils/cookies.js';
import {
  getAction
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
    orderList: [{
        userName: '花花',
        createTime: '3分钟前',
        orderContent: '球带一份鸡肉卷球带一份鸡肉卷球带一份鸡肉卷',
        address1: '六饭',
        address2: '东十三',
        time1: '23:20',
        time2: '23:40',
        money: '5',
        status: 0, // 0订单未完成 1订单已完成
        statusText: '未完成'
      }, {
        userName: '小黄',
        createTime: '5分钟前',
        orderContent: '我不吃肉',
        address1: '三饭',
        address2: '东十三',
        time1: '23:20',
        time2: '23:40',
        money: '4',
        status: 1, // 0订单未完成 1订单已完成
        statusText: '已完成'
      }, {
        userName: '花花',
        createTime: '3分钟前',
        orderContent: '球带一份鸡肉卷球带一份鸡肉卷球带一份鸡肉卷',
        address1: '六饭',
        address2: '东十三',
        time1: '23:20',
        time2: '23:40',
        money: '5',
        status: 0, // 0订单未完成 1订单已完成
        statusText: '未完成'
      }, {
        userName: '花花',
        createTime: '3分钟前',
        orderContent: '球带一份鸡肉卷球带一份鸡肉卷球带一份鸡肉卷',
        address1: '六饭',
        address2: '东十三',
        time1: '23:20',
        time2: '23:40',
        money: '5',
        status: 0, // 0订单未完成 1订单已完成
        statusText: '未完成'
      },
      {
        userName: '小黄',
        createTime: '5分钟前',
        orderContent: '我不吃肉',
        address1: '三饭',
        address2: '东十三',
        time1: '23:20',
        time2: '23:40',
        money: '4',
        status: 1, // 0订单未完成 1订单已完成
        statusText: '已完成'
      }, {
        userName: '小黄',
        createTime: '5分钟前',
        orderContent: '我不吃肉',
        address1: '三饭',
        address2: '东十三',
        time1: '23:20',
        time2: '23:40',
        money: '4',
        status: 1, // 0订单未完成 1订单已完成
        statusText: '已完成'
      },
    ],
    // 点击查看的订单
    chosedOrder: {
      // userName: '花花',
      // createTime: '3分钟前',
      // orderContent: '球带一份鸡肉卷球带一份鸡肉卷球带一份鸡肉卷',
      // address1: '六饭',
      // address2: '东十三',
      // time1: '23:20',
      // time2: '23:40',
      // money: '5',
      // status: null, // 0订单未完成 1订单已完成
      // statusText: '未完成'
    },
    commentContentList: [{
      userName: '花小花',
      avator: '/assets/images/avatar.jpg',
      createDate: '11.20',
      comment: '服务周到哈哈哈哈哈哈哈哈哈'
    }, {
      userName: '花大花',
      avator: '/assets/images/avatar.jpg',
      createDate: '11.20',
      comment: '红红火火恍恍惚惚人生自古谁无死'
    },{
      userName: '黄小黄',
      avator: '/assets/tabarImages/niumang.png',
      createDate: '12.01',
      comment: '夜空中最亮的星'
    },{
      userName: '黄大黄',
      avator: '/assets/images/avatar.jpg',
      createDate: '12.20',
      comment: '春眠不觉晓处处闻啼鸟夜来风雨声花落知多少春眠不觉晓处处闻啼鸟夜来风雨声花落知多少'
    }]
  },
  onLoad: function () {
    tabar.tabbar("tabBar", 1, this) //1表示第二个tabbar
    this.checkUserLogin()
    this.getMyOrderList(0)
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
    console.log('userInfo', app.globalData.userInfo)
    this.setData({
      userAvator: app.globalData.userInfo.avatarUrl,
      userName: app.globalData.userInfo.nickName
    })
  },
  // 当tab切换的时候触发
  tagChange(e) {
    console.log(`切换到标签 ${e.detail.name}`)
    switch(e.detail.name) {
      case 0:
        console.log('获取订单')
        break
      case 1:
        console.log('获取接单')
        break
      case 2:
        console.log('获取评价')
        break
      default: 
      console.log('default')
    }
  },
  // 获取订单列表
  getMyOrderList(flag) {
    getAction(`/api/order/getReceive/${flag}`).then( res => {
      console.log('getMyOrderList', res.data)
    })
  },
  // 获取接单列表
  getTakeOrder() {

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
      console.log(this.data.commentContent)
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