<template>
  <div id="app">
    <div class="header">
      <div class="center">
        <a href="#/"><img src="./assets/kuwo.png"></a>
      	<ul>
      		<router-link to="/">
            <li id="find">发现音乐</li>
          </router-link>
      		<li>下载客户端</li>
      		<li>音乐现场</li>
      		<li>VIP会员</li>
      		<li>酷我耳机</li>
      		<li>更多</li>
      	</ul>
      	<div class="right">
      		<input v-loading.fullscreen.lock="fullscreenLoading" @keyup.enter="musicList" v-model="keyword" type="text" class="search" placeholder="请输入你想听的音乐">
      		<span>登录 / 注册</span>
      	</div>
      </div>
    </div>
    <!-- 主体 -->
    <div>
      <router-view></router-view>
    </div>
    <!-- 音乐播放器 -->
    <div v-if="music != 0" style="bottom: 0px;" class="musicPlay" >
    	<div style="width: 60%;" class="center">
    		<div class="audio_con">
    		  <audio ref='audio' :src="music" controls autoplay loop class="myaudio"></audio>
    		</div>
    	</div>
    </div>
    <!-- 网页底部 -->
    <div class="footer">
    	<div class="item center">
    		<div class="content">
    			<p>下载客户端</p>
    			<br>
    				<span>
    					<a href="#">PC端</a>
    					<a href="#">Mac端</a>
    				</span>
    				<span>
    					<a href="#">安卓端</a>
    					<a href="#">苹果端</a>
    				</span>

    		</div>
    		<div class="content">
    			<p>协议与声明</p>
    			<br>

    				<span>
    					<a href="#">用户服务协议</a>
    					<a href="#">用户服务协议</a>
    				</span>
    				<span>
    					<a href="#">用户服务协议</a>
    					<a href="#">用户服务协议</a>
    				</span>

    		</div>
    		<div class="content">
    			<p>其他</p>
    			<br>
    				<span>
    					<a href="#">联系我们</a>
    					<a href="#">腾讯音乐</a>
    					<a href="#">诚聘英才</a>
    				</span>
    				<span>
    					<a href="#">广告服务</a>
    					<a href="#">未成年人家长监护工程</a>
    				</span>

    		</div>
    	</div>
    </div>
    <div class="footer2">
    	<br>
    	<p>356科技有限公司版权所有 丨 网络文化经营许可证：京网文[xxxx]xxx-xxx号  丨 增值电信业务经营许可证xx-xxxxx 丨 京ICP证xxxxxx号</p>
    	<p>根据酷我音乐官网样式制作 丨 根据酷我音乐官网样式制作 丨 根据酷我音乐官网样式制作</p>
    	<p>举报电话：xxx-xxxxxxx 丨 举报邮箱：xxx@xx.cn</p>
    </div>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        keyword:'',
        fullscreenLoading: false
      }
    },
    methods: {
      ...mapMutations(['getMusicList', 'changeRouting']),
      musicList() {
        this.fullscreenLoading = true;
        this.axios.get('/search?keywords='+this.keyword).then(res => {
          this.getMusicList(res.result);
          this.fullscreenLoading = false;
        })
        location.href = '#/music'
      }
    },
    computed: {
      ...mapState(['music', 'currentRouting'])
    },
    mounted() {
      this.changeRouting('index')
    }
  }
</script>
<style>
  *{
  	margin: 0;
  	padding: 0;
  }
  a {
    color: black;
    text-decoration: none;
  }
  a:hover{
  	text-decoration: none;
  }
  .header {
  	width: 100%;
  	height: 80px;
  	border-bottom: 1px solid #f0f0f0;
  }
  .center {
  	width: 85%;
  	margin: auto;
  }
  .header img {
  	width: 131px;
  	height: 39px;
  	margin-top: 15px;
  	float: left;
  	margin-right: 39px;
  }
  .header ul {
  	margin-left: 5%;
  }
  .header ul li {
  	list-style: none;
  	float: left;
  	font-size: 16px;
  	color: #333;
  	background: white;
  	height: 80px;
  	line-height: 80px;
  	padding: 0 17px;
  	cursor: pointer;
  }
  .header #find {
  	background: #f0e423;
  	font-weight: 600;
  }
  .header .right {
  	float: right;
    line-height: 80px;
  }
  .header .right input {
  	height: 20px;
  	width: 280px;
  	padding: 6px;
  	background: #f5f5f5;
  	border: none;
  	outline: none;
  }
  .header .right span {
  	margin-left: 10px;
  	cursor: pointer;
  }
  /* 音乐播放器 */
  .musicPlay{
  	position: fixed;
  	width: 100%;
  	height:50px;
  	bottom: 20px;
  }
  .musicPlay .center a{
  	color: red;
  	border: 1px deepskyblue solid;
  	padding: 2px;
  	background: yellow;
  }
  .musicPlay .center audio{
  	width: 100%;
  	outline: none;
  }
  /* 底部*/
  .footer {
  	margin-top: 50px;
  	height: 200px;
  	background: #282828;
  }
  .footer .item svg {
  	fill: #8a8a8a;
  }
  .footer .item .nav {
  	display: inline-block;
  	margin-right: 40px;
  }
  .footer .item p {
  	display: inline-block;
  	color: white;
  	margin-top: 30px;
  	margin-bottom: 30px;
  	font-size: 14px;
  }
  .footer .item a p{
  	color: grey;
  	margin: 0;
  	font-size: 13px;
  }
  .footer .item a:hover p{
  	color: yellow;
  }
  .footer .item a:hover svg {
  	fill: yellow;
  }
  .footer .svg {
  	margin-left: 10px;
  }
  .footer .content {
  	display: inline-block;
  	margin-right: 1%;
  	width: 30%;
  }
  .footer .content span {
  	display: block;
  	margin-bottom: 10px;
  }
  .footer .content span a {
  	color: grey;
  	text-decoration: none;
  	font-size: 13px;
  	margin-right: 50px;
  }
  .footer .content span a:hover {
  	color: yellow;
  }
  .footer2 {
  	height: 120px;
  	background: #1f1f1f;
  	font-size: 13px;
  	text-align: center;
  	color: grey;
  }
  .footer2 p {
  	margin-top: 5px;
  }
</style>
