import { timeChangeover } from '../../utils/util'

Component({
  properties: {
    msgList: Object, // 简写
  },
  observers: {
    'msgList': function() {
      this.setData({
        content: this.properties.msgList,
        ['content.updateTime']: timeChangeover(this.properties.msgList.updateTime)
      })
    }
  },

  data: {
    content: {}
  },

  methods: {
    
  }
})
