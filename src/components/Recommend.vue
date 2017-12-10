<template>
  <div id="recommend" class="mescroll">
    <!-- 下拉刷新消息提示信息 -->
    <span class="updateTip btn btn-danger" v-if="tip">{{tip}}</span>
    <!-- 没有缓存时加载界面 -->
    <div class="load" v-if="!items.length">加载中<i class="fa fa-spinner fa-pulse"></i></div>
    <!-- 有数据时父子组件数据传递 -->
    <ul else-if class="content" id="recommend-datalist">
      <li v-for="(item,key) in items"><post :resData="item" :key="key"></post></li>
    </ul>
  </div>
</template>

<script>
import MeScroll from '../../node_modules/mescroll.js/mescroll.min.js'
import Store from '../store'
// import GetData from './GetData'
import Post from './post'

export default {
  name: 'Recommend',
  data () {
    return {
      type: '-101', // 消息类型
      items: Store.fetch('recommend').slice(0, 20), // 从缓存中读取数据
      preTime: 0, // 上次刷新时间
      currentTime: 0, // 这次刷新时间
      mescroll: null, // 下拉刷新上拉加载插件mescroll提供对象
      tip: '', // 下拉刷新提示消息
      reflashTip: '新来了20条消息', // 下拉刷新成功提示消息
      errorTip: '亲，您的网络出问题咯' // 下拉刷新失败提示消息
    }
  },
  components: {
    Post
  },
  mounted () {
    this.mescroll = new MeScroll('recommend', {
      down: {
        callback: this.downCallback // 下拉刷新方法
      },
      up: {
        callback: this.upCallback, // 上拉加载方法
        toTop: { // 回到顶部图标
          src: 'http://www.mescroll.com/demo/res/img/mescroll-totop.png'
        },
        empty: { // 没有更多数据
          warpId: 'recommend-datalist',
          tip: '亲,暂无相关数据哦~'
        }
      }
    })
  },
  methods: {
    // 获取api数据
    getResData () {
      let date = new Date()
      this.preTime = parseInt(parseInt(this.currentTime) / 1000).toString()
      this.currentTime = date.getTime()
      // 通过配置proxytable实现跨域请求
      this.$http.get('/api/neihan/stream/mix/v1/?mpic=1&webp=1&essence=1&content_type=' + this.type + '&message_cursor=-1&am_longitude=110&am_latitude=120&am_city=%E5%8C%97%E4%BA%AC%E5%B8%82&am_loc_time=' + this.currentTime + '&count=30&min_time=' + this.preTime + '&screen_width=1450&do00le_col_mode=0&iid=3216590132&device_id=32613520945&ac=wifi&channel=360&aid=7&app_name=joke_essay&version_code=612&version_name=6.1.2&device_platform=android&ssmix=a&device_type=sansung&device_brand=xiaomi&os_api=28&os_version=6.10.1&uuid=326135942187625&openudid=3dg6s95rhg2a3dg5&manifest_version_code=612&resolution=1450*2800&dpi=620&update_version_code=6120').then((res) => {
        this.setResData(res.data.data.data)
      }, (res) => {
        this.mescroll.endErr()
        // 刷新失败提示信息
        this.tip = this.errorTip
      })
    },
    // 设置数据
    setResData (data) {
      let preStoreData = Store.fetch('recommend')
      // this.items = data.concat(this.items)
      for (let i in data) {
        this.items.unshift(data[i])
      }
      Store.save('recommend', data.concat(preStoreData))
      this.mescroll.endSuccess()
      // 刷新成功提示信息
      this.tip = this.reflashTip
      // 当localstorage容量满时删除一些旧的数据
      let jugeStoreRoom = Store.fetch('recommend')
      if (jugeStoreRoom.length >= 120) {
        for (let i = 0; i < 20; i++) {
          jugeStoreRoom.pop()
        }
        Store.save('recommend', jugeStoreRoom)
      }
    },
    // 下拉刷新方法
    downCallback () {
      this.tip = ''
      this.getResData()
    },
    // 上拉加载方法
    upCallback (page) {
      let len = this.items.length
      setTimeout(() => {
        this.items = this.items.concat(Store.fetch('recommend').slice(len, len + 10))
        this.mescroll.endBySize(this.items.length, Store.fetch('recommend').length)
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*隐藏垂直滚动条*/
  #recommend::-webkit-scrollbar {
    display:none;
  }

  /*下拉刷新提示信息动画*/
  @-webkit-keyframes tipAnimation{
    0%{
      -webkit-transform: translateY(0);
              transform: translateY(0);
    }
    40%{
      -webkit-transform: translateY(1rem);
              transform: translateY(1rem);
    }
    100%{
      -webkit-transform: translateY(0);
              transform: translateY(0);
    }
  }

  @keyframes tipAnimation{
    0%{
      -webkit-transform: translateY(0);
              transform: translateY(0);
    }
    40%{
      -webkit-transform: translateY(1rem);
              transform: translateY(1rem);
    }
    100%{
      -webkit-transform: translateY(0);
              transform: translateY(0);
    }
  }
  
  /*下拉刷新提示信息*/
  .updateTip{  
    position: absolute;
    top: -.5rem;
    left: 0;
    right: 0;
    padding: 0;
    font-size: .6rem;
    -webkit-animation: tipAnimation 2s ease-in-out 1s;
            animation: tipAnimation 2s ease-in-out 1s;
  }

  /*没有数据时加载界面*/
  .load{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -3.3rem;
    margin-top: -0.85rem;
    width: 6.6rem;
    height: 1.7rem;
    font-size: 1.5rem;
    color: #aaa;
    font-weight: bold;
  }
</style>