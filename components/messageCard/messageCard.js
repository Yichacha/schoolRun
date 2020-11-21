Component({
  properties: {
    msgList: Object, // 简写
  },
  observers: {
    'msgList': function() {
      this.setData({
        content: this.properties.msgList
      })
      this.timeChangeover()
    }
  },

  data: {
    content: {}
  },

  methods: {
    timeChangeover: function() {
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const month = day * 30;
      const now = new Date().getTime();
      const dateTimeStamp = Date.parse(this.data.content.updateTime);
      const diffValue = now - dateTimeStamp;
      if (diffValue < 0) return
      const monthC = diffValue / month;
      const weekC = diffValue / (7 * day);
      const dayC = diffValue / day;
      const hourC = diffValue / hour;
      const minC = diffValue / minute;
      if (monthC >= 1) {
        this.setData({
          ['content.updateTime']: "" + parseInt(monthC) + "月前"
        })
      } else if (weekC >= 1) {
        this.setData({
          ['content.updateTime']: "" + parseInt(weekC) + "周前"
        })
      } else if (dayC >= 1) {
        this.setData({
          ['content.updateTime']: "" + parseInt(dayC) + "天前"
        })
      } else if (hourC >= 1) {
        this.setData({
          ['content.updateTime']: "" + parseInt(hourC) + "小时前"
        })
      } else if (minC >= 1) {
        this.setData({
          ['content.updateTime']: "" + parseInt(minC) + "分钟前"
        })
      } else {
        this.setData({
          ['content.updateTime']: "刚刚"
        })
      }
    }
  }
})
