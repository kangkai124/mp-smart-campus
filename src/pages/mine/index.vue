<template>
  <div>
    <div class="login-btn" v-if="showLogin">
       <button
        type="primary"
        class="login"
        open-type="getUserInfo"
        lang="zh_CN"
        @getuserinfo="getUserInfo">
        登录
      </button>
    </div>
    <div class="main" v-else>
      <div class="user">
        <aside></aside>
        <img mode="aspectFit" :src="userInfo.avatarUrl" alt="user">
      </div>
        <p>{{ userInfo.nickName }}</p>
        <div class="year">
          <Year />
        </div>
        <div class="operator">
          <div class="item" v-for="item in list" :key="item.id" @click="onClick(item.id)">
            <button>{{ item.name }}</button>
          </div>
        </div>
        <!-- <div class="line"></div> -->
        <div class="item admin" v-if="isAdmin">
          <button @click="publish">发布活动</button>
        </div>
    </div>
  </div>
</template>

<script>
import { showSuccess, showFail } from '@/utils'
import Year from '@/components/year'

const db = wx.cloud.database()

export default {
  data: () => ({
    showLogin: true,
    isAdmin: false,
    userInfo: {},
    list: [
      {
        id: 1,
        name: '充值水电费',
        to: '/pages/pays/main'
      },
      {
        id: 2,
        name: '设备报修',
        to: '/pages/repair/main'
      }
    ]
  }),
  components: { Year },
  mounted () {
    this.checkLogin()
  },
  onHide () {
    this.title = ''
    this.content = ''
    this.cover = ''
  },
  methods: {
    getUserInfo (e) {
      if (e.target && e.target.userInfo) {
        const userInfo = e.target.userInfo
        wx.setStorageSync('user', JSON.stringify(userInfo))
        wx.cloud.callFunction({
          name: 'login'
        })
          .then(res => {
            const openid = res.result.openid
            wx.setStorageSync('openid', openid)
            this.checkAdmin()
          })
        showSuccess('登录成功')
        this.checkLogin()
      } else {
        showFail('登录失败')
      }
    },
    checkLogin () {
      const res = wx.getStorageSync('user')
      this.showLogin = !res
      if (res) this.userInfo = JSON.parse(res)
      this.checkAdmin()
    },
    checkAdmin () {
      this.openid = wx.getStorageSync('openid')
      if (this.openid) {
        db.collection('admin').where({ admin_id: this.openid }).get()
          .then(res => {
            if (res.data.length > 0) {
              this.isAdmin = true
            }
          })
      }
    },
    publish () {
      wx.navigateTo({ url: '/pages/publish/main' })
    },
    onClick (id) {
      if (id === 1) {
        wx.navigateTo({ url: '/pages/pays/main' })
      } else {
        wx.navigateTo({ url: '/pages/repair/main' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  width: 80%;
  padding-top: 40%;
  margin: 0 auto;
}
.main {
  padding-top: 100rpx;
  text-align: center;

  .user {
    width: 80px;
    height: 80px;
    padding: 4px;
    position: relative;
    background: #ebebeb;
    border-radius: 50%;
    margin: 0 auto;

    aside {
      width: 28px;
      height: 28px;
      position: absolute;
      right: 0;
      bottom: 0;
      background: url(../../../static/images/v.png);
      background-size: cover;
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  p {
    padding: 16px 0;
  }

  .year {
    width: 80%;
    margin: 0 auto;
  }

  .item {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  // .line {
  //   width: 94vw;
  //   height: 0;
  //   border-top: 1px solid #ee6767;
  //   margin: 20px auto;
  //   box-shadow: 0 1px 2px #999;
  // }

  .admin button {
    background-color: #f59040;
  }
}
</style>
