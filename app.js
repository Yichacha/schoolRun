import { getToken, setToken, removeToken } from './utils/cookies.js'
import myWebSocket from "./utils/webSocket"

App({
  onLaunch: function() {
    this.login()

    // weosocket 连接
    this.websocket = new myWebSocket({ heartCheck: true, isReconnect: true });
    let connetObj = {
      url: `wss://www.vtmer2018.top/campus_runrun`,
      success(res) {
        console.log("connect", res)
      }
    }
    // 连接 socket
    this.websocket.connectSocket(connetObj);
    // 监听网络变化
    this.websocket.onNetworkChange(connetObj)
    // 监听 socket 的关闭
    this.websocket.onSocketClose(connetObj);
    // 监听服务端信息的传送
    this.websocket.onSocketMessage((data) => {
      console.log("接收到服务端的消息", data)
      try {
        var msg = JSON.parse(data.data)
      } catch (error) {}
      if(!msg) return;   // 无信息直接返回
      if(!msg.data) {   // 发送成功的相应
        this.globalData.response = true;
      } else { // 有人发消息，如果是自己发给自己无需做出相应
        // if(msg.data.fromUserId == msg.data.toUserId) return;
        this.globalData.msgData = msg.data;
      }
    })
  },
  // 小程序后台运行或息屏后，进入小程序时重新连接
  onShow() {
    this.websocket.connectSocket({
      url: `wss://www.vtmer2018.top/campus_runrun`,
      success(res){
        console.log("connect", res)
      }
    });
  },
  // 监听全局变量消息列表
  watch(attr, value, method){
    Object.defineProperty(this.globalData, attr, {
      configurable: true,
      enumerable: true,
      set(newValue){
        // 没有改变无需执行
        if(value == newValue) return;
        method(newValue)
      },
      get(){
        return value;
      }
    })
  },
  login: function() {
    wx.login({
      success: res => {
        this.globalData.code = res.code // 进入小程序，获取登录凭证
        if (this.globalData.code) {
          console.log('获取用户登录态成功！' + res.errMsg)
          this.updateToken()
        }
      },
      fail: function (err) {
        console.log('获取用户登录态失败！' + err.errMsg)
        wx.showToast({
          title: '获取用户登录态失败！',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  updateToken: function() {
    const token = getToken(this.globalData.token)
    // 判断 token 是否存在
    // 存在则登录状态未失效，更新 token
    // 不存在则登录状态失效，需要重新登录
    if(token) {
      removeToken(this.globalData.token)
      this.globalData.userInfo = getToken(this.globalData.userToken)
      wx.request({
        url: 'http://www.vtmer2018.top:8099/login/wxMiniProGramLogin',
        data: {
          code: this.globalData.code,
          username: this.globalData.userInfo.nickName
        },
        method: 'POST',
        success: res => {
          setToken(this.globalData.token, res.data.data.token)
          console.log('更新 token 成功', res)
        },
        fail: err => {
          console.log('更新 token 失败', err)
        }
      })
    }
  },
  globalData: {
    response: false,
    msgData: {},
    userInfo: null,
    code: '', // 验证码
    userId: 'USERID',
    token: 'ACCESS_TOKEN',
    userToken: 'USERINFO',
    serachKey: '' // 搜索的关键字
  }
})