import { getToken, setToken, removeToken } from '../../utils/cookies.js'
import { postAction, getAction } from '../../api/requests.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      avatar: '../../assets/images/avatar.jpg',
      userName: '他的ID',
      lastChat: '文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案',
      unReadNum: 99,
      lastTime: '5分钟前'
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
    getAction(this.data.msgUrl)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  },
  enterChat: function() {
  }
})