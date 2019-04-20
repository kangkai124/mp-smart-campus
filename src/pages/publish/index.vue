<template>
  <div class="publish">
    <div class="title">
      活动标题：<input v-model="title" />
    </div>
    <div class="content">
      活动详情：<textarea v-model="content" />
    </div>
    <div class="cover">
      <button size="mini" @click="uploadCover">上传活动封面</button>
      <p class="tip">请选择横向的图片</p>
      <img mode="aspectFit" v-if="cover" :src="cover" alt="activity-cover">
    </div>
    <div class="submit">
      <button type="primary" @click="handleSubmit">提交活动</button>
    </div>
  </div>
</template>

<script>
import { showFail, showSuccess } from '@/utils'

const db = wx.cloud.database()

export default {
  data: () => ({
    title: '',
    content: '',
    cover: ''
  }),
  methods: {
    uploadCover () {
      wx.chooseImage({
        count: '1',
        success: res => {
          const url = res.tempFilePaths[0]
          this.cover = url
        },
        fail: () => {},
        complete: () => {}
      })
    },
    getImageInfo (src) {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src,
          success: (res) => {
            console.log(res)
            const type = res.type
            wx.cloud.uploadFile({
              cloudPath: `activities/cover-${new Date().valueOf()}.${type}`,
              filePath: src
            })
              .then(res => {
                resolve(res.fileID)
              })
              .catch(err => {
                reject(err)
              })
          }
        })
      })
    },
    handleSubmit () {
      if (!this.title) {
        showFail('标题不能为空')
        return false
      }
      if (!this.content) {
        showFail('内容不能为空')
        return false
      }
      if (!this.cover) {
        showFail('活动封面不能为空')
        return false
      }
      this.getImageInfo(this.cover)
        .then(fileID => {
          db.collection('activities').add({
            data: {
              fileID,
              title: this.title,
              content: this.content
            }
          })
            .then(() => {
              showSuccess('活动发布成功')
              setTimeout(() => {
                wx.switchTab({ url: '/pages/life/main' })
              }, 500)
            })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.publish {
  font-size: 14px;
  text-align: center;
}
input, textarea {
  border: 1px solid #999;
}
.tip {
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>
