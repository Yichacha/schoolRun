const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 时间戳转日期
const formatTimeTwo = (number, format) => {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = []
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

// 将json格式换为正常格式
const renderTime = date => {
  var dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
}

// 求时间差
const timeDif = time => {
  var date1=new Date();  //开始时间
  var date2=new Date(time);    //结束时间
  var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数
  //计算出相差天数
  var days=Math.floor(date3/(24*3600*1000))
  //计算出小时数
  var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
  var hours=Math.floor(leave1/(3600*1000))
  //计算相差分钟数
  var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
  var minutes=Math.floor(leave2/(60*1000))
  //计算相差秒数
  var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
  var seconds=Math.round(leave3/1000)
  // return (days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
  if(-(days+1)>0){
    return -(days)+"天"
  }else if(-(hours+1)>0){
    return -(hours+1)+"小时"
  }else if(minutes){
    return -minutes+"分钟"
  }else {
    return seconds + "秒"
  }
}
const timeChangeover = (updateTime) => {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const now = new Date().getTime();
  const dateTimeStamp = Date.parse(updateTime);
  const diffValue = now - dateTimeStamp;
  if (diffValue < 0) return
  const monthC = diffValue / month;
  const weekC = diffValue / (7 * day);
  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;
  if (monthC >= 1) {
    return "" + parseInt(monthC) + "月前"
  } else if (weekC >= 1) {
    return "" + parseInt(weekC) + "周前"
  } else if (dayC >= 1) {
    return "" + parseInt(dayC) + "天前"
  } else if (hourC >= 1) {
    return "" + parseInt(hourC) + "小时前"
  } else if (minC >= 1) {
    return "" + parseInt(minC) + "分钟前"
  } else {
    return "刚刚"
  }
}

module.exports = {
  formatTime,
  formatTimeTwo,  // 时间戳转日期
  timeChangeover,
  timeDif,
  renderTime
}
