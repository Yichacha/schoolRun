import { getToken, setToken, removeToken } from '../../utils/cookies.js'
import { postAction, getAction } from '../../api/requests.js'

//获取应用实例
const app = getApp()
// const util = require('../../utils/util.js')

Page({
  data: {
    user: {
      account: '',
      pwd: '',
      verifycode: ''
    },
    snoIsFoucs: false,
    pwdIsFoucs: false,
    codeIsFocus: false,
    showPwd: false,
    pwdExist: false,
    hiddenImg: '../../assets/images/hidden.png',
    showImg: '../../assets/images/show.png',
    loginUrl: 'https://jxfw.gdut.edu.cn/new/login',
    codeUrl: 'https://jxfw.gdut.edu.cn/yzm?d=1603814815275', // 验证码接口
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
    this.data.user.pwd = e.detail.value
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
    if(e.detail.value) {
      this.setData({
        inputPwd: true
      })
    } else {
      this.setData({
        inputPwd: false
      })
    }
  },
  showHidden: function() {
    this.setData({
      showPwd: !this.data.showPwd
    })
  },
  updateCode: function() {
    this.getCode()
  },
  getCode: function() {
    getAction(this.data.codeUrl, {}, {}, 'arraybuffer')
    .then(res => {
      console.log('获取验证码成功 :>>', res)
      let base64 = wx.arrayBufferToBase64(res.data)
      this.setData({
        codeImg: " data:image/jpeg;base64," + base64,
        setCookies: res.cookies[0]
      })
    })
    .catch(err => {
      console.log('获取验证码失败 :>>', err)
    })
  },
  login: function() {
    let header = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': this.data.setCookies
    }
    postAction(this.data.loginUrl, this.data.user, header)
    .then(res => {
      console.log('登录成功 :>>', res)
      wx.redirectTo({
        url: '../index/index',
      })
    })
    .catch(err => {
      console.log('登录失败 :>>', err)
    })
  }
})
