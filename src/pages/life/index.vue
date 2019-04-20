<template>
  <div>
    <div class="activies-scroll">
      <swiper
        style="height: 30vh;margin-top: 20px;padding-top: 1vh;"
        :indicator-dots="true"
        autoplay="autoplay"
        circular="circular">
        <div :key="i" v-for="(item, i) in list">
          <swiper-item>
            <h2>{{ item.title }}</h2>
            <img :src="item.fileID" alt="cover">
          </swiper-item>
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
const db = wx.cloud.database()

export default {
  data: () => ({
    list: []
  }),
  onShow () {
    db.collection('activities').get()
      .then(res => {
        this.list = res.data.slice(-3)
      })
  }
}
</script>

<style>

</style>
