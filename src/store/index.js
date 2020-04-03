import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  music: 0,
    musicName: 0,
    musicSinger: 0,
    musicSign: 0,
    musicList: 0,
    bang: 0,
    currentRouting: 0,
  },
  mutations: {
    playMusic(state, url) {
      if (url == null) {
       state.musicSign++
      }
      else {
        state.music = url;
      }
    },
    playMusicInfo(state, info) {
      state.musicName = info[0];
      state.musicSinger = info[1];
    },
    getMusicList(state, list) {
      state.musicList = list;
    },
    getMusicBang(state, list) {
      state.bang = list;
    }
  },
  actions: {
  },
  modules: {
  }
})
