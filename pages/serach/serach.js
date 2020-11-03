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
  onShow(){
    var searchHistory = wx.getStorageSync('searchHistory')
    this.setData({
      searchValue: app.globalData.serachKey,
      searchHistory: searchHistory
    })
  },
  // 搜索框双向数据绑定
  changeSerachKey(e){
    console.log('okaaaa')
    this.setData({
      searchValue: e.detail
    })
    app.globalData.serachKey = e.detail   // 将搜索关键字保存到全局变量中，以传给首页
    console.log('我是全局的搜索关键字：' + app.globalData.serachKey)
  },
  // 点击搜索
  toSearchOrder() {
    // 将搜索记录缓存在本地
    var searchHistory = wx.getStorageSync('searchHistory') || []
    if (searchHistory.indexOf(this.data.searchValue)==-1){
      searchHistory.unshift(this.data.searchValue)
      wx.setStorageSync('searchHistory', searchHistory)
    }
    // 导航至首页
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})