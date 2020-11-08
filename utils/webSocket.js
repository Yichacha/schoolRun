function connect(user, func) {
  wx.connectSocket({
    url: 'wss://www.vtmer2018.top/campus_runrun',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      console.log('websocket连接成功', res)
    },
    fail: function (err) {
      console.log('websocket连接失败', err)
    }
  })
  wx.onSocketOpen((res) => {
    wx.showToast({
      title: 'websocket已开通',
      icon: "success",
      duration: 2000
    })
    //接受服务器消息
    wx.onSocketMessage(func); // func 回调可以拿到服务器返回的数据
  });
  wx.onSocketError((res) => {
    wx.showToast({
      title: 'websocket连接失败，请检查！',
      icon: "none",
      duration: 2000
    })
    console.log(res)
  })
 }
 //发送消息
function send(msg) {
  wx.sendSocketMessage({
    data: msg
  });
}
 module.exports = {
  connect,
  send
 }