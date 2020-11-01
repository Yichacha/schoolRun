import { postAction, getAction } from '../../api/requests.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    issue: {
      inputTxt: '',
      fee: '',
      startDate: 0,
      endDate: 0,
      origin: '',
      destination: ''
    },
    total: 0, // 已输入的总字数
    startDate: 0, // 开始时间
    endDate: 0, // 结束时间 
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
      startDate: this.formatDate(this.data.currentDate),
      endDate: this.formatDate(this.data.currentDate + this.data.scale), // 默认结束时间为当前时间一小时后
      minDate: this.data.currentDate,
      maxDate: this.data.currentDate + this.data.scale * 24 * 7 // 最大时间为当前时间的一周之后
    })
    this.data.issue.startDate = this.data.currentDate
    this.data.issue.endDate = this.data.currentDate
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  modifyDate: function(date) {
    return date < 10 ? '0' + date : date 
  },
  formatDate: function(date) {
    const formatDate = new Date(date)
    const m = formatDate.getMonth() + 1
    const d = formatDate.getDate()
    const h = formatDate.getHours()
    const mm = formatDate.getMinutes()
    return this.modifyDate(m) + '-' + this.modifyDate(d) + ' ' + this.modifyDate(h) + ':' + this.modifyDate(mm)
  },
  inputText: function(e) {
    const len = e.detail.value.length
    this.setData({
      total: len
    })
    this.data.issue.inputTxt = e.detail.value
  },
  feeBlur: function(e) {
    this.data.issue.fee = e.detail.value
  }, 
  originBlur: function(e) {
    this.data.issue.origin = e.detail.value
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
        startDate: this.formatDate(e.detail)
      })
      this.data.issue.startDate = e.detail
    } else {
      this.setData({
        endDate: this.formatDate(e.detail)
      })
      this.data.issue.endDate = e.detail
    }
  },
  handleCancel: function() {
    this.setData({
      choosePicker: false
    })
  },
  send: function() {
    let info = ''
    if(this.data.issue.inputTxt === '') {
      info = '描述不能为空'
    } else if(this.data.issue.fee === '') {
      info = '费用不能为空'
    } else if(this.data.issue.origin) {
      info = '起点不能为空'
    } else if(this.data.issue.destination) {
      info = '终点不能为空'
    } else if(this.data.issue.endDate < this.data.issue.startDate) {
      info = '结束时间不能小于开始时间'
    }
    if(info !== '') {
      wx.showToast({
        title: info,
        icon: 'none',
        duration: 2000
      })
    } else {
      postAction(this.data.url, this.data.issue)
      .then(res => {
        console.log('发布成功', res)
      })
      .catch(err => {
        console.log('发布失败', err)
      })
    }
  }
})