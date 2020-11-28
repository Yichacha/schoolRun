import { getToken, setToken, removeToken } from '../../utils/cookies.js'
import { getMsgListApi } from '../../api/api.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: null,
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
    } else {
      this.getMsgList()
    }
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

  /**
   * 生命周期函数--监听页面隐藏
   * 从列表页进入私聊页时会隐藏页面（不是卸载页面），清除计时器
   */
  onHide: function () {
    clearInterval(this.data.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.timer)
  },

  async getMsgList() {
    let header = {
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
    // e.currentTarget.dataset. 获取标签存储的值 data-xxx
    const data = this.data.msgList[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '/pages/chat/chat?&headPortrait=' + data.headPortrait + '&toUserId=' + data.toUserId
    })
  }
})