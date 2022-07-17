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
      	<li @click="returnSingerMV" class="new">MV</li>
        <li @click="returnSingerInfo">简介</li>
      </ul>
      <br><br>
      <div class="mv">
        <ul>
          <li v-for="(i, index) in mv" :key="index">
            <div class="img-p">
              <div @click="getMusicMV(i.id)" :style="'background: url('+i.imgurl+');'" class="img">
                <div class="mask">
                  <img src="../../../assets/播放.png" alt="">
                </div>
              </div>
            </div>
            <p>{{i.name}}</p>
            <p>{{i.artistName}}</p>
          </li>
        </ul>
         <div class="block">
            <el-pagination
              background=""
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[28]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
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
        mv: [],
        fullscreenLoading: true
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
        let mv = await this.axios.get('/artist/mv?limit=300&id='+id);
        //let introduction = await this.axios.get('/artist/desc?id='+id);
        return [music, mv];
      },
      getAlbum(page) {
        let that = this;
        this.axios.get('/artist/mv?id='+this.$route.params.id+'&limit=28&offset='+(page-1)*28).then(res => {
          that.mv = res.mvs;
        })
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 1000)
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
        that.code = res[1].code;
        that.singerDetails = res;
        that.music = res[0];
        that.getAlbum(1);
        //console.log(that.code);
        that.picUrl = that.music.artist.picUrl;
        that.name = that.music.artist.name;
        that.briefDesc = that.music.artist.briefDesc;
        that.total = res[1].mvs.length;
        that.hotSongs = that.music.hotSongs;
        //console.log(this.singerDetails)
      }, err => {
        that.code = 404;
        setTimeout(() => {
          this.fullscreenLoading = false;
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
  .mv ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .mv ul li {
    list-style: none;
    width: 20%;
    margin-bottom: 23px;
  }
  .mv ul li p:nth-child(2) {
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: #333;
    margin-top: 13px;
  }
  .mv ul li p:nth-child(3) {
    color: #666666;
    font-size: 14px;
    margin-top: 5px;
  }
  .mv ul li p:nth-child(2):hover {
    cursor: pointer;
    font-weight: 600;
  }
  .mv ul li p:nth-child(3):hover {
    cursor: pointer;
    color: black;
  }
  .mv .mask,
  .mv .img,
  .mv .img-p {
    width: 241px;
    height: 142px;
    overflow: hidden;
    transition: .5s;
  }
  .mv .img {
    background-size: cover !important;
  }
  .mv .mask {
    opacity: 0;
    background: rgba(0,0,0,.3);
    transition: .5s;
  }
  .mv .mask img {
    width: 50px;
    height: 50px;
    margin-top: 30%;
    margin-left: 50%;
    transform: translate(-50%, -50%);
  }
  .mv ul li .img:hover {
    transform: scale(1.08);
    cursor: pointer;
  }
  .mv ul li .img:hover .mask {
    opacity: 1;
  }
</style>
