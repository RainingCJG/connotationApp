import Vue from 'vue'
import Router from 'vue-router'
import Loadmore from 'vue-loadmore'
import Concern from '@/components/Concern'
import Recommend from '@/components/Recommend'
import Video from '@/components/Video'
import Pic from '@/components/Pic'
import Jokes from '@/components/Jokes'
import Login from '@/components/login'

Vue.use(Router)
Vue.use(Loadmore)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/concern',
      name: 'Concern',
      component: Concern,
      children: [
        {path: '/concern/login', component: Login}
      ]
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/pic',
      name: 'Pic',
      component: Pic
    },
    {
      path: '/jokes',
      name: 'Jokes',
      component: Jokes
    }
  ]
})
