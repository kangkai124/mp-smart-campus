// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取传递的参数
  const { a, b } = event
  // 通过wx-server-sdk获取上下文
  const wxContext = cloud.getWXContext()
  // 返回
  return {
    sum: a + b,
    openid: wxContext.OPENID
  }
}
