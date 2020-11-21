import { getToken, setToken, removeToken } from '../../utils/cookies.js'
import { getMsgListApi } from '../../api/api.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [],
    options: {
      page: 1,
      size: 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断用户 token 是否失效
    if(!getToken(app.globalData.token)) {
      wx.redirectTo({
        url: '../login/login',
      })
    }
    // 实时获取最新记录
    setInterval(() => {
      this.getMsgList()
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMsgList()
  },

  async getMsgList() {
    let header = {
      'Authorization': getToken(app.globalData.token),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const res = await getMsgListApi(this.data.options, header)
    if(res.data.code === 1) {
      console.log('获取聊天列表成功 :>>', res.data.data.list)
      this.setData({
        msgList: res.data.data.list
      })
    } else {
      wx.showToast({
        title: '获取聊天列表失败',
        icon: 'none',
        duration: 2000
      })
      console.log('获取聊天列表失败 :>>', res)
    }
  },
  enterChat: function(e) {
    const data = e.currentTarget.dataset.msglist
    wx.navigateTo({
      url: '/pages/chat/chat?&headPortrait=' + data.headPortrait + '&toUserId=' + data.toUserId
    })
  }
})