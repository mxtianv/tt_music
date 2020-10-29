<template>
  <div class="rank-list" v-loading.fullscreen.lock="fullscreenLoading">
    <ul id="new1">
    	<router-link to="/">
        <li>推荐</li>
      </router-link>
    	<router-link to="/rankList">
        <li  class="new">排行榜</li>
      </router-link>
    	<router-link to="/singers">
        <li>歌手</li>
      </router-link>
    	<router-link to="/songsheet">
        <li>歌单</li>
      </router-link>
    	<router-link to="/mv">
        <li>MV</li>
      </router-link>
    </ul>
    <br>
    <div class="song-sheet center">
      <div class="left">
        <div class="title">
          <span class="new">官方榜</span>
          <span>官方榜</span>
          <span>官方榜</span>
        </div>
        <el-divider></el-divider>
        <div class="tab_con">
          <ul>
            <li @click="getMusicList(i.id)" :class="{tab_con_new : newIndex == i.id}" class="" v-for="(i, index) in tabConList" :key="index">
              <img :src="i.img" alt="">
              <div>
                <span>{{i.title}}</span>
                <span style="color: #999;font-weight: 300;">{{i.time}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <strong>{{title}}</strong>
        <el-table
            v-if="musicList.tracks !== undefined && musicList.tracks.length>0"
            :data="musicList.tracks.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%; min-height: 500px;">
            <el-table-column
              label="序号"
              width="80">
              <template slot-scope="scope">
                <span>{{scope.$index+1 + 30*(currentPage-1)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="歌曲">
              <template slot-scope="scope">
                <span @click="getMusicUrl(scope.row.id, [scope.row.name, scope.row.ar[0].name])" class="music_name">{{scope.row.name}}</span>
                <img @click="getMusicMV(scope.row.mv)" class="music_name" v-if="scope.row.mv != 0" src="../../assets/MV.png" alt="">
              </template>
            </el-table-column>
            <el-table-column
              label="歌手"
              width="180">
              <template slot-scope='scope'>
                <span class="music_name" @click="getSinger(scope.row.ar[0].id)">{{scope.row.ar[0].name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="时长"
              width="150">
              <template slot-scope='scope'>
                <span>{{Math.floor((scope.row.dt/1000/60))}}:{{Math.floor((scope.row.dt/1000) % 60)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <div class="block">
             <el-pagination
               background
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
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        pagesize: 30,
        currentPage: 1,
        total: 0,
        musicList: '',
        code: 200,
        title: '',
        newIndex: 0,
        fullscreenLoading: true,
        tabConList: [
          {
            'id': 0,
            'img': 'http://p2.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg',
            'title': '云音乐新歌榜',
            'time': '今日更新'
          },
          {
            'id': 1,
            'img': 'http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg',
            'title': '云音乐热歌榜',
            'time': '今日更新'
          },
          {
            'id': 2,
            'img': 'http://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg',
            'title': '网易原创歌曲榜',
            'time': '今日更新'
          },
          {
            'id': 3,
            'img': 'http://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg',
            'title': '云音乐飙升榜',
            'time': '今日更新'
          },
          {
            'id': 26,
            'img': 'http://p2.music.126.net/oUxnXXvM33OUHxxukYnUjQ==/109951164174523461.jpg',
            'title': '抖音排行榜',
            'time': '今日更新'
          }
        ]
      }
    },
    methods: {
      ...mapMutations(['playMusic', 'playMusicInfo']),
      getMusicUrl(id, name) {
        this.axios.get('/song/url?id='+id).then(res => {
          this.playMusic(res.data[0].url)
        })
        this.playMusicInfo(name)
      },
      getMusicMV(id) {
        this.playMusic(0);
        location.href = '#/mv/'+id;
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        window.scrollTo(0, 0);
      },
      getMusicList(id) {
        this.fullscreenLoading = true;
        this.axios.get('/top/list?idx='+id).then(res => {
          this.musicList = res.playlist;
          this.title = res.playlist.name;
          this.total = res.playlist.tracks.length;
          this.newIndex = id;
          this.fullscreenLoading = false;
					this.currentPage = 1;
        })
      },
      getSinger(id) {
        location.href = '#/singerdetails/'+id
      }
    },
    computed: {

    },
    mounted() {
      this.getMusicList(0);
      window.scrollTo(0, 0);
      //console.log(this.$route.query.id)
    }
  }
</script>

<style scoped="scoped">
  .tab_con_new {
    background: #f2f2f2;
  }
  .tab_con ul li {
    list-style: none;
    font-weight: 600;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 10px;
    padding: 20px;
  }
  .tab_con ul li:hover {
    cursor: pointer;
  }
  .tab_con ul li img {
    width: 64px;
    height: 64px;
  }
  .tab_con ul li div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;
  }
  .song-sheet {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
  }
  .left {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(65,67,70,.05);
    border: 1px solid transparent;
  }
  .left .title {
    text-align: center;
    margin-top: 15px;
  }
  .left .title span {
    margin-right: 20px;
  }
  .left .title span:hover {
    cursor: pointer;
  }
  .left .el-divider {
    width: 100%%;
  }
  .right {
    width: 76%;
  }
  .right strong {
    font-size: 30px;
    color: #333;
    margin-bottom: 15px;
    display: inline-block;
  }
  .right .el-table img {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-left: 10px;
  }
  .right .music_name:hover {
    cursor: pointer;
  }
</style>
