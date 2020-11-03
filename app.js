import { getToken, setToken, removeToken } from './utils/cookies.js'
App({
  onLaunch: function() {
    this.login()
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
    userInfo: null,
    code: '', // 验证码
    token: 'ACCESS_TOKEN',
    userToken: 'USERINFO',
    serachKey: '' // 搜索的关键字
  }
})