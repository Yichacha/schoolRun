import {
  formatTimeTwo,
  renderTime,
  timeDif
} from '../../utils/util.js'
Component({

  /**
   * 启用插槽
   */
  options:{
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * {key:'关键字',name:'待匹配字符串'}
     */
    searchKey: {
      type: String,
      value: '',
      // observer: "_propertyDataChange"
    },
    order: {
      type: Object,
      value: [],
      observer: "_propertyDataChange"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    address1: [],
    address2: [],
    time1: '',
    time2: '',
    createTime: '',
    // statusList: [
    //   { id: 0, name: "未完成" },
    //   { id: 1, name: "已完成" }
    // ],
    // statusMap: {},
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _propertyDataChange: function (order) {
      if (this.data.searchKey) {
        let address1 = this.getHilightStrArray(order.startingPoint, this.data.searchKey)
        let address2 = this.getHilightStrArray(order.destination, this.data.searchKey)
        let time1 = renderTime(order.expectStartTime, 'M-D h:m')
        let time2 = renderTime(order.expectEndTime, 'M-D h:m')
        // let time3 = renderTime(order.createTime, 'h:m')
        this.setData({
          address1: address1,
          address2: address2,
          time1: time1,
          time2: time2,
          // createTime: time3
        })
      } else {
        let address1 = order.startingPoint
        let address2 = order.destination
        let time1 = formatTimeTwo(order.expectStartTime, 'M-D h:m')
        let time2 = formatTimeTwo(order.expectEndTime, 'M-D h:m')
        const time3 = timeDif(order.createTime)
        this.setData({
          address1: address1,
          address2: address2,
          time1: time1,
          time2: time2,
          createTime: time3
        })
      }
    },
    //返回一个使用key切割str后的数组，key仍在数组中
    getHilightStrArray: function (str, key) {
      if (str) {
        return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
      }
    },
    showOrderInfo() {
      this.triggerEvent('showOrderInfo', this.data.order)
    },
    // showOrderInfo(){
    //   console.log(this.data.order)
    // },
    // haveComment() {
    //   console.log(this.data.order)
    // }
  },
})