import { getToken, setToken, removeToken } from '../../utils/cookies.js'
import {
  getPrivateRecordApi,
  setHasReadApi,
  confirmReceiveApi,
  confirmIssueApi,
  getAccessApi,
  getCommentApi
} from '../../api/api.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindAvatar: true, // 点击头像
    bindComment: true, // 点击查看评价
    acceptOrder: false, // 确认订单弹窗
    hasRead: false, // 消息未读时头像有红点提示
    options: {
      fromUserId: '',
      page: 1,
      size: 10,
      toUserId: ''
    },
    avatarUrl: '', // 我的头像
    toUserInfo: {}, // 对方信息
    msgList: [], // 聊天消息
    commentList: [], // 用户评价
    value: '' // 发送框的内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('路由携带的用户信息', options)
    this.setData({
      toUserInfo: options,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      ['options.fromUserId']: getToken(app.globalData.userId),
      ['options.toUserId']: options.toUserId || options.employerId
    })
    this.getRecord()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.goBottom()
    }, 500)
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
  // 自动滚动到底部
  goBottom: function() {
    this.setData({
      toView: 'msg-' + (this.data.msgList.length - 1)
    })
  },
  // 关闭弹窗
  close() {
    if(this.data.bindComment) {
      this.setData({
        bindComment: false
      })
    } else {
      this.setData({
        bindAvatar: false
      })
    }
  },
  handle_cancel() {
    this.setData({
      acceptOrder: false
    })
  },
  async handle_confirm() {
    this.setData({
      acceptOrder: false
    })
    let header = {
      'Authorization': getToken(app.globalData.token),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const { data: res } = await confirmReceiveApi(errandId, header)
    if(res.code === 1) {
      console.log('确认接单', res)
    }
  },
  editFocus(e) {
    this.setData({
      editBottom:  e.detail.height + 'px'
    })
    this.goBottom()
  },
  editBlur() {
    this.setData({
      editBottom:  0
    })
  },
  // 监听输入
  getInput(e) {
    this.setData({
      value: e.detail.value
    })
  },
  async getRecord(getMore = false) {
    let header = {
      'Authorization': getToken(app.globalData.token)
    }
    const { data: res } = await getPrivateRecordApi(this.data.options, header)
    if(res.code === 1) {
      if(getMore) { // 加载更多消息
        this.setData({
          msgList: res.data.list
        })
      } else { // 发送或获取消息
        this.setData({
          msgList: this.data.msgList.concat(res.data.list)
        })
      }
      console.log('获取聊天记录成功', this.data.msgList)
    } else {
      console.log('获取聊天记录失败')
    }
  },
  async readRecord() {
    let header = {
      'Authorization': getToken(app.globalData.token)
    }
    const { data: res } = await setHasReadApi(this.data.options, header)
    if(res.code === 1) {
      this.setData({
        hasRead: true
      })
      console.log('消息已读', res)
    }
  },
  // 发送消息
  send(e){
    let value = this.data.value;
    const messageType = 1;
    if(value == '') return; // 如果是空数据不用发送

    const websocket = app.websocket
    let data = websocket.getFormatData(1, this.data.options.fromUserId, this.data.options.toUserId ,value, messageType, null);
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
      if(msgData.fromUserId != this.data.options.toUserId) {
        return
      }
      this.data.msgList.push(msgData)
      this.setData({
        msgList: this.data.msgList
      })
      let { data: res } = await setHasReadApi(msgData.id)
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
  },
  fetchMoreRecords() {
    this.data.options.size = this.data.msgList.length + 10
    console.log(this.data.options)
    this.getRecord(true)
  },
  // 获取对方的未接订单
  getOrder() {
    this.setData({
      bindAvatar: true
    })
  },
  // 获取对方的评价
  async getComment() {
    this.setData({
      bindComment: true
    })
    let header = {
      'Authorization': getToken(app.globalData.token),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const { data: res } = await getCommentApi({employeeId: this.data.options.fromUserId}, header)
    if(res.code === 1) {
      console.log('获取用户评价', res)
      this.setData({
        commentList: res.data
      })
    }
  }
})