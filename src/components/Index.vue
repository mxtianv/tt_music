<template>
  <div class="index center">
    <ul id="new1">
    	<li class="new">推荐</li>
    	<li>排行榜</li>
    	<li>歌手</li>
    	<li>歌单</li>
    	<li>MV</li>
    </ul>
    <br><br>
    <el-carousel height="375px" :interval="5000">
      <el-carousel-item v-for="(i, index) in banner" :key="index">
        <img :src="i.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="recommend">
    	<h3 style="font-size: 28px;font-weight: 600;margin-bottom: 10px;">推荐歌单</h3>
    	<div id="new2" class="nav">
    		<a class="new" href="javascript:;">每日推荐</a>
    		<a href="javascript:;">翻唱</a>
    		<a href="javascript:;">网络</a>
    		<a href="javascript:;">伤感</a>
    		<a href="javascript:;">欧美</a>
    		<a href="javascript:;">更多</a>
    	</div>
    	<br><br>
    	<div class="Item">
    		<div class="item" v-for="(i, index) in img" :key="index">
    			<img @click="getrecommendSongs(i.id)" :src="i.coverImgUrl" >
    			<p>{{i.nickname}}</p>
    		</div>
    	</div>
    </div>
    <!-- 精彩活动 -->
    <div class="activity">
    	<h3 style="font-size: 28px;font-weight: 600;margin-bottom: 25px;">精彩活动</h3>
    	<div id="img">
    		<div class="img1">
    			<img src="../assets/activity1.jpg" >
    		</div>
    		<div class="img1">
    			<img src="../assets/activity2.jpg" >
    		</div>
    	</div>
    </div>
    <!-- 排行榜-->
    <div class="recommend ranking">
    	<h3 style="font-size: 28px;font-weight: 600;margin-bottom: 25px;">排行榜</h3>
    	<div class="nav">
    		<a href="javascript:;">更多</a>
    	</div>
    	<p></p>
      <div class="Bang">
        <div class="bang" v-for="(i, index) in bang" :key="index">
          <div class="top" :style="'background: url('+i.creator.backgroundUrl+')'">
            <div class="top_bg">
              <img :src="bangImg2[index].img" >
            </div>
          </div>
          <ul>
            <li v-for="j in 5" :key="j">
              <span class="p_id">{{j}}</span>
              <div class="title">
                <div class="music_name">
                  <span @click="getMusicUrl(i.tracks[j].id)">{{i.tracks[j].name}}</span>
                </div>
                <p>{{i.tracks[j].ar[0].name}}</p>
              </div>
            </li>
          </ul>
          </div>
        </div>
    </div>
    <!-- 歌手推荐 -->
    <div class="singerRrecommendation">
    	<div class="recommend">
    		<h3 style="font-size: 28px;font-weight: 600;margin-bottom: 15px;">歌手推荐</h3>
    		<div id="new2" class="nav">
    			<a class="new" href="javascript:;">华语</a>
    			<a href="javascript:;">欧美</a>
    			<a href="javascript:;">日韩</a>
    			<a href="javascript:;">组合</a>
    			<a href="javascript:;">更多</a>
    		</div>
    		<p></p>
    	</div>
    	<div class="peopleImg">
    		<div class="content" v-for="(i, index) in singerImg" :key="index">
    			<img v-loading.fullscreen.lock="fullscreenLoading" @click="getAsyncSingerDetail(i.id)" :src="i.img1v1Url" >
    			<p>{{i.name}}</p>
    			<p>{{i.musicSize}}首歌曲</p>
    		</div>
    	</div>
    </div>
    <!-- 主播电台 -->
    <div class="anchorStation">
    	<div class="recommend">
    		<h3 style="font-size: 28px;font-weight: 600;margin-bottom: 10px;">主播电台</h3>
    		<a class="more">
    			<span>畅听更多精品电台</span>
    		</a>
    	</div>
    	<div class="content" v-for="i in 3" :key="i">
    		<div class="list" v-for="j in 3" :key="j">
    			<div class="list_img">
    				<img v-if="radioStation[j+1]" :src="radioStation[j+1].picUrl" >
    			</div>
    			<div class="text">
    				<p v-if="radioStation[j+1]">{{radioStation[j+1].name}}</p>
    				<p v-if="radioStation[j+1]">{{radioStation[j+1].copywriter}}</p>
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
        img: [],
        banner: [],
        bangImg1:[],
        bangImg2:[
          {'img': require('../assets/p1.png')},
          {'img': require('../assets/p2.png')},
          {'img': require('../assets/p3.png')},
          {'img': require('../assets/p4.png')},
          {'img': require('../assets/p5.png')}
        ],
        singerImg:[],
        radioStation:[],
        fullscreenLoading:false
      }
    },
    methods: {
      ...mapMutations(['playMusic', 'getMusicBang', 'getRecommendSongs', 'getsingerDetails']),
      // 获取歌单封面
      getSongSheetImg() {
        let that = this;
        this.axios.get("/top/playlist?limit=5&order=new").then(res => {
          that.img = res.playlists;
        })
      },
      // 获取歌单详细
      getrecommendSongs(id) {
        this.fullscreenLoading = true;
        this.axios.get("/playlist/detail?id="+id).then(res => {
          this.getRecommendSongs(res.playlist)
        })
        setTimeout(() => {
          this.fullscreenLoading = false;
          location.href = '#/songsheet'
        }, 1500) 
      },
      // 获取 Banner
      getBanner() {
        let that = this;
        this.axios.get("/banner").then(res => {
          that.banner = res.banners;
        })
      },
      // 获取音乐排行榜
      async getBang() {
        let music1 = await this.axios.get('/top/list?idx=0')
        let music2 = await this.axios.get('/top/list?idx=1')
        let music3 = await this.axios.get('/top/list?idx=2')
        let music4 = await this.axios.get('/top/list?idx=3')
        let music5 = await this.axios.get('/top/list?idx=4')
        return [music1.playlist,
                music2.playlist,
                music3.playlist,
                music4.playlist,
                music5.playlist
        ];
      },
      // 歌手推荐
      getSingerImg() {
        let that = this;
        this.axios.get("/top/artists?offset=0&limit=6").then(res => {
          that.singerImg = res.artists;
        })
      },
      // 推荐电台
      getRadioStation() {
        let that = this;
        this.axios.get("/personalized/djprogram").then(res => {
          that.radioStation = res.result;
        })
      },
      // 播放音乐
      getMusicUrl(id) {
        this.axios.get('/song/url?id='+id).then(res => {
          this.playMusic(res.data[0].url);
        })
      },
      // 歌手详细
      async getSingerDetail(id) {
        let music = await this.axios.get('/artists?id='+id);
        let mv = await this.axios.get('/artists?id='+id);
        let album = await this.axios.get('/artists?id='+id);
        let introduction = await this.axios.get('/artists?id='+id);
        return [music, mv, album, introduction];
      },
      getAsyncSingerDetail(id) {
        this.fullscreenLoading = true;
        this.getSingerDetail(id).then(res => {
          this.getsingerDetails(res);
        });
        setTimeout(() => {
          this.fullscreenLoading = false;
          location.href = '#/singerdetails';
        }, 1500)
      }
    },
    computed: {
      ...mapState(['music', 'bang'])
    },
    mounted() {
      this.getSongSheetImg();
      this.getBanner();
      this.getBang().then(data => {
        //this.bang = data;
        this.getMusicBang(data)
        //console.log(this.bang)
      });
      this.getSingerImg();
      this.getRadioStation();
    }
  }
