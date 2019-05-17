<template>
  <div class="class-table">
    <picker @change="onChange" :value="index" :range="range" range-key="name">
      <h5>学期: <span>{{ range[index].name }}</span></h5>
    </picker>
    <div class="top">
      <div class="week" v-for="(week, i) in weeks" :key="i">
        周{{ week }}
      </div>
    </div>
    <scroll-view scroll-y="true" class="scroll">
      <div class="table-body">
        <div class="left">
          <div class="time" v-for="(time, i) in times" :key="i">
            {{ time }}
          </div>
        </div>
        <div class="lines" v-for="(line, i) in times" :key="i"
        :style="{
          width: '100%',
          marginTop: (i + 1) * 100 + 'rpx',
          position: 'absolute',
          borderBottom: '1px dashed #d9d9d9',
          borderColor: i === 3 ? 'red' : '#d9d9d9'
        }">
        </div>
        <div class="list-item" v-for="(item, i) in wlist" :key="i"
        :style="{
          marginLeft: (item.week - 1) * 100 + 40 + 6 + 'rpx',
          marginTop: (item.beginTime - 1) * 100 + 6 + 'rpx',
          height: item.length * 100 - 12 + 'rpx',
          backgroundColor: colors[i % 8]
        }">
          {{item.name}}
        </div>
      </div>

    </scroll-view>
  </div>
</template>

<script>
import wlists from './tables'

export default {
  data () {
    return {
      index: 0,
      range: wlists,
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      times: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      colors: ['#85B8CF', '#90C652', '#e2a02e', '#FC9F9D', '#0A9A84', '#61BC69', '#12AEF3', '#E29AAD']
    }
  },
  mounted () {

  },
  computed: {
    wlist () {
      return this.range[this.index].wlist
    }
  },
  methods: {
    onChange (e) {
      this.index = Number(e.target.value)
    }
  }
}
</script>

<style lang="less" scoped>
.class-table {
  text-align: center;
  div {
    box-sizing: border-box;
  }
}

// .select {
//   height: 6vh;
//   // line-height: 6vh;

//   b {
//     color: #69c969;
//   }
// }
.scroll {
  height: 84vh;
}

.top {
  display: flex;
  // border-top: 1px solid lightblue;
  // border-bottom: 1px solid lightblue;
  color: #999;
  padding-left: 40rpx;
  background: #ddd;

  .week {
    flex:1;
    width: 100rpx;
    font-size: 14px;
    height: 60rpx;
    line-height: 60rpx;
    background: #eee;
  }
}

.table-body {
  height:720rpx;
  display: flex;
  position: relative;
}

.time {
  width: 40rpx;
  height: 100rpx;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  position: relative;
  background: #eee;;
  color: #999;
  // border-bottom: 1px solid lightblue;
}

.list-item {
  height: 100rpx;
  width: 88rpx;
  position: absolute;
  border-radius: 4px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
h5 {
  font-size: 14px;
  height: 6vh;
  line-height: 6vh;

  span {
    color:rgb(136, 200, 171);
  }
}
</style>
