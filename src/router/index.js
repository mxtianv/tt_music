import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const Index = () => import('../components/Index.vue')
const Music = () => import('../components/Music.vue')
const MV = () => import('../components/MV.vue')
const SongSheet = () => import('../components/SongSheet.vue')
const SingerDetails = () => import('../components/SingerDetails.vue')
const HotMV = () => import('../components/HotMV.vue')
const RankList = () => import('../components/RankList.vue')
const Singers = () => import('../components/Singers.vue')
const PlayLists = () => import('../components/PlayLists.vue')
const Error = () => import('../components/Error.vue')
const Album = () => import('../components/Album.vue')
const SingerMV = () => import('../components/SingerMV.vue')
const AlbumDetails = () => import('../components/AlbumDetails.vue')
const BriefIntr = () => import('../components/BriefIntr.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {title:"听听音乐"}
  },
  {
    path: '*',
    redirect: '/error',
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
