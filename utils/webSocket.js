export default class myWebSocket {
  constructor({heartCheck, isReconnect}) {
    this.isLogin = false; // 是否登录
    this.network = false; // 网络状态
    this.isClosed = false; // 是否人为关闭
    this.connection = 0; // 重连次数
    this.timeout = 10000; // 超时时间
    this.timeoutObj = null;
    this.heartCheck = heartCheck;
    this.isReconnect = isReconnect;
    this.onSocketOpen();
  }
  // 重置心跳
  reset(){
    clearInterval(this.timeoutObj);
    return this;
  }
  // 开启心跳
  start(){
    this.timeoutObj = setInterval(() => {
      wx.sendSocketMessage({
        data: this.getFormatData(3, null, null, null, null, null),
        // success(res){
        //   console.log("心跳发送成功", res)
        // }
      })
    }, this.timeout);
  }
  onSocketOpen() {
    wx.onSocketOpen((result) => {
      console.log('连接成功', result)
      this.isLogin = true
      if(this.heartCheck) {
        this.reset().start()
      }
      wx.sendSocketMessage({
        data: this.getFormatData(0, wx.getStorageSync('USERID'), null, null, null, null)
      })
      this.network = true;
    })
  }
  // 接收信息
  onSocketMessage(callback){
    if(typeof callback == 'function') {
      wx.onSocketMessage(callback)
    } else {
      console.log('onSocketMessage接收参数必须为函数')
    }
  }
  // 发送信息
  sendSocketMessage(options) {
    if(!this.isLogin) {
      wx.showToast({
        title: '发送失败，请检查网络',
        icon: 'none'
      })
      return;
    };
    wx.sendSocketMessage({
      ...options
    })
  }
  // 建立 websocket 连接
  connectSocket(options) {
    if(!wx.getStorageSync('USERID')) return;
    if(this.isLogin) {
      console.log('已登录')
    } else {
      wx.getNetworkType({
        success: (res) => {
          if(res.networkType == 'none') {
            this.network = false;
            console.log('websocket 连接失败：网络错误')
            return;
          }
          wx.connectSocket({
            ...options
          })
        }
      })
    }
  }
  // 监听网络变化
  onNetworkChange(options){
    wx.onNetworkStatusChange(res => {
      console.log("监听到网络变化", res)
      // 若网络从无到有，重连
      if(!this.network && this.isReconnect){
        this.reconnect(options);
      }
    })
  }
  // 监听 socket 的关闭（意外关闭及人为关闭），参数为进行连接 socket 的参数
  onSocketClose(options){
    wx.onSocketClose( err => {
      console.log("socket连接关闭", err);
      // 先停止心跳
      if(this.heartCheck)
        this.reset()
      // 切换至未登录状态
      this.isLogin = false;
      // 检测是否为用户自行关闭 socket和重连开关
      if(!this.isClosed && this.isReconnect)
        this.reconnect(options)
    })
  }
  // 人为地关闭 socket (即将小程序切换至后台)
  closeSocket(){
    this.isClosed = true;
    wx.closeSocket();
  }
  // 重连，参数为进行连接 socket 的参数
  reconnect(options){
    // 根据重连的次数来限制重连的时间
    if(this.connectCount < 20){
      setTimeout(() => {
        this.connectSocket(options)
      }, 5000)
    }else if(this.connectCount < 50){
      setTimeout(() => {
        this.connectSocket(options)
      }, 15000)
    }else{
      setTimeout(() => {
        this.connectSocket(options)
      }, 50000)
    }
    this.connectCount++;
  }
  getFormatData(type, fromUserId, toUserId, messageContent, messageType, ext){
    let data = {
      type,
      chatRecordSendVO: {
        fromUserId,
        toUserId,
        messageContent,
        messageType
      },
      ext
    }
    return JSON.stringify(data)
  }
}