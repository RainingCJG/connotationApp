<template>
  <div id="app">
    <nav>
      <h2 class="title">内涵段子导航栏</h2>
      <ul>
        <router-link v-for="(item,index) in routerLink" :key="index" :to="item.type" tag="li">{{item.content}}</router-link>
      </ul>
    </nav>
    <!-- 左右滑动切换导航栏 -->
    <div class="content" 
      @touchstart="start($event)"
      @touchmove="move($event)"
      @touchend="end($event)">
      <transition :name="togglename">
        <router-view class="routerview"/>
      </transition>
    </div>
    
  </div>
</template>

<script>
// 通过getBoundingClientRect（）方法设置当前设备的fontsize以适配各种不同分辨率的设备
(function () {
  var html = document.documentElement
  var width = html.getBoundingClientRect().width

  html.style.fontSize = width / 16 + 'px'
})()

export default {
  name: 'app',
  data () {
    return {
      routerLink: [
        {type: '/recommend', content: '推荐'},
        {type: '/video', content: '视频'},
        {type: '/pic', content: '图片'},
        {type: '/jokes', content: '段子'},
        {type: '/concern', content: '登录'}
      ],
      routers: [
        '/recommend',
        '/video',
        '/pic',
        '/jokes',
        '/concern'
      ],
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      moveToX: 0,
      moveToY: 0,
      togglename: '' // 左滑还是右滑
    }
  },
  watch: {
    // 路由切换时设置是左滑还是右滑
    '$route' (to, from) {
      let toindex = this.routers.indexOf(to.path)
      let fromindex = this.routers.indexOf(from.path)
      if (toindex >= 0 && fromindex >= 0) {
        if (toindex > fromindex) {
          this.togglename = 'slide-left' // 左滑
        } else {
          this.togglename = 'slide-right' // 右滑
        }
      }
    }
  },
  methods: {
    // 开始滑动的方法
    start (e) {
      e.stopPropagation()
      this.startX = e.changedTouches[0].clientX
      this.startY = e.changedTouches[0].clientY
    },
    // 滑动过程方法
    move (e) {
      e.stopPropagation()
      this.moveToX = e.changedTouches[0].clientX
      this.moveToY = e.changedTouches[0].clientY
      this.moveX = this.moveToX - this.startX
      this.moveY = this.moveToY - this.startY
    },
    // 滑动结束时方法
    end (e) {
      let index = this.routers.indexOf(this.$route.path)
      if (Math.abs(this.moveX) > Math.abs(this.moveY) && Math.abs(this.moveX) > 60 && this.moveX && index >= 0) {
        if (this.moveX < 0) {
          if (index < this.routers.length - 1) {
            this.$router.push(this.routers[index + 1])
          }
        } else {
          if (index > 0) {
            this.$router.push(this.routers[index - 1])
          }
        }
      }
    }
  }
}
</script>

<style>
@import '../node_modules/mescroll.js/mescroll.min.css';
body,html{
  -webkit-overflow-scrolling: touch; 
}

html,body,input,a,div,ul,li,nav,h1,h2,h3,h4,h5,h6,img,header,footer,figure,figcaption,section,span,video{
  margin: 0;
  padding: 0;
}

/*清除输入框内阴影*/
input,select,textarea,button{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: .6rem;
  border: 0;
  -webkit-appearance: none;
          appearance: none;
  outline: none;
  background-color: #fff;
}

ul{
  list-style: none;
}

a{
  font-size: .6rem;
  color: black;
  text-decoration: none;
}

img{
  vertical-align: middle;
}

body{
  padding-top: 1.5rem;
  overflow: hidden;
  overflow-y: auto;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: .7rem;
  line-height: 1.2;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*禁止文本缩放 字体设置  取消touch高亮效果*/
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overflow: hidden;
}

#app .title{
  position: absolute;
  left: -9999rem;
}

#app nav{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 2rem;
  text-align: center;
  background-color: #000;
  white-space: nowrap;
  text-overflow: auto;
  font-size: 0;
  z-index: 2;
}

#app nav li{
  display: inline-block;
  width: 20%;
  height: 2rem;
  line-height: 2rem;
  font-weight: bold;
  color: #fff;
  font-size: .7rem;
}

/*router*/
.routerview{
  position: absolute;
  left: 0;
  top: 1.5rem;
  width: 100%;
  height: 100%;
}

/*****往左滑动*****/
/*prerouter*/
.slide-left-leave-active{
  transition: all .25s ease-in-out;
  -webkit-transform: translateX(-100%); 
          transform: translateX(-100%);
}

/*currouter*/
.slide-left-enter{
  -webkit-transform: translateX(100%); 
          transform: translateX(100%);
}

.slide-left-enter-active{
  transition: all .25s ease-in-out;
}

/*****往右滑动*****/
/*prerouter*/
.slide-right-enter{
  -webkit-transform: translateX(-100%);
          transform: translateX(-100%);
}

.slide-right-enter-active{
  transition: all .25s ease-in-out;
}

/*currouter*/
.slide-right-leave-active{
  -webkit-transform: translateX(100%);
          transform: translateX(100%);
  transition: all .25s ease-in-out;
}

.router-link-active {
	background-color: #ff819f;
}
</style>
