<template>
  <div class="singers" v-loading.fullscreen.lock="fullscreenLoading">
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
    <div class="peopleImg center">
    	<div class="content" v-for="(i, index) in singerImg" :key="index">
    		<img  @click="getAsyncSingerDetail(i.id)" :src="i.img1v1Url" >
    		<p>{{i.name}}</p>
    		<p>{{i.musicSize}}首歌曲</p>
    	</div>
    </div>
    <br><br>
    <el-pagination
      class="center"
      background
      style="width: 30%;"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="30"
      :total="100">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        singerImg: [],
        newSingerImg: [],
        fullscreenLoading: true
      }
    },
    methods: {
      getAsyncSingerDetail(id) {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          location.href = '#/singerdetails/'+id;
        }, 0)
      },
      getSingers(val) {
        this.fullscreenLoading = true;
        let that = this;
        this.axios.get("/top/artists?offset="+(val - 1)*30+"&limit=30").then(res => {
          that.singerImg = res.artists;
        })
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 1000)
      },
      handleCurrentChange(val) {
        this.getSingers(val);
        window.scrollTo(0, 0);
      }
    },
    mounted() {
      this.getSingers(1)
    }
  }
</script>

<style scoped="scoped">
  .singers .peopleImg img {
  	width: 166px;
  	height: 166px;
  	border-radius: 50%;
  	margin-bottom: 10px;
  }
  .singers .peopleImg img:hover {
  	cursor: pointer;
  }
  .singers .peopleImg {
    margin-top: 23px;
  	text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .singers .content {
    width: 20%;
    margin-top: 30px;
  }
  .singers .content p:nth-child(2){
  	font-size: 17px;
  }
  .singers .content p:nth-child(3){
  	font-size: 14px;
  	color: #999;
  }
</style>
