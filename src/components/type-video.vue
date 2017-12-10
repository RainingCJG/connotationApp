<template>
  <div class="typevideo">
    <video ref="video" class="video" :src="data.group.mp4_url" :poster="data.group.medium_cover.url_list[0].url">
      <source type="video/mp4">
    </video>
    <!-- 播放按钮 -->
    <i class="fa fa-play-circle-o" @click="play" v-if="showplaybutton"></i>
    <!-- <i class="fa fa-spinner fa-pulse" v-else></i> -->
    <!-- 播放数次和时长 -->
    <div class="mask" v-if="showplaybutton">
      <span class="play-count">{{data.group.play_count}}</span> 次播放
      <span class="play-time">{{playtime}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'typevideo',
  props: {
    data: ''
  },
  data () {
    return {
      video: '', // video对象
      showplaybutton: true // 显示播放按钮
    }
  },
  computed: {
    // 计算获取的数据的播放时长按mm ：ss格式显示
    playtime: function () {
      let duration = this.data.group.duration
      let seconds = ('0' + parseInt(duration) % 60).slice(-2)
      let minutes = ('0' + parseInt(parseInt(duration) / 60)).slice(-2)
      return (minutes + ':' + seconds)
    }
  },
  mounted () {
    // 通过ref获取video对象
    this.video = this.$refs.video
  },
  methods: {
    // 点击播放按钮播放
    play: function () {
      let video = this.video
      video.play()
      video.controls = true
      this.showplaybutton = false
      // 设置播放结束时状态
      let timer = setInterval(() => {
        if (video.ended) {
          video.controls = false
          this.showplaybutton = true
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .typevideo{
    position: relative;
    overflow: hidden;
  }

  .typevideo,
  .typevideo .video{
    width: 100%;
    height: 10rem;
  }

  .typevideo .poster{
    position: absolute;
    top: 0;
    width: 100%;
    height: 10rem;
  }

  .typevideo .fa-play-circle-o,
  .typevideo .fa-spinner{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3rem;
    height: 3rem;
    text-align: center;
    margin-left: -1.5rem;
    margin-top: -1.5rem;
    color: #ccc;
    font-size: 3rem;
  }

  .typevideo .mask{
    position: relative;
    height: 2rem;
    width: 100%;
    line-height: 2rem;
    background-color: rgba(0,0,0,.5);
    margin-top: -2.1rem;
    color: #fff;
    z-index: 1;
  }

  .typevideo .play-count{
    float: left;
    text-indent: 1rem;
    color: #ff819f;
  }

  .typevideo .play-time{
    float: right;
    margin-right: 1rem;
  }
</style>