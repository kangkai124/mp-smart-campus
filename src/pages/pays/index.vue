<template>
  <div class="pays">
    <picker @change="onChange" :value="index" :range="range">
      <h3>点击选择充值的项目: {{ range[index] }}费</h3>
    </picker>
    <h5>请输入{{ range[index] }}卡卡号：</h5>
    <input type="text" v-model="cardId" />
    <h5>请输入充值金额（元）：</h5>
    <input type="number" v-model="money" />
    <button type="primary" @click="pay">充值</button>
    <button @click="history">查看充值记录</button>
  </div>
</template>

<script>
import { showFail, showSuccess } from '@/utils'

const db = wx.cloud.database()

export default {
  data: () => ({
    index: 0,
    range: ['水', '电'],
    cardId: '',
    money: ''
  }),
  methods: {
    onChange (e) {
      this.index = Number(e.target.value)
    },
    history () {
      wx.navigateTo({ url: '/pages/payHistory/main' })
    },
    pay () {
      if (!this.cardId) {
        showFail('请输入卡号')
        return false
      }
      if (!this.money) {
        showFail('请输入充值金额')
        return false
      }
      db.collection('pays').add({
        data: {
          type: this.index,
          cardId: this.cardId,
          money: this.money
        }
      })
        .then(res => {
          showSuccess('充值成功')
          setTimeout(() => {
            wx.navigateBack({
              delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            })
          }, 300)
        })
        .catch(() => {
          showFail('充值失败，请稍后重试')
        })
    }
  }
}
</script>

<style scoped lang="less">
h3 {
  text-align: center;
  color: #4ea47b;
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
}
.pays {
  padding-top: 20px;
  width: 90vw;
  margin: 0 auto;
}

h5 {
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
}

input {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

button {
  margin-top: 20px;
}
</style>
