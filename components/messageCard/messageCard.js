import { timeChangeover } from '../../utils/util'

Component({
  properties: {
    msgList: Object, // 简写
  },
  observers: {
    'msgList': function() {
      this.setData({
        content: this.properties.msgList
      })
      this.setData({
        ['content.updateTime']: timeChangeover(this.data.content.updateTime)
      })
    }
  },

  data: {
    content: {}
  },

  methods: {
    
  }
})
