// 时间格式化
// 只是简单计算当月时间，并没有计算不同月、年的情况
function formatTime(date) {
  date = new Date(date);    // 将字符串转为时间
  let nowDate = new Date(); // 获取此时时间

  // let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  // let nowMonth = nowDate.getMonth() + 1;
  let nowDay = nowDate.getDate();
  // let nowHour = nowDate.getHours();
  // let nowMinute = nowDate.getMinutes();

  let hourstr = hour < 10 ? '0' + hour : hour;
  let minutestr = minute < 10 ? '0' + minute : minute;

  let days = nowDay - day;
  // 比较当月时间
  if (days === 0) {      // 当天，格式：00:17
    return hourstr + ':' + minutestr;
  } else if (days === 1) {    // 昨天，格式：昨天 17:07
    return '昨天' + hourstr + ':' + minutestr;
  } else if (days > 1) {      // 显示日期，格式：3月6日 下午09:07
    return month + '月' + day + '日' + ' ' + getMoment(hour) + hourstr + ':' + minutestr;
  }
}

// 获取具体时刻
function getMoment(hour) {
  if(hour >= 6 && hour < 11) {
    return '早上'
  } else if(hour >= 11 && hour <= 13) {
    return '中午'
  } else if( hour > 13 && hour < 19) {
    return '下午'
  } else if(hour >= 19 && hour <= 23 || hour >= 0 && hour < 6) {
    return '晚上'
  } else {
    return '错误'
  }
}

export {
  formatTime
}
