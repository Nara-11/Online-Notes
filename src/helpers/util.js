export function countDown(dataStr) {
  let dataObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr);
  let time = dataObj.getTime();
  let now = Date.now();
  let space = now - time;
  let str = '';

  switch (true) {
    case space < 1000 * 60:
      str = '刚刚';
      break;
    case space < 1000 * 3600:
      str = Math.floor(space / (1000 * 60)) + '分钟前';
      break;
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + '小时前';
      break;
    default:
      str = Math.floor(space / (1000 * 3600 * 24)) + '天前';
      break;
  }
  return str;
}
