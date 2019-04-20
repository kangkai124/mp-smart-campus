<template>
  <div class="home">
    <p @click="bindClassroom">教室查询</p>
    <p @click="bindClassTable">课表查询</p>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  mounted () {
    const db = wx.cloud.database()
    db.collection('cauth').get({
      success (res) {
      // res.data 包含该记录的数据
        console.log(res)
      }
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {
        a: 1,
        b: 2
      }
    })
      .then(res => {
        console.log(res)
      })
  },
  methods: {
    bindClassroom () {
      mpvue.navigateTo({url: '/pages/classroom/main'})
    },
    bindClassTable () {
      mpvue.navigateTo({url: '/pages/classTable/main'})
    },
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.home {
  text-align: center;
}
</style>
