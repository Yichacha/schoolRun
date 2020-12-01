import { getToken, setToken, removeToken } from '../../utils/cookies.js'
import { postAction, getAction } from '../../api/requests.js'
import { jxfwLoginApi, getCodeApi } from '../../api/api.js'

//获取应用实例
const app = getApp()

Page({
  data: {
    user: {
      account: '',
      pwd: '',
      verifycode: ''
    },
    userStatus: false, // 是否登录成功
    snoIsFoucs: false,
    pwdIsFoucs: false,
    codeIsFocus: false,
    showPwd: false,
    hiddenImg: '../../assets/images/hidden.png',
    showImg: '../../assets/images/show.png',
    tokenUrl: '/login/wxMiniProGramLogin',
    setCookies: '', // 验证码接口返回的 set-cookies
    codeImg: '' // 验证码 base64
  },
  onLoad: function () {
    this.getCode()
  },
  snoFoucs: function() {
    this.setData({
      snoIsFoucs: true
    })
  },
  pwdFoucs: function() {
    this.setData({
      pwdIsFoucs: true
    })
  },
  snoBlur: function(e) {
    this.data.user.account = e.detail.value
    if(this.data.user.account === '') {
      this.setData({
        snoIsFoucs: false
      })
    }
  },
  pwdBlur: function(e) {
    if(this.data.user.pwd === '') {
      this.setData({
        pwdIsFoucs: false
      })
    }
  },
  codeFoucs: function() {
    this.setData({
      codeIsFoucs: true
    })
  },
  codeBlur: function(e) {
    this.data.user.verifycode = e.detail.value
    if(this.data.user.verifycode === '') {
      this.setData({
        codeIsFoucs: false
      })
    }
  },
  inputPwd: function(e) {
    this.setData({
      ['user.pwd']: e.detail.value
    })
  },
  showHidden: function() {
    this.setData({
      showPwd: !this.data.showPwd
    })
  },
  updateCode: function() {
    this.getCode()
  },
  async getCode() {
    const res = await getCodeApi('arraybuffer')
    console.log('获取验证码成功 :>>', res)
    let base64 = wx.arrayBufferToBase64(res.data)
    this.setData({
      codeImg: " data:image/jpeg;base64," + base64,
      setCookies: res.cookies[0]
    })
  },
  updateToken() {
    wx.login({
      success: (res) => {
        app.globalData.code = res.code
        if (app.globalData.code) {
          console.log('获取用户登录态成功！' + res.errMsg)
          postAction(
            this.data.tokenUrl,
            {
              code: app.globalData.code,
              username: app.globalData.userInfo.nickName,
              headPortrait: app.globalData.userInfo.avatarUrl
            }
          )
          .then(res => {
            if(res.data.code === 1) {
              console.log('获取 token 成功', res)
              setToken(app.globalData.token, res.data.data.token)
              setToken('USERID', res.data.data.id)
            }
          })
          .catch(err => {
            console.log('获取 token 失败', err.data.message)
          })
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
  getUserInfo: function() {
    if(app.globalData.code) {
      // 登录成功，调用获取用户信息接口
      if(this.data.userStatus) {
        removeToken(app.globalData.userToken)
        removeToken(app.globalData.token)
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: res => {
                  console.log('获取用户信息成功', res)
                  app.globalData.userInfo = res.userInfo
                  setToken(app.globalData.userToken, app.globalData.userInfo)
                  wx.redirectTo({
                    url: '../index/index'
                  })
                  this.updateToken()
                },
                fail: function () {
                  console.log('获取用户信息失败')
                }
              })
            } else {
              wx.showToast({
                title: '请同意微信授权',
                icon: 'none'
              })
            }
          }
        })
      }
    }
  },
  async jxfwLogin() {
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': this.data.setCookies
    }
    const res = await jxfwLoginApi(this.data.user, header)
    if(res.data.code === 0) { 
      console.log('登录成功 :>>', res)
      this.data.userStatus = true // 信息正确，登录成功
      wx.showToast({
        title: '登录成功~',
        icon: 'loading',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: res.data.message,
        icon: 'none',
        duration: 2000
      })
      console.log('登录失败 :>>', res)
    }
  }
})
