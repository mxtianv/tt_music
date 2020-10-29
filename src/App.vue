<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {

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
  #app {
    max-width: 1650px;
    min-width: 1200px;
    margin: 0 auto;
  }
  a:hover{
  	text-decoration: none;
  }
  .center {
  	width: 85%;
  	margin: auto;
  }
  .cell .music_name:hover {
    color: deepskyblue;
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
  .el-pagination {
    text-align: center;
  }
</style>
