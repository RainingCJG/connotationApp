<template>
  <div class="concern">
  	<i class="fa fa-circle-o-notch"><i class="fa fa-heart-o"></i></i>
    <div class="state">搞笑逗比私人定制<br>登录账户关注你喜欢的TA</div>
    <router-link class="btn btn-danger" to="/concern/login">登录传送门</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Concern'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.concern{
		margin-top: -1.5rem;
		text-align: center;
	}

	.fa-circle-o-notch{
		position: relative;
		margin-top: 7rem;
		font-size: 3rem;
		color: #ddd;
		-webkit-transform: rotate(135deg);
				transform: rotate(135deg);
	}

	.fa-heart-o{
		position: absolute;
		left: .8rem;
		top: .7rem;
		font-size: 1.5rem;
		-webkit-transform: rotate(225deg);
				transform: rotate(225deg);
	}

	.state{
		margin: .7rem 0;
		font-size: .6rem;
		line-height: 2;
	}
</style>