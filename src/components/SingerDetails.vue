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
  <div v-else class="singer-details">
    <ul id="new1">
    	<router-link to="/">
        <li>推荐</li>
      </router-link>
    	<router-link to="rankList">
        <li>排行榜</li>
      </router-link>
    	<router-link to="singers">
        <li class="new">歌手</li>
      </router-link>
    	<router-link to="/songsheet">
        <li>歌单</li>
      </router-link>
    	<router-link to="/mv">
        <li>MV</li>
      </router-link>
    </ul>
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
      	<li class="new">单曲</li>
      	<li>专辑</li>
      	<li>MV</li>
        <li>简介</li>
      </ul>
      <br>
      <el-table
          v-if="hotSongs !== undefined && hotSongs.length>0"
          :data="hotSongs.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
            width="280">
            <template slot-scope="scope">
              <span v-for="(i, index) in scope.row.ar" :key="index">{{i.name}} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="专辑"
            width="200"
            prop="al.name">
          </el-table-column>
          <el-table-column
            label="时长"
            width="200">
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
  import {mapState, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        music: 0,
        picUrl: '',
        name: '',
        briefDesc: '',
        pagesize: 30,
        currentPage: 1,
        total: 0,
        hotSongs: '',
        singerDetails: '',
        code: 200
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
        location.href = '#/mv/'+id;
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        window.scrollTo(0, 0);
      },
      async getSingerDetail(id) {
        let music = await this.axios.get('/artists?id='+id);
        let mv = await this.axios.get('/artists?id='+id);
        let album = await this.axios.get('/artists?id='+id);
        let introduction = await this.axios.get('/artists?id='+id);
        return [music, mv, album, introduction];
      },
    },
    mounted() {
      //console.log(this.$route.params.id)
      this.getSingerDetail(this.$route.params.id).then(res => {
        this.code = res[0].code;
        this.singerDetails = res;
        this.music = res[0];
        this.picUrl = this.music.artist.picUrl;
        this.name = this.music.artist.name;
        this.briefDesc = this.music.artist.briefDesc;
        this.total = this.music.hotSongs.length;
        this.hotSongs = this.music.hotSongs;
        //console.log(this.singerDetails)
      });
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
</style>
