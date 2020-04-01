<template>
  <div v-if="code == 404" class="err">
    <img src="../assets/err.png" alt="">
    <p>抱歉，暂无相关数据，重新刷新页面试试吧</p>
    <router-link to="/">
      <div class="fhindex">
        <span>返回首页</span>
      </div>
    </router-link>
  </div>
  <div v-else class="song-sheet center" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="left">
      <img :src="recommendSongs.coverImgUrl" alt="">
      <strong>歌单介绍</strong>
      <p>暂无介绍</p>
      <div class="down">
        <span>下载该歌单</span>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="right">
      <strong>每日热门歌单推荐</strong>
      <el-table
          v-if="recommendSongs.tracks !== undefined && recommendSongs.tracks.length>0"
          :data="recommendSongs.tracks.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
              <img @click="getMusicMV(scope.row.mv)" class="music_name" v-if="scope.row.mv != 0" src="../assets/MV.png" alt="">
            </template>
          </el-table-column>
          <el-table-column
            label="歌手"
            width="180"
            prop="ar[0].name">
          </el-table-column>
          <el-table-column
            label="时长"
            width="150">
            <template slot-scope='scope'>
              <span>{{(scope.row.dt / 1000 / 60).toFixed(2)}}分钟</span>
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
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        pagesize: 30,
        currentPage: 1,
        total: 0,
        recommendSongs: '',
        code: 200,
        fullscreenLoading:true
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
      }
    },
    computed: {

    },
    mounted() {
      this.axios.get("/playlist/detail?id="+this.$route.params.id).then(res => {
        this.recommendSongs = res.playlist;
        this.code = res.code;
        this.total = res.playlist.tracks.length;
      })
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 1200)
    }
  }
</script>

<style scoped="scoped">
  .song-sheet {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  .left {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 500px;
  }
  .left img {
    width: 295px;
    height: 295px;
    border: 1px solid mediumslateblue;
  }
  .left strong {
    font-size: 23px;
    color: #333;
    margin-top: 20px;
  }
  .left p {
    margin-top: 10px;
    font-size: 16px;
    color: #999;
  }
  .left .down {
    margin-left: 12.5%;
    margin-top: 15px;
    height: 25px;
    background: #ffe12c;
    padding: 20px;
    border-radius: 105px;
    font-size: 14px;
    line-height: 3px;
    width: 50%;
    text-align: center;
  }
  .left .down:hover {
    cursor: pointer;
  }
  .left .el-divider {
    width: 78%;
  }
  .right {
    width: 70%;
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
