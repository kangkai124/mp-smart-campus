<template>
  <div class="notebook">
    <aside class="side" @click="click">
      记录
    </aside>
    <textarea cols="30" rows="10" v-model="value" />
    <button type='primary' @click="save">保存</button>
  </div>
</template>

<script>
import { showFail, showSuccess } from '@/utils'
const db = wx.cloud.database()

export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    click () {
      wx.navigateTo({ url: '/pages/noteHistory/main' })
    },
    save () {
      console.log(this.value)
      if (this.value === '') {
        showFail('请输入内容')
        return false
      }
      db.collection('notebooks').add({
        data: {
          content: this.value,
          date: new Date().valueOf()
        }
      })
        .then(res => {
          showSuccess('保存成功')
          setTimeout(() => {
            wx.navigateBack({
              delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            })
            this.value = ''
          }, 300)
        })
        .catch(() => {
          showFail('充值失败，请稍后重试')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.notebook {
  position: relative;
  padding-top: 40px;

  .side {
    width: 40px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;
    color: rgb(71, 174, 98);
  }
}
textarea {
  border: 1px solid #333;
  border-radius: 6px;
  width: 90vw;
  display: block;
  margin: 20px auto;
  padding: 10px;
  font-size: 14px;
}
button {
  width: 90vw;
  margin: 0 auto;
}
</style>
