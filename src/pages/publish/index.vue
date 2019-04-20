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
      <button type="primary">提交活动</button>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      title: '',
      content: '',
      cover: ''
    }),
    methods: {
      uploadCover () {
        wx.chooseImage({
          count: '1', // 最多可以选择的图片张数,
          success: res => {
            this.cover = res.tempFilePaths[0]
          }, // 返回图片的本地文件路径列表 tempFilePaths,
          fail: () => {},
          complete: () => {}
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