</script>

<style scoped="scoped">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .index {
  	margin-top: 13px;
  }
  .index ul {
  	margin-left: 15%;
  }
  .index ul li {
  	list-style: none;
  	margin-left: 30px;
  	float: left;
  	cursor: pointer;
  }
  .index ul .new {
  	font-weight: 600;
  	box-shadow:0px 2px 3px #F0E423;
  }
  .index .recommend {
  	margin-top: 40px;
  	width: 100%;
  }
  .index .recommend a {
    color: black;
    text-decoration: none;
  }
  .index .recommend h3 {
  	font-size: 28px;
  	display: inline-block;
  }
  .index .recommend .nav,
  .musiclist .nav {
  	display: inline-block;
  }
  .index .recommend .new,
  .musiclist .new {
  	font-weight: 600;
  	box-shadow:0px 2px 3px #F0E423;
  }
  .index .recommend .nav a,
  .musiclist a {
  	margin-left: 20px;
  }
  .index .recommend .Item {
  	display: -webkit-flex; /* Safari */
  	display: flex;
  	justify-content: space-between;
  }
  .index .recommend .item {
  	width: 19.3%;
  }
  .index .recommend .item img {
  	width: 100%;
  	height: 241px;
    border: 1px solid mediumslateblue;
  }
  .index .recommend .item p {
  	margin-top: 15px;
  	font-size: 16px;
  }
  .index .activity {
  	margin-top: 30px;
  }
  .index .activity .img1 {
  	width: 49%;
  }
  .index .activity img {
  	width: 100%;
  	height: 206.133px;
  }
  .index #img {
  	display: -webkit-flex; /* Safari */
  	display: flex;
  	justify-content: space-between;
  }
  .Item img:hover {
    cursor: pointer;
  }
  .Bang {
  	display: -webkit-flex; /* Safari */
  	display: flex;
  	justify-content: space-between;
  }
  .Bang .title span,
  .Bang .title p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .ranking .bang {
  	width: 19%;
  	background: #F8F8F8;
  	border: 1px solid transparent;
  }
  .ranking .bang ul {
  	margin-top: 30px;
  }
  .ranking .bang .title {
  	display: inline-block;
  }
  .ranking .bang ul li {
  	margin: 0;
  	margin-top: 18px;
  }
  .ranking .bang ul li:last-child {
    margin-bottom: 18px;
  }
  .ranking .bang .music_name {
  	display: inline-block;
  	overflow: hidden;
  	width: 150px;
  	height: 20px;
  }
  .ranking .bang .p_id {
  	margin-right: 10px;
  	font-weight: 600;
  	font-size: 17px;
  }
  .ranking .bang ul span {
  	margin-left: 10px;
  	font-size: 16px;
  }
  .ranking .bang ul p {
  	margin-left: 10px;
  	font-size: 14px;
  	color: #999;
  }
  .ranking .bang .title span:hover{
  	font-weight: 600;
  }
  .ranking .bang .top {
  	height: 160px;
  	background: red;
  }
  .ranking .bang .top img {
  	width: 130px;
  	height: 70px;
  	margin-left: 23%;
  	margin-top: 15%;
  }
  .ranking .bang .top_bg {
  	height: 160px;
  	background: rgba(46,32,60,.2);
  }
  /*推荐歌手  */
  .singerRrecommendation .peopleImg img {
  	width: 166px;
  	height: 166px;
  	border-radius: 50%;
  	margin-bottom: 10px;
  }
  .singerRrecommendation .peopleImg img:hover {
  	cursor: pointer;
  }
  .singerRrecommendation .peopleImg {
    margin-top: 23px;
  	text-align: center;
    display: flex;
    justify-content: space-between;
  }
  .singerRrecommendation .content p:nth-child(2){
  	font-size: 17px;
  }
  .singerRrecommendation .content p:nth-child(3){
  	font-size: 14px;
  	color: #999;
  }
  /* 主播电台 */
  .anchorStation .more {
  	display: inline-block;
  	margin-left: 20px;
  	padding: 18px;
  	width: 13%;
  	background: #ffdf1f;
  	border-radius: 20px;
  	line-height: 0px;
  	text-align: center;
  }
  .anchorStation .more:hover {
  	cursor: pointer;
  }
  .anchorStation .content {
  	display: flex;
  	justify-content: space-between;
  }
  .anchorStation .content img {
  	width: 82px;
  	height: 82px;
  }
  .anchorStation .content img:hover {
  	cursor: pointer;
  }
  .anchorStation .content .list {
  	width: 30%;
  	height: 100px;
  	margin-top: 20px;
  }
  .anchorStation .content .list .list_img {
  	float: left;
  }
  .anchorStation .content .text {
  	float: left;
  	margin-left: 20px;
  }
  .anchorStation .content .text p {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 5%;
  }
  .anchorStation .content .text p:nth-child(1):hover {
  	font-weight: 600;
  	cursor: pointer;
  }
  .anchorStation .content .text p:nth-child(2):hover {
  	cursor: pointer;
  }
  .anchorStation .content .text p:nth-child(1) {
  	font-size: 18px;
  	margin-top: 15px;
  }
  .anchorStation .content .text p:nth-child(2) {
  	font-size: 15px;
  	color: #999999;
  }
</style>
