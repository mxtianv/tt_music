<template>
  <div id="app">
    <div class="rightfixed fh0">
    	<ul>
         <li><i class="el-icon-postcard"></i></li>
         <li><i class="el-icon-headset"></i></li>
         <li><i class="el-icon-mobile"></i></li>
         <li><i class="el-icon-monitor"></i></li>
         <li class="fh"><i class="el-icon-arrow-up"></i></li>
    	</ul>
    </div>
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
      		<input @keyup.enter="musicList" v-model="keyword" type="text" class="search" placeholder="请输入你想听的音乐">
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
    					<a href="#">Windows端</a>
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
        })

        location.href = '#/music'
      },
      fanhui() {
      	if(this.$(document).scrollTop() >= 500)
      	this.$(".fh0").fadeIn();
      	else this.$(".fh0").fadeOut();
      }
    },
    computed: {
      ...mapState(['music', 'currentRouting'])
    },
    mounted() {
      let that = this;
      this.changeRouting('index');
      this.$(".fh0").hide();
      this.fanhui();
      this.$(window).scroll(function(){
      		that.fanhui();
      });
      this.$(".fh").click(function(){
      	that.$("body, html").stop().animate({
      		scrollTop: 0
      	});
      });
    }
  }

</script>
<style>
  *{
  	margin: 0;
  	padding: 0;
    box-sizing: border-box;
  }
  a {
    color: black;
    text-decoration: none;
  }
  a:hover{
  	text-decoration: none;
  }
  .err {
    width: 520px;
    margin-top: 80px!important;
    margin: auto;
    color: #999;
    text-align: center;
    border: 1px solid transparent;
  }
  .err img {
    width: 260px;
    height: 156px;
  }
  .err .fhindex {
    margin: auto;
    margin-top: 30px;
    margin-bottom: 80px;
    width: 180px;
    height: 40px;
    border-radius: 22px;
    line-height: 40px;
    background: #ffe12c;
    box-shadow: 0 4px 10px 0 rgba(255,223,31,.3);
    color: #333;
  }
  .rightfixed {
  	width: 52px;
  	height: 300px;
  	position: fixed;
  	right: 2%;
  	top: 300px;
  	z-index: 2;
  }
  .rightfixed ul li {
  	float: left;
  	width: 52px;
  	height: 52px;
  	margin-bottom: 8px;
  	background: #f5f5f5;;
  	list-style: none;
    font-size: 30px;
    color: #666;
    transition: .3s;
  }
  .rightfixed ul li i {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .rightfixed ul li:hover {
    cursor: pointer;
    color: #7B68EE;
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
  	height: 35px;
  	width: 280px;
  	padding: 6px;
  	background: #f5f5f5;
  	border: none;
  	outline: none;
    padding-left: 15px;
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
