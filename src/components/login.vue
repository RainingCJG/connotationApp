<template>
  <div class="login">
     <header>
     	<i class="fa fa-angle-left" @click="goback"></i>
     	<h3 class="logintitle">注册登录<br><small>使用此账户登录以使用更多服务内容</small></h3>
     </header>
     <form>
     	<div class="form-group phonelogin">
     		<input type="text" name="phonenumber" placeholder="输入手机号码">
     		<i class="fa fa-long-arrow-right"></i>
     	</div>
     	<div class="form-group agreement">
     		<input type="radio" name="agreement" id="agree" :checked="ischeck" @click="checked">
     		<label for="agree">我已阅读，理解并同意服务协议及隐私条款</label>
     	</div>
     </form>
     <footer>
     	<div class="quicklogin">
     		<h5>快速登录</h5>
     		<i class="fa fa-weixin"></i>
     		<i class="fa fa-qq"></i>
     		<i class="fa fa-weibo"></i>
     	</div>
     </footer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      ischeck: true
    }
  },
  methods: {
    checked () {
      this.ischeck = !this.ischeck
    },
    goback () {
      this.$router.push('/concern')
    }
  }
}
</script>

<style scoped>
  .login{
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      padding: 1rem 1rem;
      text-align: left;
      background-color: #fff;
      z-index: 2;
  }
  /*返回按钮图标样式*/
  .fa-angle-left{
    font-size: 1.5rem;
  }
  
  /*标题*/
  .logintitle{
  	margin-top: 2rem;
  	font-weight: bold;
  }

  .logintitle small{
  	font-size: .55rem;
  }
  
  /*手机注册登录*/
  .phonelogin{
  	position: relative;
    margin-top: 2rem;
  }

  .phonelogin input{
  	width: 100%;
  	padding: .5rem 0;
  	border-bottom: .05rem solid #eee;
  }
  
  /*获取手机验证码图标*/
  .phonelogin .fa-long-arrow-right{
    position: absolute;
    top: .2rem;
    right: .5rem;
    font-size: 1.5rem;
    color: #FF1493;
  }

  /*服务协议*/
  /*单选按钮样式*/
  .agreement input{
    position: absolute;
    clip: rect(0,0,0,0)
  }

  .agreement input + label::before{
    content: '';
    display: inline-block;
  	width: .6rem;
  	height: .6rem;
    line-height: .6rem;
    border: .05rem solid #FF1493;
    border-radius: 50%;
    margin-right: .4rem;
  }

  .agreement input:checked + label::before{
    background-color: #FF1493;
    background-clip: content-box;
    padding: .1rem;
  }

  .agreement label{
  	margin-top: -.2rem;
  	font-size: .5rem;
  	text-indent: .2rem;
  	font-weight: normal;
  }

  /*快速登录*/
  .quicklogin{
  	margin-top: 2rem;
  	text-align: center;
  }

  .quicklogin h5{
  	font-weight: normal;
  	color: #ccc;
  	font-size: .5rem;
  }

  .quicklogin .fa{
  	width: 1.8rem;
  	height: 1.8rem;
  	line-height: 1.8rem;
  	border-radius: 50%;
  	background-color: #FF1493;
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
    margin-left: .5rem;
    margin-right: .5rem;
  }
</style>