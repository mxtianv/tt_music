<template>
  <div class="playlists center" v-loading.fullscreen.lock="fullscreenLoading">
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
        <li class="new">歌单</li>
      </router-link>
    	<router-link to="/mv">
        <li>MV</li>
      </router-link>
    </ul>
    <br><br>
    <div class="title">
      <strong>精品歌单</strong>
      <span @click="getgdList('new')" class="new">最新</span>
      <span @click="getgdList('hot')">最热</span>
    </div>
    <div class="mv">
      <ul>
        <li v-for="(i, index) in newMVList" :key="index">
          <div class="img-p">
            <div @click="moreInfo(i.id)" :style="'background: url('+i.coverImgUrl+');'" class="img">
              <div class="mask">
                <img src="../assets/播放.png" alt="">
              </div>
            </div>
          </div>
          <p>{{i.name}}</p>
          <!-- <p>{{i.artistName}}</p> -->
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
        fullscreenLoading:true
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
      getgdList(str) {
        let that = this;
        this.fullscreenLoading = true;
        this.MVList = [];
        this.newMVList = [];
        this.axios.get('/top/playlist?limit=100&order='+str).then(res => {
          that.MVList = res.playlists;
          this.total = res.playlists.length;
          if(res.playlists.length > 30) {
            for(let i = 0; i < 30; i++) {
              this.newMVList.push(res.playlists[i])
            }
          }
          else {
            this.newMVList = res.playlists
          }
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 900)
        })
      },
     moreInfo(id) {
        location.href = '#/songsheet/'+id;
      },
    },
    mounted() {
      let that = this;
      this.getgdList('new');
      this.$(".title span").click(function(){
      	that.$(this).addClass('new').siblings().removeClass('new');
      });
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 1200)
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
  .new {
  	font-weight: 600;
  	box-shadow:0px 2px 3px #F0E423;
  }
  .title {
    margin-top: 20px;
    margin-bottom: 33px;
  }
  .title strong{
    font-size: 25px;
    display: inline-block;
    margin-right: 20px;
  }
  .title span {
    display: inline-block;
    margin-right: 20px;
  }
  .title span:hover {
    cursor: pointer;
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
