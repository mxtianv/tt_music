<template>
  <div class="mv" v-loading.fullscreen.lock="fullscreenLoading">
    <ul id="new1">
    	<router-link to="/">
        <li>推荐</li>
      </router-link>
    	<router-link to="/rankList">
        <li>排行榜</li>
      </router-link>
    	<router-link to="/singers">
        <li>歌手</li>
      </router-link>
    	<router-link to="/songsheet">
        <li>歌单</li>
      </router-link>
    	<router-link to="/mv">
        <li class="new">MV</li>
      </router-link>
    </ul>
    <br>
    <!-- 播放MV -->
    <div style="padding-bottom: 20px;" class="musicMv">
    	<div ref='video' class="video_con">
    		<video style="max-height: 1216px;" ref='video' :src="MV" controls="controls"></video>
        <span>{{MVinfo.name}} - {{MVinfo.artistName}}</span>
        <!--  -->
        <p>{{MVinfo.briefDesc}}</p>
        <div class="introduction">
          <p>{{MVinfo.desc}}</p>
        </div>
    	</div>
    </div>
    <!-- 热门评论 -->
    <div class="comment">
      <h3 style="font-size: 28px;font-weight: 600;margin-bottom: 30px;display: inline-block;">热门评论</h3>
      <div class="user" v-for="(i, index) in MVcomment" :key="index">
        <div class="img">
          <img :src="i.user.avatarUrl" alt="">
        </div>
        <div class="content">
          <strong>{{i.user.nickname}}</strong>
          <p>{{i.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        MV: '',
        MVinfo: '',
        MVcomment: '',
        fullscreenLoading: true
      }
    },
    methods: {
      getMV(id) {
        let that = this;
        this.axios.get('/mv/url?id='+id).then(res => {
          this.MV = res.data.url;
          that.fullscreenLoading = false;
        });
        this.axios.get('/mv/detail?mvid='+id).then(res => {
          this.MVinfo = res.data;
        });
        this.axios.get('/comment/mv?id='+id).then(res => {
          if (res.hotComments.length <= 50) {
            this.MVcomment = res.hotComments;
          }
          //console.log(res.hotComments)
        })
      }
    },
    mounted() {
      this.getMV(this.$route.params.id);
      window.scrollTo(0, 0)
    },
    computed: {

    }
  }
</script>

<style scoped="scoped">
  .nav {
    display: inline-block;
    margin-top: 25px;
    margin-left: 20%;
  }
  .nav a {
  	margin-left: 30px;
  	float: left;
  }
  .nav .new {
  	font-weight: 600;
  	box-shadow:0px 2px 3px #F0E423;
  }
  .musicMv {
    background: #333;
  }
  .video_con,
  .comment {
    width: 80%;
    margin: auto;
    margin-top: 20px;
  }
  .musicMv video {
    width: 100%;
    margin-bottom: 20px;
  }
  .musicMv span {
    font-size: 26px;
    font-weight: 600;
    color: hsla(0,0%,100%,.8);
    display: inline-block;
    margin-bottom: 20px;
  }
  .musicMv p {
    font-size: 20px;
    font-weight: 600;
    color: hsla(0,0%,100%,.8);
    margin-bottom: 10px;
  }
  .introduction p {
    font-size: 16px;
    font-weight: 300;
    color: hsla(0,0%,100%,.8);
    display: inline-block;
    margin-bottom: 20px;
  }
  .user {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
  }
  .img {
    width: 10%;
  }
  .user img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .user .content {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
  }
</style>
