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
            {{ item }}
          </swiper-item>
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      list: [1, 2, 3]
    })
  }
</script>

<style>

</style>
