<template>
  <div>
    <div class="activies-scroll">
      <h3>最新活动</h3>
      <swiper
        style="height: 30vh;padding-top: 1vh;"
        :indicator-dots="true"
        indicator-active-color="#f59040"
        autoplay="autoplay"
        circular="circular">
        <div :key="i" v-for="(item, i) in newList">
          <swiper-item>
            <div class="activity" @click="onClick(item._id)">
              <h5>{{ item.title }}</h5>
              <img mode="aspectFill" :src="item.fileID" alt="cover" />
            </div>
            <h2>{{ item.title }}</h2>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <h3>热门活动</h3>
    <scroll-view scroll-y="true">
      <div class="hot-item" v-for="(item, i) in hotList" :key="i" @click="onClick(item._id)">
        <div class="title">{{ item.title }}</div>
        <div class="cover">
          <img mode="aspectFit" :src="item.fileID" alt="cover" />
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
const db = wx.cloud.database()

export default {
  data: () => ({
    newList: [],
    hotList: []
  }),
  onShow () {
    db.collection('activities').get()
      .then(res => {
        let _list = res.data
        _list.reverse()
        this.newList = _list.slice(0, 3)
        this.hotList = _list.slice(3)
      })
  },
  methods: {
    onClick (id) {
      wx.navigateTo({ url: '/pages/lifeItem/main?id=' + id })
    }
  }
}
</script>

<style scoped lang="less">
h3 {
  font-size: 16px;
  text-align: center;
  height: 5vh;
  line-height: 5vh;
}

.activies-scroll {
  width: 90vw;
  margin: 0 auto;

  swiper {
    margin-top: 0;
  }
}
.activity {
  height: 30vh;
  position: relative;
  // border: 1px solid #333;

  img {
    width: 100%;
  }

  h5 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: rgba(0,0,0,0.3);
    color: #fff;
    font-size: 14px;
    text-align: center;
    font-weight: bold;
  }
}

scroll-view {
  box-sizing: border-box;
  height: 56vh;
  padding: 10px;
  border: 4px double #d9d9d9;
  border-radius: 4px;
  width: 90vw;
  margin: 0 auto;
  background: #f7f7f7;
}

.hot-item {
  padding-left: 10px;
  margin-bottom: 10px;
  height: 60px;
  line-height: 60px;
  display: flex;
  font-size: 14px;
  background: #fff;

  .title {
    flex: 4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cover {
    flex: 1;

    img {
      width: 100%;
      height: 50px;
      vertical-align: middle;
    }
  }
}
</style>
