<template>
  <div class="history">
    <scroll-view scroll-y="true">
      <div class="item" v-for="(item, i) in list" :key="i">
        <div class="content">
          {{ item.content }}
        </div>
        <div class="after"></div>
        <div class="date">
          日期：{{ item.date }}
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
    db.collection('notebooks').get()
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
.history {
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

  .content {
    padding: 10px;
    font-size: 14px;
  }

  .after {
    content: '';
    display: block;
    width: 80vw;
    height: 0;
    margin: 0 auto;
    border-top:1px solid #d9d9d9;
  }

  .date {
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
