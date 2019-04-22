<template>
  <div class="life-item">
    <h3>{{ item.title }}</h3>
    <div class="content">
      {{ item.content }}
    </div>
    <img mode="aspectFill" :src="item.fileID" alt="cover" />
  </div>
</template>

<script>
const db = wx.cloud.database()

export default {
  data: () => ({
    item: {}
  }),
  onLoad (option) {
    this.id = option.id
  },
  onShow () {
    console.log('show')
    db.collection('activities').where({
      _id: this.id
    }).get()
      .then(res => {
        this.item = res.data[0]
      })
  },
  onUnload () {
    this.item = {}
    this.id = ''
  }
}
</script>

<style lang="less" scoped>
 .life-item {
   padding: 10px;
 }
  h3 {
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    font-weight: bold;
    text-align: center;
  }
  .content {
    font-size: 14px;
    text-indent: 10px;
    min-height: 20vh;
  }
  img {
    width: 90vw;
  }
</style>
