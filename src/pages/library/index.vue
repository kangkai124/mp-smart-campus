<template>
  <div class="note-book">
    <button @click="scanBook">添加图书</button>
    <TopSwiper :tops='tops'></TopSwiper>
    <div v-for="(book,index) in books" :key="index">
      <Card :book="book"> </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'

const db = wx.cloud.database()

wx.showShareMenu({
  withShareTicket: true
})

export default {
  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    }
  },
  async mounted () {
    this.getList(true)
    this.getTop()
  },
  methods: {
    scanBook () {
      wx.scanCode({
        success: res => {
          const isbn = res.result
          this.addBook(isbn)
        }
      })
    },
    async addBook (isbn) {
      const { result } = await wx.cloud.callFunction({
        name: 'douban',
        data: { isbn }
      })
      result.isbn = isbn
      result.userInfo = JSON.parse(wx.getStorageSync('user'))
      result.count = 1
      const ret = await db.collection('books').where({
        isbn
      }).get()
      const that = this
      if (ret.data.length) {
        wx.showModal({
          title: '添加失败',
          content: `图书《${result.title}》已存在,点击确定查看详情`,
          success (res) {
            if (res.confirm) {
              that.getList(true)
            } else if (res.cancel) {
            }
          }
        })
      } else {
      // return
        const add = await db.collection('books').add({
          data: result
        })
        if (add._id) {
          wx.showModal({
            title: '添加成功',
            content: `《${result.title}》添加成功`
          })
        }
      }
    },
    async getTop () {
      const tops = await db.collection('books').orderBy('count', 'desc').limit(9).get()
      this.tops = tops.data
    },
    async getList (init) {
      console.log(1)
      if (init) {
        // 初始化
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      wx.showLoading({title: '加载中'})
      const PAGE = 10
      const books = await db.collection('books').orderBy('create_time', 'desc').skip(this.page * PAGE).limit(PAGE).get()
      if (books.data.length < Page && this.page > 0) {
        console.log(books.data)
        this.more = false
      }
      // books.data.length = PAGE
      if (init) {
        this.books = books.data
        wx.stopPullDownRefresh()
      } else {
        // 下拉刷新，不能直接覆盖books 而是累加
        this.books = [...this.books, ...books.data]
      }
      wx.hideLoading()
      wx.hideNavigationBarLoading()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
