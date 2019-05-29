<template>
  <div>
    <h2>请假审批</h2>
    <div class="date">
      <div class="left">
        <picker
          mode="date"
          :value="start"
          :start="D().format('YYYY-MM-DD')"
          :end="D().add(1, 'y').format('YYYY-MM-DD')"
          @change="onStartChange">
          开始时间：{{start}}
        </picker>
      </div>
      <div class="right">
        <picker
          mode="time"
          :value="startTime"
          start="00:00"
          end="24:00"
          @change="onStartTimeChange">
          {{startTime}}
        </picker>
      </div>
    </div>
    <div class="date">
      <div class="left">
        <picker
          mode="date"
          :value="start"
          :start="D().format('YYYY-MM-DD')"
          :end="D().add(1, 'y').format('YYYY-MM-DD')"
          @change="onEndChange">
          结束时间：{{end}}
        </picker>
      </div>
      <div class="right">
        <picker
          mode="time"
          :value="startTime"
          start="00:00"
          end="24:00"
          @change="onEndTimeChange">
          {{endTime}}
        </picker>
      </div>
    </div>
    <div class="teacher">
      <picker @change="bindPickerChange" :value="index" :range="array">
      审批老师：{{array[index]}}
      </picker>
    </div>
    <div class="content">
      请假事由：
      <textarea v-model="content" cols="30" rows="6"></textarea>
    </div>
    <button type="primary" @click="submit">提交</button>
  </div>
</template>

<script>
import D from 'dayjs'

import { showFail, showSuccess } from '@/utils'

const db = wx.cloud.database()

export default {
  data: () => ({
    D,
    start: D().format('YYYY-MM-DD'),
    end: D().format('YYYY-MM-DD'),
    startTime: '00:00',
    endTime: '24:00',
    content: '',
    index: 0,
    array: ['李赛', '王贵宇', '杨超', '赵帅']
  }),
  onHide () {
    this.content = ''
    this.start = D().format('YYYY-MM-DD')
    this.end = D().format('YYYY-MM-DD')
    this.startTime = '00:00'
    this.endTime = '24:00'
  },
  methods: {
    check () {
      if (D(this.start).valueOf() > D(this.end).valueOf()) {
        showFail('开始时间不能大于结束时间')
      }
    },
    onStartChange (e) {
      this.start = e.mp.detail.value
      this.check()
    },
    onStartTimeChange (e) {
      this.startTime = e.mp.detail.value
    },
    onEndChange (e) {
      this.end = e.mp.detail.value
      this.check()
    },
    onEndTimeChange (e) {
      this.endTime = e.mp.detail.value
    },
    bindPickerChange (e) {
      this.index = Number(e.mp.detail.value)
    },
    submit () {
      // approval
      if (D(this.start).valueOf() > D(this.end).valueOf()) {
        showFail('开始时间不能大于结束时间')
        return false
      }
      if (!this.content) {
        showFail('请填写请假事由')
        return false
      }
      db.collection('approval').add({
        data: {
          start: this.start,
          startTime: this.startTime,
          end: this.end,
          endTime: this.endTime,
          content: this.content,
          teacher: this.array[this.index],
          allow: false
        }
      })
        .then(res => {
          showSuccess('提交成功')
          setTimeout(() => {
            wx.navigateBack({
              delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            })
          }, 300)
        })
        .catch(() => {
          showFail('提交失败，请稍后重试')
        })
    }
  }
}
</script>

<style scoped lang="less">
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.date {
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 30px;

  .left {
    width: 60vw;
    float: left;
  }

  .right {
    width: 40vw;
    float: left;
  }
}
.teacher {
  margin-bottom: 20px;
}

textarea {
  padding: 10px;
  width: 90vw;
  border: 1px solid #333;
  border-radius: 4px;
  margin: 20px auto;
}
</style>
