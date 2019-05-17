<template>
  <div>
    <BookInfo v-if="bookinfo._id" :info='bookinfo'></BookInfo>
      <!-- <ad unit-id="adunit-cdd6d62969e2c10e"></ad> -->
    <div v-if="bookinfo.comments && bookinfo.comments.length">
      <div class="notice" >评论</div>
      <Comment v-for="(comment, index) in bookinfo.comments"  :key="index" :comment="comment" ></Comment>
    </div>
  </div>
</template>

<script>

import BookInfo from '@/components/BookInfo'
import Comment from '@/components/Comment'
const db = wx.cloud.database()

export default {
  components: {BookInfo, Comment},
  data () {
    return {
      bookinfo: {},
      bookid: ''
    }
  },

  async mounted () {
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showLoading({title: '加载中'})
    this.bookid = this.$root.$mp.query.id
    console.log(this.$root.$mp.query)
    // 访问量自增
    await db.collection('books').doc(this.bookid).update({
      data: {
        count: db.command.inc(1)
      }

    })
    const bookinfo = await db.collection('books').doc(this.bookid).get()
    bookinfo.data.summary = bookinfo.data.summary.split('\n')
    this.bookinfo = bookinfo.data
    wx.hideLoading()
  }
}
</script>

<style>


</style>

