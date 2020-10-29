import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/home.vue')
const Index = () => import('../views/index/index.vue')
const Music = () => import('../views/music/music.vue')
const MV = () => import('../views/play-mv/play-mv.vue')
const SongSheet = () => import('../views/song-sheet/song-sheet.vue')
const SingerDetails = () => import('../views/singer-information/singer-details/singer-details.vue')
const HotMV = () => import('../views/hot-mv/hot-mv.vue')
const RankList = () => import('../views/rank-list/rank-list.vue')
const Singers = () => import('../views/singers/singers.vue')
const PlayLists = () => import('../views/song-sheet/play-lists.vue')
const Error = () => import('../components/Error.vue')
const Album = () => import('../views/singer-information/album/album.vue')
const SingerMV = () => import('../views/singer-information/singer-mv/singer-mv.vue')
const AlbumDetails = () => import('../views/singer-information/album/album-details.vue')
const BriefIntr = () => import('../views/singer-information/singer-info/singer-info.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {title:"听听音乐"},
    children: [
      {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {title:"听听音乐"},
      },
      {
        path: '/singerdetails/:id',
        name: 'SingerDetails',
        component: SingerDetails,
        meta: {title:"歌手单曲"}
      },
      {
        path: '/error',
        name: 'Error',
        component: Error,
        meta: {title:"出错误了!"}
      },
      {
        path: '/singers',
        name: 'Singers',
        component: Singers,
        meta: {title:"歌手排行"}
      },
      {
        path: '/album/:id',
        name: 'Album',
        component: Album,
        meta: {title:"歌手专辑"}
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
        path: '/rankList',
        name: 'RankList',
        component: RankList,
        meta: {title:"音乐排行榜"}
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
        path: '/music/:keyword',
        name: 'Music',
        component: Music,
        props: true,
        meta: {title:"音乐列表"}
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
      }
    ]
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
    path: '/singerdetails',
    redirect: 'singers'
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
