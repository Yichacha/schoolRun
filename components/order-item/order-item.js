// components/order-item/order-item.js
Component({
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
      observer: "_propertyDataChange"
    },
    order: {
      type: Object,
      observer: "_propertyDataChange"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    address1: [],
    address2: []
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _propertyDataChange: function (searchKey) {
      if (searchKey) {
        let address1 = this.getHilightStrArray(this.data.order.address1, searchKey)
        let address2 = this.getHilightStrArray(this.data.order.address2, searchKey)
        this.setData({
          searchKey: searchKey,
          address1: address1,
          address2: address2
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