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
    hiddenImg: '../../asstes/images/hidden.png',
    showImg: '../../asstes/images/show.png',
    loginUrl: 'https://jxfw.gdut.edu.cn/new/login',
    codeUrl: 'https://jxfw.gdut.edu.cn/yzm?d=', // 验证码接口
    codeImg: ''
  },
  onLoad: function () {
    this.setData({
      codeImg: this.data.codeUrl + Math.random()
    })
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
    this.setData({
      codeImg: this.data.codeUrl + Math.random()
    })
    console.log('刷新验证码')
  },
  login: function() {
    let header = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    postAction(this.data.loginUrl, this.data.user, header)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
})
