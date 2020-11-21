import { getToken, setToken, removeToken } from '../../utils/cookies.js'
import { sendApi } from '../../api/api.js'
import { formatTimeTwo } from '../../utils/util.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    issue: {
      content: '',
      exceptedCost: '',
      expectStartTimeString: 0,
      expectEndTimeString: 0,
      startingPoint: '',
      destination: ''
    },
    total: 0, // 已输入的总字数
    expectStartTimeString: 0, // 开始时间
    expectEndTimeString: 0, // 结束时间 
    choosePicker: false,
    choosePickerId: 0, // 0：开始时间选择器 1：结束时间选择器
    scale: 3600000, // 默认时间跨度为一小时
    minDate: 0,
    maxDate: 0,
    currentDate: new Date().getTime()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      expectStartTimeString: formatTimeTwo(this.data.currentDate, 'M-D h:m'),
      expectEndTimeString: formatTimeTwo(this.data.currentDate + this.data.scale, 'M-D h:m'), // 默认结束时间为当前时间一小时后
      minDate: this.data.currentDate,
      maxDate: this.data.currentDate + this.data.scale * 24 * 7 // 最大时间为当前时间的一周之后
    })
    this.data.issue.expectStartTimeString = formatTimeTwo(this.data.currentDate, 'Y-M-D h:m:s')
    this.data.issue.expectEndTimeString = formatTimeTwo(this.data.currentDate + this.data.scale, 'Y-M-D h:m:s')
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

  inputText: function(e) {
    const len = e.detail.value.length
    this.setData({
      total: len
    })
    this.data.issue.content = e.detail.value
  },
  feeBlur: function(e) {
    this.data.issue.exceptedCost = Number(e.detail.value)
  }, 
  originBlur: function(e) {
    this.data.issue.startingPoint = e.detail.value
  },
  detinationBlur: function(e) {
    this.data.issue.destination = e.detail.value
  },
  showPicker: function(e) {
    this.setData({
      choosePicker: true
    })
    this.data.choosePickerId = e.currentTarget.dataset.value === 0 ? 0 : 1
  },
  handleConfirm: function(e) {
    this.setData({
      choosePicker: false
    })
    if(this.data.choosePickerId === 0) {
      this.setData({
        expectStartTimeString: formatTimeTwo(e.detail, 'M-D h:m')
      })
      this.data.issue.expectStartTimeString = formatTimeTwo(e.detail, 'Y-M-D h:m:s')
    } else {
      this.setData({
        expectEndTimeString: ormatTimeTwo(e.detail, 'M-D h:m')
      })
      this.data.issue.expectEndTimeString = formatTimeTwo(e.detail, 'Y-M-D h:m:s')
    }
  },
  handleCancel: function() {
    this.setData({
      choosePicker: false
    })
  },
  async send() {
    let info = ''
    if(this.data.issue.content === '') {
      info = '描述不能为空'
    } else if(this.data.issue.exceptedCost === '') {
      info = '费用不能为空'
    } else if(this.data.issue.startingPoint === '') {
      info = '起点不能为空'
    } else if(this.data.issue.destination === '') {
      info = '终点不能为空'
    } else if(this.data.issue.expectEndTimeString < this.data.issue.expectStartTimeString) {
      info = '结束时间不能小于开始时间'
    }
    if(info !== '') {
      wx.showToast({
        title: info,
        icon: 'none',
        duration: 2000
      })
    } else {
      let header = {
        'Authorization': getToken(app.globalData.token),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      const { data: res } = await sendApi(this.data.issue, header)
      console.log('发布跑腿信息', res)
      if(res.code === 1) {
        wx.showToast({
          title: res.message,
          icon: 'success'
        })
        wx.redirectTo({
          url: '../index/index',
        })
      } else {
        wx.showToast({
          title: '发送失败，请稍后重试',
          icon: 'none'
        })
      }
    }
  }
})