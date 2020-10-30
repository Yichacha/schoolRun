// components/tabar/tabar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0, // tabar
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 监听tabar
    // onChange(event) {
    //   // event.detail 的值为当前选中项的索引
    //   this.setData({
    //     active: event.detail
    //   });
    // },
    toIndex() {
      wx.navigateTo({
        url: '../index/index',
      })
      // this.setData({
      //   active: 0
      // })
    },
    toMine() {
      wx.navigateTo({
        url: '../mine/mine'
      })
      // this.setData({
      //     active: 1
      // })
    }
  }
})