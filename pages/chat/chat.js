import { getToken, setToken, removeToken } from '../../utils/cookies.js'
import { postAction, getAction } from '../../api/requests.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasRead: false,
    editBottom: 0, // 输入框容器的 bottom
    scrollTop: 0,
    chatUrl: '/api/chatRecord/obtainRecordsPageByOppositeUserId',
    readedUrl: '/api/chatRecord/setHasReadByRecordId',
    options: {
      fromUserId: '',
      page: 1,
      size: 10,
      toUserId: 1
    },
    msgList: [],
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ['options.fromUserId']: getToken(app.globalData.userId)
    })
    this.getRecord()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    // setTimeout(() => {
    //   this.send()
    // }, 5000)
    // this.send()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.goBottom()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.watchMsgList()
    this.watchResponse()
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
    wx.closeSocket()
    wx.showToast({
      title: '连接已断开',
      icon: "none",
      duration: 2000
    })
  },

  goBottom: function(e) {
    const query = wx.createSelectorQuery()
    query.select('.content').boundingClientRect(rect => {
      this.setData({
        scrollTop: e ? rect.bottom + e.detail.height : rect.bottom
      })
    }).exec()
  },
  editFocus: function(e) {
    this.setData({
      editBottom:  e.detail.height + 'px'
    })
    this.goBottom(e)
  },
  editBlur: function() {
    this.setData({
      editBottom:  0
    })
  },
  // 监听输入
  getInput: function(e) {
    this.setData({
      value: e.detail.value
    })
  },
  async getRecord() {
    let header = {
      'Authorization': getToken(app.globalData.token)
    }
    const { data: res } = await postAction(this.data.chatUrl, this.data.options, header)
    this.setData({
      msgList: this.data.msgList.concat(res.data.list)
    })
    console.log('获取聊天记录成功', this.data.msgList)
  },
  readRecord: function() {
    let header = {
      'Authorization': getToken(app.globalData.token)
    }
    postAction(this.data.chatUrl, this.data.options, header)
    .then(res => {
      console.log('消息已读 :>>', res)
      if(res.data.code === 1) {

      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 发送消息
  send(e){
    var value = this.data.value;
    var messageType = 1;
    if(value == '') return;   // 如果是空数据不用发送

    const websocket = app.websocket
    let data = websocket.getFormatData(1, this.data.options.fromUserId, 1 ,value, messageType, null);
    websocket.sendSocketMessage({
      data: data,
      success: (result) => {
        this._tempData = JSON.parse(data).chatRecordSendVO; // 临时存储数据
        console.log("发送消息", this._tempData)
      }
    })
  },
  watchResponse(){  // 接受成功发送的响应
    app.watch('response', false, () => {
      this.sendSuccess()
    })
  },
  // 监听全局的消息列表
  watchMsgList(){
    app.watch('msgData', {}, async (msgData) => {
      console.log("私聊页监听到消息列表变化", msgData);
      if(msgData.fromUserId != this.myParam.toUserId) return;
      this.data.msgList.push(msgData)
      this.setData({
        msgList: this.data.msgList
      })
      let {data: res} = await updateRead(msgData.id)
      console.log("发送已读", msgData.id, res)
    })
  },
  sendSuccess(){  
    // 发送消息成功后进行页面的渲染
    this.setData({
      msgList: this.data.msgList.concat(this._tempData),
      value: ''
    })
    this.goBottom()
  }
})