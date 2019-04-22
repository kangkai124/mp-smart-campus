<template>
  <div class="pay-history">
    <div class="item" v-for="(item, i) in list" :key="i">
      <h3>{{ item.type === 0 ? '水费' : '电费' }}</h3>
      <div class="cardId">
        卡号：{{ item.cardId }}
      </div>
      <div class="money">
        充值金额：{{ item.money }}
      </div>
    </div>
  </div>
</template>

<script>
const db = wx.cloud.database()

export default {
  data: () => ({ list: []
  }),
  onShow () {
    db.collection('pays').get()
      .then(res => {
        this.list = res.data
      })
  }
}
</script>

<style lang="less" scoped>
.item {
  border: 2px dashed #d9d9d9;
  margin-bottom: 10px;
}
</style>
