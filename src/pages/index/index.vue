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
  methods: {
    bindClassroom () {
      mpvue.navigateTo({url: '/pages/classroom/main'})
    },
    bindClassTable () {
      mpvue.navigateTo({url: '/pages/classTable/main'})
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  text-align: center;
  div {
    box-sizing: border-box;
  }
}
</style>
