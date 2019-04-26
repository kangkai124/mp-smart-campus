<template>
  <div class="repair">
    <h5>报修申请标题：</h5>
    <input type="text" v-model="title" />
    <h5>宿舍门牌号：</h5>
    <input type="text" v-model="address" />
    <h5>请输入描述信息：</h5>
    <textarea v-model="content"></textarea>
    <button type="primary" @click="repair">提交报修</button>
    <button @click="history">查看报修记录</button>
  </div>
</template>

<script>
import { showFail, showSuccess } from '@/utils'

const db = wx.cloud.database()
export default {
  data: () => ({
    title: '',
    address: '',
    content: ''
  }),
  methods: {
    history () {
      wx.navigateTo({ url: '/pages/repairHistory/main' })
    },
    clear () {
      this.title = ''
      this.address = ''
      this.content = ''
    },
    repair () {
      if (!this.title) {
        showFail('请输入申请标题')
        return false
      }
      if (!this.address) {
        showFail('请输入宿舍门牌号')
        return false
      }
      if (!this.content) {
        showFail('请输入描述信息')
        return false
      }
      db.collection('repair').add({
        data: {
          title: this.title,
          address: this.address,
          content: this.content,
          date: new Date().valueOf()
        }
      })
        .then(res => {
          showSuccess('报修成功')
          setTimeout(() => {
            wx.navigateBack({
              delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            })
            this.clear()
          }, 300)
        })
        .catch(() => {
          showFail('报修失败，请稍后重试')
        })
    }
  }
}
</script>

<style scoped>
.repair {
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

textarea {
  width: 100%;
  height: 120px;
  line-height: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

button {
  margin-top: 20px;
}
</style>
