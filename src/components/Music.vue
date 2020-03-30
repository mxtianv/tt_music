<template>
  <div class="music">
    <div style="width: 99.9%;margin: auto;" class="img">
      <!-- <div class="search">
        <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div> -->
    </div>
    <br>
    <div class="center">
      <h3 style="font-size: 28px;font-weight: 600;margin-bottom: 30px;display: inline-block;">搜索结果</h3>
      <div id="new3" class="nav">
      	<a class="new" href="javascript:;">单曲</a>
      	<a href="javascript:;">专辑</a>
      	<a href="javascript:;">MV</a>
      	<a href="javascript:;">歌单</a>
      	<a href="javascript:;">歌手</a>
      </div>
      <el-table
          :data="musicList.songs"
          stripe
          style="width: 100%; min-height: 500px;">
          <el-table-column
            label="序号"
            width="180">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="歌曲">
            <template slot-scope="scope">
              <span @click="getMusicUrl(scope.row.id)" class="music_name">{{scope.row.name}}</span>
              <img @click="getMusicMV(scope.row.mvid)" class="music_name" v-if="scope.row.mvid != 0" src="../assets/MV.png" alt="">
            </template>
          </el-table-column>
          <el-table-column
            label="歌手"
            width="180"
            prop="artists[0].name">
          </el-table-column>
          <el-table-column
            label="专辑"
            width="200"
            prop="album.name">
          </el-table-column>
          <el-table-column
            label="时长"
            width="200">
            <template slot-scope='scope'>
              <span>{{(scope.row.duration / 1000 / 60).toFixed(2)}}分钟</span>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        fullscreenLoading: false
      }
    },
    methods: {
      ...mapMutations(['changeRouting', 'playMusic', 'getMV', 'getMVinfo', 'getMVcomment']),
      getMusicUrl(id) {
        this.axios.get('/song/url?id='+id).then(res => {
          this.playMusic(res.data[0].url)
        })
      },
      getMusicMV(id) {
        this.playMusic(0);
        this.axios.get('/mv/url?id='+id).then(res => {
          this.getMV(res.data.url)
        });
        this.axios.get('/mv/detail?mvid='+id).then(res => {
          this.getMVinfo(res.data)
        });
        this.axios.get('/comment/mv?id='+id).then(res => {
          if (res.hotComments.length <= 50) {
            this.getMVcomment(res.hotComments)
          }
          //console.log(res.hotComments)
        })
        location.href = '#/mv'
      }
    },
    computed: {
      ...mapState(['musicList'])
    },
    mounted() {
      this.changeRouting('music')
    }
  }
</script>

<style scoped="scoped">
  a {
    color: black;
    text-decoration: none;
  }
  .el-table img {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-left: 10px;
  }
  .img {
    width: 100%;
    height: 246px;
    background: url(../assets/b1.png);
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .search {
    width: 40%;
    margin: auto;
  }
  .music_name:hover {
    cursor: pointer;
  }
  .nav {
    display: inline-block;
  }
  .nav a {
  	margin-left: 30px;
  	float: left;
  }
  .nav .new {
  	font-weight: 600;
  	box-shadow:0px 2px 3px #F0E423;
  }
</style>
