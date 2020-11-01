const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: ''
  },

  // 搜索框双向数据绑定
  getSerachKey(e){
    this.setData({
      searchValue: e.detail
    })
    app.globalData.serachKey = this.data.searchValue // 将搜索关键字保存到全局变量中，以传给首页
    console.log('我是全局的搜索关键字：' + app.globalData.serachKey)
  },
  // 点击搜索
  toSearchOrder(e) {
    console.log(e)
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})