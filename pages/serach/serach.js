const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '', // 搜索的关键词
    searchHistory: [], // 搜索历史
  },
  // 页面从后台切换到前台时执行
  onShow() {
    this.initSearchHistory()
  },
  // 初始化
  initSearchHistory() {
    var searchHistory = wx.getStorageSync('searchHistory')
    this.setData({
      searchValue: app.globalData.serachKey,
      searchHistory: searchHistory
    })
  },
  // 搜索框双向数据绑定
  changeSerachKey(e) {
    this.setData({
      searchValue: e.detail
    })
    app.globalData.serachKey = e.detail // 将搜索关键字保存到全局变量中，以传给首页
  },
  // 点击搜索
  toSearchOrder() {
    // 将搜索记录缓存在本地
    var searchHistory = wx.getStorageSync('searchHistory') || []
    if (searchHistory.indexOf(this.data.searchValue) == -1) {
      searchHistory.unshift(this.data.searchValue)
      wx.setStorageSync('searchHistory', searchHistory)
    }
    app.globalData.serachKey = this.data.searchValue
    console.log('app.globalData.serachKey', app.globalData.serachKey)
    // 导航至首页
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  // 点击搜索历史触发搜索
  searchByHistory(e) {
    this.setData({
      searchValue: e.currentTarget.dataset.key
    })
    app.globalData.serachKey = e.currentTarget.dataset.key
    this.toSearchOrder()
  },
  // 清空搜索历史
  clearSearchHistory() {
    wx.setStorageSync('searchHistory', [])
    this.setData({
      searchHistory: []
    })
    wx.showToast({
      title: '清空成功',
    })
  }
})