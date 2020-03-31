<template>
  <div class="hotmv center">
    <ul id="new1">
    	<router-link to="/">
        <li>推荐</li>
      </router-link>
    	<router-link to="rankList">
        <li>排行榜</li>
      </router-link>
    	<router-link to="singers">
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
    <ul id="new2">
    	<li v-loading.fullscreen.lock="fullscreenLoading" @click="getMVList" class="new">推荐</li>
    	<li @click="getHotMV">热门</li>
    	<li @click="getMv('内地')">内地</li>
      <li @click="getMv('港台')">港台</li>
    	<li @click="getMv('日本')">日本</li>
    	<li @click="getMv('韩国')">韩国</li>
      <li @click="getMv('欧美')">欧美</li>
    </ul>
    <br><br>
    <div class="mv">
      <ul>
        <li v-for="(i, index) in newMVList" :key="index">
          <div class="img-p">
            <div v-if="i.picUrl != undefined" @click="playMV(i.id)" :style="'background: url('+i.picUrl+');'" class="img">
              <div class="mask">
                <img src="../assets/播放.png" alt="">
              </div>
            </div>
            <div v-else @click="playMV(i.id)" :style="'background: url('+i.cover+');'" class="img">
              <div class="mask">
                <img src="../assets/播放.png" alt="">
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
            :page-sizes="[30]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        MVList: [],
        currentPage:1,
        pagesize: 30,
        total: 0,
        newMVList: [],
        fullscreenLoading:false
      }
    },
    methods: {
      ...mapMutations(['playMusic']),
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.newMVList = [];
        for(let i = (val-1)*30; i < 30*val; i++) {
          if (this.MVList[i] != undefined) {
            this.newMVList.push(this.MVList[i])
          }
          else {
            break;
          }
        }
        window.scrollTo(0, 0);
      },
      getMVList() {
        let that = this;
        this.fullscreenLoading = true;
        this.MVList = [];
        this.newMVList = [];
        this.axios.get('/personalized?limit=100').then(res => {
          that.MVList = res.result;
          this.total = res.result.length;
          if(res.result.length > 30) {
            for(let i = 0; i < 30; i++) {
              this.newMVList.push(res.result[i])
            }
          }
          else {
            this.newMVList = res.result
          }
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 900)
        })
      },
      // MV分类
      getMv(name) {
        let that = this;
        this.fullscreenLoading = true;
        this.MVList = [];
        this.newMVList = [];
        this.axios.get('/top/mv?area='+name+'&limit=100').then(res => {
          that.MVList = res.data;
          this.total = res.data.length;
          if(res.data.length > 30) {
            for(let i = 0; i < 30; i++) {
              this.newMVList.push(res.data[i])
            }
          }
          else {
            this.newMVList = res.data
          }
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 900)
        })
      },
      playMV(id) {
        this.playMusic(0);
        location.href = '#/mv/'+id;
      },
      getHotMV() {
        let that = this;
        this.fullscreenLoading = true;
        this.MVList = [];
        this.newMVList = [];
        this.axios.get('/mv/first?limit=100').then(res => {
          that.MVList = res.data;
          this.total = res.data.length;
          if(res.data.length > 30) {
            for(let i = 0; i < 30; i++) {
              this.newMVList.push(res.data[i])
            }
            console.log(this.newMVList)
          }
          else {
            this.newMVList = res.data
          }
        })
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 900)
      }
    },
    mounted() {
      let that = this;
      this.getMVList();
      this.$("#new2 li").click(function(){
      	that.$(this).addClass('new').siblings().removeClass('new');
      });
    }
  }
</script>

<style scoped="scoped">
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
  #new1 .new {
  	font-weight: 600;
  	box-shadow:0px 2px 3px #F0E423;
  }
  #new2 {
    font-size: 15px;
    color: #333;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
  #new2 li {
  	list-style: none;
  	margin-left: 0px;
  	float: left;
  	cursor: pointer;
    width: 63px;
    height: 28px;
  }
  #new2 .new {
  	font-weight: 600;
  	background: #F0E423;
    line-height: 28px;
    border-radius: 14px;
    transform: translateY(-2.5px);
  }
  .mv ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .mv ul li {
    list-style: none;
    width: 20%;
    margin-bottom: 20px;
  }
  .mv ul li p:nth-child(2) {
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: #333;
  }
  .mv ul li p:nth-child(3) {
    color: #666666;
    font-size: 15px;
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
