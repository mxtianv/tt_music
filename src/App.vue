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
        <a href="#/"><img src="./assets/ttyy.png"></a>
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
      		<span @click="loginT">登录</span>
          <span>/</span>
          <span @click="registerT">注册</span>
      	</div>
      </div>
    </div>
    <!-- 主体 -->
    <div>
      <router-view></router-view>
    </div>
    <!-- 音乐播放器 -->
    <div class="music-play" style="position: fixed;bottom: 0;width: 90%;left: 5%;mix-width: 100px;mix-height: 100px;" v-if="music != 0">
      <i  @click="showM" class="el-icon-service"></i>
      <!-- <i v-if="n != 1" @click="showM" style="margin-left: 97%;background: mediumslateblue;padding: 5px;display: inline-block;" class="el-icon-lock"></i> -->
    	<div v-show="n == 1" class="audio_con">
    	  <audio style="width: 100%;" ref='audio'  :src="music" controls autoplay loop class="myaudio"></audio>
    	</div>
      <!-- <aplayer v-show="n == 1"  autoplay :music="{
          title: musicName,
          author: musicSinger,
          url: music,
          pic: 'http://devtest.qiniudn.com/Preparation.jpg',
          lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
        }">
      </aplayer> -->
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
    <!-- 登录注册 -->
    <el-dialog :title="title" :visible.sync="login" width="25%">
        <div class="login">
          <img src="./assets/user.png" alt="">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            v-model="username">
          </el-input>
          <el-input
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
            v-model="password">
          </el-input>
          <el-input
            v-if="title == '注册'"
            placeholder="请再次输入密码"
            show-password
            prefix-icon="el-icon-lock"
            v-model="comPassword">
          </el-input>
          <div v-if="title == '登录'" class="find-reg">
            <p>忘记密码</p>
            <p @click="toregister">立即注册</p>
          </div>
          <button v-if="title == '登录'" @click="comBtn(1)">{{title}}</button>
          <button v-if="title == '注册'" @click="comBtn(0)">{{title}}</button>
        </div>
        <el-divider v-if="title == '登录'">
          <span>其他账户登录</span>
        </el-divider>
        <el-divider v-if="title == '注册'">
          <a style="color: #00BFFF;" href="javascript:;" @click="tologin">已有账号?立即登录</a>
        </el-divider>
        <div class="else-login" v-if="title == '登录'">
          <img src="./assets/QQ.png" alt="">
          <img src="./assets/微信.png" alt="">
          <img src="./assets/新浪.png" alt="">
        </div>
        <br>
    </el-dialog>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  // import Aplayer from 'vue-aplayer'
  //import PlayMusic from './components/PlayMusic.vue'
  export default {
    components: {
      //Aplayer
      //PlayMusic
    },
    data() {
      return {
        keyword:'',
        fullscreenLoading: false,
        login: false,
        register: false,
        username: '',
        password: '',
        comPassword: '',
        title: '登录',
        n:1,
        bf: true
      }
    },
    methods: {
      ...mapMutations(['getMusicList']),
      musicList() {
        location.href = '#/music/'+this.keyword;
      },
      fanhui() {
      	if(this.$(document).scrollTop() >= 500)
      	this.$(".fh0").fadeIn();
      	else this.$(".fh0").fadeOut();
      },
      loginT() {
        this.login = true;
        this.title = '登录';
        this.username = '';
        this.password = '';
        this.comPassword = '';
      },
      registerT() {
        this.login = true;
        this.title = '注册';
        this.username = '';
        this.password = '';
        this.comPassword = '';
      },
      tologin() {
        this.title = '登录';
        this.username = '';
        this.password = '';
        this.comPassword = '';
      },
      toregister() {
        this.title = '注册';
        this.username = '';
        this.password = '';
        this.comPassword = '';
      },
      comBtn(id) {
        if (id == 1) {
          if (this.username == '') {
            this.$message.error('请输入用户名');
          } else if (this.password == ''){
            this.$message.error('请输入密码');
          } else {
            this.$message.error('登录失败，用户名或密码错误！');
          }
        } else{
          if (this.username.length < 6 || this.username.length > 15 ) {
            this.$message.error('用户名要求6-15个字符之间');
          } else if (this.password.length < 6 || this.password.length > 15 ){
            this.$message.error('密码要求6-15个字符之间');
          } else if (this.password != this.comPassword){
            this.$message.error('两次输入密码不一致');
          }else {
            this.$message.error('注册系统暂未开放！');
          }
        }
      },
      showM() {
        if (this.n == 1) {
          this.n = 0;
        }
        else {
          this.n = 1;
        }
      }
    },
    computed: {
      ...mapState(['music', 'musicName', 'musicSinger'])
    },
    mounted() {
      let that = this;
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
    },
    watch: {
      music(val) {
        this.n = 1;
        //console.log(val)
      }
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
  .music_name:hover {
    color: #00BFFF;
  }
  .music-play i {
    position: absolute;
    top: -24px;
    right: 5px;
    z-index: 2;
    background: #00BFFF;
    padding: 4px;
    transition: .5s;
  }
  .music-play i:hover {
    cursor: pointer;
    background: orange;
    color: blue;
  }
  .login {
    width: 80%;
    margin: auto;
  }
  .login img {
    width: 278px;
    height: 114px;
  }
  .login .el-input {
    margin-bottom: 15px;
  }
  .login button {
    width: 100%;
    height: 40px;
    background: #ffe200;
    border: none;
    font-size: 17px;
    margin-top: 15px;
    outline:none;
  }
  button:focus {
    outline:none;
  }
  .login button:hover {
    cursor: pointer;
  }
  .login .find-reg {
    display: flex;
    justify-content: space-between;
  }
  .login .find-reg p:hover {
    cursor: pointer;
  }
  .else-login {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-around;
  }
  .else-login img {
    padding: 5px;
    border: 1px solid rgba(0,0,0,.06);
    border-radius: 50%;
    transition: .5s;
  }
  .else-login img:hover {
    cursor: pointer;
    background: rgba(0,0,0,.02);
  }
  #new1 {
  	margin-left: 15%;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 15px;
    color: #333;
  }
  #new1 li {
  	list-style: none;
  	margin-left: 30px;
  	float: left;
  	cursor: pointer;
  }
  .new {
  	font-weight: 600;
  	box-shadow:0px 2px 3px #F0E423;
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
  	bottom: 50px;
    width: 86%;
    margin-left: 7%;
  }
  .musicPlay p {
    margin-left: 20%;
    margin-top: 10px;
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
