import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../components/Index.vue'
import Music from '../components/Music.vue'
import MV from '../components/MV.vue'
import SongSheet from '../components/SongSheet.vue'
import SingerDetails from '../components/SingerDetails.vue'
import HotMV from '../components/HotMV.vue'
import RankList from '../components/RankList.vue'
import Singers from '../components/Singers.vue'
import PlayLists from '../components/PlayLists.vue'
import Error from '../components/Error.vue'
import Album from '../components/Album.vue'
import SingerMV from '../components/SingerMV.vue'
import AlbumDetails from '../components/AlbumDetails.vue'
import BriefIntr from '../components/BriefIntr.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {title:"听听音乐"}
  },
  {
    path: '/music',
    name: 'Error',
    component: Error,
    meta: {title:"音乐列表"}
  },
  {
    path: '/music/:keyword',
    name: 'Music',
    component: Music,
    props: true,
    meta: {title:"音乐列表"}
  },
  {
    path: '/rankList',
    name: 'RankList',
    component: RankList,
    meta: {title:"音乐排行榜"}
  },
  {
    path: '/mv',
    name: 'HotMV',
    component: HotMV,
    meta: {title:"MV大全"}
  },
  {
    path: '/mv/:id',
    name: 'MV',
    component: MV,
    meta: {title:"音乐MV"}
  },
  {
    path: '/songsheet',
    name: 'PlayLists',
    component: PlayLists,
    meta: {title:"全部歌单"}
  },
  {
    path: '/songsheet/:id',
    name: 'SongSheet',
    component: SongSheet,
    meta: {title:"歌单"}
  },
  {
    path: '/singers',
    name: 'Singers',
    component: Singers,
    meta: {title:"歌手排行"}
  },
  {
    path: '/singerdetails',
    redirect: 'singers'
  },
  {
    path: '/error',
    name: 'Error',
    component: Error,
    meta: {title:"出错误了!"}
  },
  {
    path: '/album',
    redirect: '/error'
  },
  {
    path: '/singermv',
    redirect: '/error'
  },
  {
    path: '/albumdetails',
    redirect: '/error'
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: Album,
    meta: {title:"歌手专辑"}
  },
  {
    path: '/albumdetails/:id',
    name: 'AlbumDetails',
    component: AlbumDetails,
    meta: {title:"专辑详细"}
  },
  {
    path: '/singermv/:id',
    name: 'SingerMV',
    component: SingerMV,
    meta: {title:"歌手MV"}
  },
  {
    path: '/singerdetails/:id',
    name: 'SingerDetails',
    component: SingerDetails,
    meta: {title:"歌手单曲"}
  },
  {
    path: '/singermv/:id',
    name: 'SingerMV',
    component: SingerMV,
    meta: {title:"歌手MV"}
  },
  {
    path: '/singerinfo/:id',
    name: 'BriefIntr',
    component: BriefIntr,
    meta: {title:"歌手简介"}
  },
  {
    path: '/about123321',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
