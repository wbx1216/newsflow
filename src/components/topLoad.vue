<template>
	<div v-show="show" style="height: 95px;position: fixed; top:0px;left:0px;z-index: 5;width: 100%;background-color: #FFF;">
		<div class="loadingText" :class="psMsg.step==2?'step2':''">{{psMsg.text}} </div>
		<div class="loading" :style="{background:'url('+psMsg.imgCdnUrl+') 100%/100%'}">
			<div class="index" :style="{width:psMsg.width+'%'}" v-if="psMsg.success!=1"></div>
			<img src="../assets/redBag.png" class="redBag" @click="psMsg.success=1">
			<img src="../assets/gif.png" class="gif" :class="psMsg.step!=2&&psMsg.width<87?'qipao':''">
		</div>
		<div class="alert" @click="psMsg.success=0" v-show="psMsg.success==1">
			<img src="../assets/alert.png">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'topLoad',
		data() {
			return {
				show: false
			}
		},
		props: ['psMsg'],
		mounted() {
			let that = this
			if (localStorage.over == 1) {
				if(localStorage.alert==1){
					that.psMsg.text = "任务已完成"
					that.psMsg.imgCdnUrl = "http://res.hodanet.com/upload/sy/20201118/16/1608280846541.png"
					that.psMsg.width =87
				}else{
					setTimeout(function() {
						that.psMsg.width = localStorage.width
					}, 500)
					setTimeout(function() {
						that.psMsg.text = "任务已完成"
						that.psMsg.imgCdnUrl = "http://res.hodanet.com/upload/sy/20201118/16/1608280846541.png"
						that.psMsg.success = 1
					}, 4000)
					localStorage.alert=1;
				}
				
			} else {
				if (!localStorage.width) {
					that.psMsg.width = "4"
					localStorage.width = "4"
					localStorage.oldwidth = "4"
					localStorage.chance = 1
				} else {
					if(this.$route.path=="/detail"){
						setTimeout(function() {
							that.psMsg.width = localStorage.width
						}, 500)
					}else{
						that.psMsg.width = localStorage.width
					} 
					if (localStorage.width >= 30 && localStorage.readAd == 0) {
						that.psMsg.text = "点击页面中的广告,可继续倒计时"
						that.psMsg.step = 1
					}

				}
				if (!localStorage.readAd) {
					localStorage.readAd = 0
				} else if (localStorage.readAd == 1) {
					that.psMsg.text = "点击页面中的广告,可继续倒计时"
					that.psMsg.step = 2
				} else if (localStorage.readAd == 2) {
					if (localStorage.touch == 0) {
						that.psMsg.text = "滑动页面，可继续完成任务"
					} else {
						that.psMsg.text = "阅读任意内容，可继续完成任务"
					}
				}

				if (!localStorage.touch) {
					localStorage.touch = 0
				}
				if (!localStorage.click) {
					localStorage.click = 0
				}
			}
			that.show = 1
		}

	}
</script>

<style scoped lang="less">
	.loadTxcss {
		padding-top: 150px;
	}

	.loadList {
		position: fixed !important;
		top: 95px;
		width: 100%;
		z-index: 4;
	}

	.loadingText {
		font-size: 15px;
		text-align: center;
		line-height: 30px;
		opacity: 0.9;
		transform: scale(1);
		padding-top: 10px;
	}

	.step2 {
		color: #fb131e;
		animation: big 1s infinite;
	}

	@keyframes big {
		0 {

			transform: scale(1);
		}

		50% {

			transform: scale(1.2);
		}

		100% {

			transform: scale(1);
		}
	}

	.alert {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		z-index: 6;
		left: 0;
		top: 0;
		margin: auto;

		img {
			width: 200px;
			position: fixed;
			height: 150px;
			z-index: 7;
			left: 0;
			top: 0;
			margin: auto;
			right: 0;
			bottom: 0
		}
	}

	.loading {
		width: 90%;
		height: 45px;
		background-size: 100% 100%;
		margin: 10px 5% 10px 5%;
		position: relative;

		.index {
			width: 0%;
			position: absolute;
			height: 17px;
			top: 14px;
			background: #2880e8;
			left: 1%;
			border-radius: 20px 0px 0px 20px;
			transition: 4s linear;
		}


		.redBag {
			width: 38px;
			position: absolute;
			right: 0;
			bottom: 5px
		}

		.gif {
			bottom: 50px;
			width: 40px;
			position: absolute;
			right: -10px;

		}

		.qipao {
			animation: gif 1s infinite;
		}


	}

	@keyframes gif {
		0 {
			bottom: 50px
		}

		50% {
			bottom: 55px;
		}

		100% {
			bottom: 50px
		}
	}
</style>
