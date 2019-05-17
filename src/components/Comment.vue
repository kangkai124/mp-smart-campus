<template>


  <div class="book-card">
    <div class="user-thumb">
      <img :src="comment.img"
            class="img"
            mode="aspectFit"
            />
    </div>
    <div class="detail">
      <div class="row text-primary">
        <div class="right">

          <Rate theme="red" :value='comment.rate'></Rate>
        </div>
        <div class="left">
          {{comment.user}}
        </div>
      </div>

      <div class="row">
        <div class="right">
           {{comment.content}}
        </div>
        <div class="left">
         {{comment.date}}
        </div>
      </div>


    </div>
  </div>


</template>
<script>
        // rate,
        // user:$(v).find('.avatar>a').attr('title'),
        // date:$(v).find('.comment-info').children().last().text(),

        // content:$(v).find('.short').text()
import Rate from 'vue-tiny-rate'
export default {
  components: {
    Rate
  },
  props: ['comment']
}
</script>
<style lang='less' scoped>
.book-card{
  padding:5px;
  overflow: hidden;
  margin-top:5px;
  margin-bottom:5px;
  font-size:14px;
  .user-thumb{
    width:40px;
    height:40px;
    float: left;
    margin:0 auto;
    overflow:hidden;

    .img{
      max-width: 100%;
      max-height: 100%;
      border-radius: 50%;
    }
  }
  .detail{
    margin-left: 50px;
    .row{
      line-height:20px;
      margin-bottom:3px;
    }
    .right{
    // background: red;
    // width:150px;
      float: right;

    }
    .left{
      margin-right:80px;
    }
  }

}
</style>










