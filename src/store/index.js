import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  music: 0,
    musicList: 0,
    bang: 0,
    currentRouting: 0,
    MV: 0,
    MVinfo: 0,
    MVcomment: 0
  },
  mutations: {
    playMusic(state, url) {
      state.music = url;
    },
    getMusicList(state, list) {
      state.musicList = list;
    },
    getMusicBang(state, list) {
      state.bang = list;
    },
    changeRouting(state, route) {
      state.currentRouting = route;
    },
    getMV(state, mvurl) {
      state.MV = mvurl;
    },
    getMVinfo(state, info) {
      state.MVinfo = info;
    },
    getMVcomment(state, comment) {
      state.MVcomment = comment;
    }
  },
  actions: {
  },
  modules: {
  }
})
