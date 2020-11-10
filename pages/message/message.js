import { getToken, setToken, removeToken } from '../../utils/cookies.js'
import { postAction, getAction } from '../../api/requests.js'
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
    this.getMsgList()
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMsgList: function() {
    let header = {
      'Authorization': getToken(app.globalData.token)
    }
    getMsgListApi(this.data.options, header)
    .then(res => {
      if(res.data.code === 1) {
        console.log('获取聊天列表成功 :>>', res.data.data.list)
        this.setData({
          msgList: res.data.data.list
        })
        console.log(this.data.msgList)
      } else {
        wx.showToast({
          title: '获取聊天列表失败',
          icon: 'none',
          duration: 2000
        })
      }
      
    })
    .catch(err => {
      console.log(err)
    })
  },
  enterChat: function() {
  }
})