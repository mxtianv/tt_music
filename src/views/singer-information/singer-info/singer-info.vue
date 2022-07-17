<template>
  <div v-if="code == 404" class="err">
    <img src="../../../assets/err.png" alt="">
    <p>抱歉，暂无相关数据，重新刷新页面试试吧</p>
    <router-link to="/">
      <div class="fhindex">
        <span>返回首页</span>
      </div>
    </router-link>
  </div>
  <div v-else class="singer-details" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="center">
      <ul id="new1">
      	<router-link to="/">
          <li>推荐</li>
        </router-link>
      	<router-link to="/rankList">
          <li>排行榜</li>
        </router-link>
      	<router-link to="/singers">
          <li class="new">歌手</li>
        </router-link>
      	<router-link to="/songsheet">
          <li>歌单</li>
        </router-link>
      	<router-link to="/mv">
          <li>MV</li>
        </router-link>
      </ul>
    </div>
    <br>
    <div class="singer">
      <div class="introduction center">
        <div class="img">
          <img :src="picUrl" alt="">
        </div>
        <div class="info">
          <p>{{name}}</p>
          <p>{{briefDesc}}</p>
        </div>
      </div>
    </div>
    <div class="center">
      <ul id="new1">
      	<li @click="returnSinger">单曲</li>
      	<li @click="returnAlbum">专辑</li>
      	<li @click="returnSingerMV">MV</li>
        <li @click="returnSingerInfo" class="new">简介</li>
      </ul>
      <br><br>
      <div class="info">
        <div class="title">
          <strong>简介</strong>
        </div>
        <div class="con">
          {{briefintr.briefDesc}}
        </div>
      </div>
      <div class="content" v-for="(i, index) in briefintr.introduction" :key="index">
        <div class="info">
          <div class="title">
            <strong>{{i.ti}}</strong>
          </div>
          <div class="con">
            <p v-html="i.txt"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        music: 0,
        picUrl: '',
        name: '',
        briefDesc: '',
        pagesize: 28,
        currentPage: 1,
        total: 0,
        hotSongs: '',
        singerDetails: '',
        code: 200,
        album: [],
        fullscreenLoading: true,
        briefintr: []
      }
    },
    methods: {
      ...mapMutations(['playMusic', 'getMV', 'getMVinfo', 'getMVcomment', 'playMusicInfo']),
      getMusicUrl(id, name) {
        this.axios.get('/song/url?id='+id).then(res => {
          this.playMusic(res.data[0].url)
        })
        this.playMusicInfo(name)
      },
      getMusicMV(id) {
        this.playMusic(0);
        this.$router.push(`/mv/${id}`)
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getAlbum(val);
        window.scrollTo(0, 0);
      },
      async getSingerDetail(id) {
        let music = await this.axios.get('/artists?id='+id);
        //let mv = await this.axios.get('/artist/mv?id='+id);
        let briefIntr = await this.axios.get('/artist/desc?id='+id);
        //let introduction = await this.axios.get('/artist/desc?id='+id);
        return [music, briefIntr];
      },
      returnSinger() {
        this.$router.push(`/singerdetails/${this.$route.params.id}`)
      },
      returnAlbum() {
        this.$router.push(`/album/${this.$route.params.id}`)

      },
      returnSingerMV() {
        this.$router.push(`/singermv/${this.$route.params.id}`)

      },
      returnSingerInfo() {
        this.$router.push(`/singerinfo/${this.$route.params.id}`) 
      }
    },
    mounted() {
      let that = this;
      //console.log(this.$route.params.id)
      this.getSingerDetail(this.$route.params.id).then(res => {
        that.singerDetails = res;
        that.music = res[0];
        that.picUrl = that.music.artist.picUrl;
        that.name = that.music.artist.name;
        that.briefDesc = that.music.artist.briefDesc;
        that.briefintr = res[1];
        that.fullscreenLoading = false
      }, err => {
        that.code = 404;
        setTimeout(() => {
          that.fullscreenLoading = false;
        }, 1000)
      });
      window.scrollTo(0, 0)
      //console.log(this.music)
    },
    computed: {
      ...mapState([''])
    }
  }
</script>

<style scoped="scoped">
  .con p {
    white-space: pre-line;
  }
  .singer-details ul {
  	margin-left: 15%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .singer-details ul li {
  	list-style: none;
  	margin-left: 30px;
  	float: left;
  	cursor: pointer;
  }
  .singer-details ul .new {
  	font-weight: 600;
  	box-shadow:0px 2px 3px #F0E423;
  }
  .singer {
    margin-top: 20px;
    margin-bottom: 10px;
    height: 300px;
    background: #F5F5F5;
  }
  .singer .introduction {
    display: flex;
    justify-content: space-between;
  }
  .singer .introduction .img {
    width: 22%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .singer .introduction .img img {
    width: 230px;
    height: 230px;
    border-radius: 50%;
  }
  .singer .introduction .info {
    width: 78%;
    height: 260px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .singer .info p:nth-child(1) {
    font-size: 35px;
  }
  .singer .info p:nth-child(2) {
    font-size: 19px;
  }
  .el-table img {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-left: 10px;
  }
  .music_name:hover {
    cursor: pointer;
  }
  .el-table {
    margin-top: 20px;
  }
  .center ul {
  	margin-left: 0%;
    margin-top: 20px;
    margin-bottom: 25px;
  }
  .center ul li {
  	list-style: none;
  	margin-left: 30px;
  	float: left;
  	cursor: pointer;
    font-size: 25px;
  }
  .title {
    font-size: 20px;
    padding-left: 10px;
    border-left: 6px solid #F0E423;
    color: #333;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .con {
    line-height: 25px;
    font-size: 15px;
    color: #666666;
  }
</style>
