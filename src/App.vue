<template>
	<div id="app" v-cloak>  
  		<keep-alive  > 
		    <router-view v-if="$route.meta.keepAlive"></router-view> 
		</keep-alive> 
		<router-view v-if="!$route.meta.keepAlive&&isRouterAlive"></router-view>  
	</div>
</template>
<script>
	export default {
		name: 'app',
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true,
			}
		},
		methods: {
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(function() {
					this.isRouterAlive = true
				});
			},
		},
		components: {}
	}
</script>

<style>
	[v-cloak] {
		display: none;
	}

	#app {
		font-family: '微软雅黑', Helvetica, Arial, sans-serif;
	}

	body,
	html {
		margin: 0;
		height: 100%;
		font-size: 10vw;
	}

	img {
		display: block;
		width: 100%;
	}

	a {
		text-decoration: none;
		-webkit-tap-highlight-color: transparent
	}
</style>
