<template>
  <!-- 每组数据显示组件 -->
  <div class="post">
    <figure class="well">
      <!-- 用户头像 -->
    	<img v-lazy="resData.group.user.avatar_url" alt="头像" class="img-circle">
      <!-- 用户昵称 -->
	    <span>{{resData.group.user.name}}</span>
      <!-- 消息内容 -->
	    <h4 class="conten-title">{{resData.group.content}}</h4>
      <!-- 消息类型 -->
	    <a href="#" class="vue-type">{{resData.group.category_name}}</a>
      <figcaption>
        <!-- 图片 -->
        <type-pic v-if="picShow" :data="resData"></type-pic>
        <!-- 视频 -->
        <type-video v-if="videoShow" :data="resData"></type-video> 
        <!-- 神评论 -->
        <div class="hot-comment" v-if="commentsShow">
          <button type="button" class="btn btn-danger">神评论</button>
          <div class="well">
            <img v-lazy="resData.comments[0].user_profile_image_url" alt="头像" class="img-circle">
            <span>{{resData.comments[0].user_name}}</span>
            <h4 class="conten-title">{{resData.comments[0].text}}</h4>
            <div class="digg"><i class="fa fa-thumbs-up"></i> {{resData.comments[0].digg_count}}</div>
          </div>
        </div>
        <footer class="footer">
          <ul>
            <!-- 点赞 -->
            <li><i class="fa fa-thumbs-up"></i> {{resData.group.digg_count}}</li>
            <!-- 不喜欢 -->
            <li><i class="fa fa-thumbs-down"></i> {{resData.group.bury_count}}</li>
            <!-- 评论 -->
            <li><i class="fa fa-comment"></i> {{resData.group.comment_count}}</li>
            <!-- 转发 -->
            <li><i class="fa fa-share"></i> {{resData.group.share_count}}</li>
          </ul>
        </footer>
      </figcaption> 
	  </figure>
  </div>
</template>

<script>
import TypeVideo from './type-video'
import TypePic from './type-pic'
export default {
  name: 'post',
  props: {
    resData: ''
  },
  data () {
    return {
      video: []
    }
  },
  components: {
    TypeVideo, TypePic
  },
  computed: {
    // 判断是否有神评论
    commentsShow: function () {
      if (this.resData.comments[0] && this.resData.type === 1) {
        return true
      } else {
        return false
      }
    },
    // 判断类型是否是video
    videoShow: function () {
      if (this.resData.group.is_video && this.resData.type === 1) {
        return true
      } else {
        return false
      }
    },
    // 判断类型是否是图片
    picShow: function () {
      if (this.resData.group.large_image && this.resData.type === 1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  figure.well{
    margin-top: .5rem;
    margin-bottom: 0;
    background-color: #fff;
  }

  .img-circle{
  	width: 1.5rem;
  	height: 1.5rem;
  }

  .conten-title{
    margin: .5rem 0;
    line-height: 1.2;
  }

  .vue-type{
    display: inline-block;
    padding: .2rem .5rem;
    margin-bottom: .6rem;
    text-align: center;
    border: 1px solid #5e96b4;
    border-radius: .4rem;
    color: #5e96b4;
    background-color: #fff;
  }
  
  .hot-comment{
    margin-top: .7rem;
  }

  .hot-comment .well{
    position: relative;
  }

  .hot-comment .digg{
    position: absolute;
    right: 1rem;
    top: 1rem;
    color: #999;
  }

  .footer{
    margin-top: .5rem;
    color: #999;
  }

  .footer ul{
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 0;
    overflow: hidden;
  }

  .footer li{
    display: inline-block;
    width: 25%;
    color: #999;
    font-size: .7rem;
    text-align: center;
  }
  
  .footer i{
    font-size: 1rem;
  }
</style>