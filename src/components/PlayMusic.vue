<template>

  <p>

  <el-row>

   <el-col :span="4">

    <el-popover

    placement="top-start"

    trigger="hover">

     <p style="text-align: center">

      <el-progress

      color="#67C23A"

      type="circle"

      :percentage="musicT.volume"></el-progress><br>

      <el-button

      @click="changeVolume(-10)"

      icon="el-icon-minus"

      circle></el-button>

      <el-button

      @click="changeVolume(10)"

      icon="el-icon-plus"

      circle></el-button>

     </p>

     <el-button

     @click="play"

     id="play"

     slot="reference"

     :icon="musicT.isPlay?'el-icon-refresh':'el-icon-caret-right'"

     circle></el-button>

    </el-popover>

   </el-col>

   <el-col :span="14" style="padding-left: 20px">

    <el-slider

    @change="changeTime"

    :format-tooltip="formatTime"

    :max="musicT.maxTime"

    v-model="musicT.currentTime"

    style="width: 100%;"></el-slider>

   </el-col>

   <el-col :span="6" style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px">

    {{formatTime(musicT.currentTime)}}/{{formatTime(musicT.maxTime)}}

   </el-col>

  </el-row>

  <audio ref="musicT" loop autoplay>

   <source :src="music" type="audio/mpeg">

  </audio>

 </p>

</template>

<script>
 import {mapState} from 'vuex'
 export default{
  computed: {
   ...mapState(['music'])
  },
  data(){

   return {
    musicT:{

     isPlay:false,

     currentTime:0,

     maxTime:0,

     volume:100

    }

   }

  },

  mounted(){

   this.$nextTick(()=>{

    setInterval(this.listenmusicT,1000)

   })

  },

  methods:{

   listenmusicT(){

    if(!this.$refs.musicT){

     return

    }

    if(this.$refs.musicT.readyState){

     this.musicT.maxTime = this.$refs.musicT.duration

    }

    this.musicT.isPlay=!this.$refs.musicT.paused

    this.musicT.currentTime = this.$refs.musicT.currentTime

   },

   play(){

    if(this.$refs.musicT.paused){

     this.$refs.musicT.play()

    }else{

     this.$refs.musicT.pause()

    }

    this.musicT.isPlay=!this.$refs.musicT.paused

    this.$nextTick(()=>{

     document.getElementById('play').blur()

    })

   },

   changeTime(time){

    this.$refs.musicT.currentTime = time

   },

   changeVolume(v){

    this.musicT.volume += v

    if(this.musicT.volume>100){

     this.musicT.volume = 100

    }

    if(this.musicT.volume<0){

     this.musicT.volume = 0

    }

    this.$refs.musicT.volume = this.musicT.volume/100

   },

   formatTime(time){

    let it = parseInt(time)

    let m = parseInt(it/60)

    let s = parseInt(it%60)

    return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)

   }

  }

 }

</script>
