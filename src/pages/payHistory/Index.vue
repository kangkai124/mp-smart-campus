<template>
  <div class="pay-history">
    <scroll-view scroll-y="true">
      <div class="item" v-for="(item, i) in list" :key="i">
      <h3>{{ item.type === 0 ? '水费' : '电费' }}</h3>
      <div class="cardId">
        卡号：{{ item.cardId }}
      </div>
      <div class="after"></div>
      <div class="money">
        充值金额：{{ item.money }}
      </div>
      <div class="money">
        充值日期：{{ item.date }}
      </div>
    </div>
    </scroll-view>
  </div>
</template>

<script>
import D from 'dayjs'
const db = wx.cloud.database()

export default {
  data: () => ({
    list: []
  }),
  onShow () {
    const openid = wx.getStorageSync('openid')
    db.collection('pays').where({
      _openid: openid
    }).get()
      .then(res => {
        let _list = res.data
        _list.reverse()
        _list = _list.map(l => {
          return {
            ...l,
            date: l.date ? D(l.date).format('YYYY-MM-DD hh:mm:ss') : '未知'
          }
        })
        this.list = _list
      })
  }
}
</script>

<style lang="less" scoped>
.pay-history {
  padding-top: 20px;
  height: 100%;
  background: #dfdfdf;
  overflow: auto;
}

scroll-view {
  height: 100vh;
}
.item {
  background-color: #efefef;
  width: 96vw;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0 0 4px #ddd;
  overflow: hidden;

  h3 {
    height: 32px;
    line-height: 32px;
    color: #999;
    font-size: 14px;
    text-align: center;
  }

  .cardId {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: #fff;
    padding: 0 10px;
  }

  .after {
    content: '';
    display: block;
    width: 80vw;
    height: 0;
    margin: 0 auto;
    border-top:1px solid #d9d9d9;
  }

  .money {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: #fff;
    padding: 0 10px;
  }
}
</style>
