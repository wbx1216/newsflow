<template>
	<div :class="loadTx==1?'loadTxcss':''">
		<topLoad v-if="loadTx==1" :psMsg="psMsg"></topLoad>
		<div class="nav-list" :class="loadTx==1?'loadList':''">
			<div class="nav-a" :class="item.selected==1?'selected':''" v-for="(item,index) in nav" @click="goNav(index)">{{item.name}}
				<div class="underLine"></div>
			</div>
			<div class="clearfix">
			</div>
		</div>
		<div v-for="item in adList" class="adHidden" :id="item"></div>
		<ul id="newsList" class="news-list" @touchend="touch()">
			<div v-for="(item,index) in list" :class="item.infoType==1?'ad':''" :key="index">
				<div v-if="item.infoType==1&&noAd==false" :id="item.AdId" v-show="!item.adHide"></div>
				<div class="item" :class="item.infoType==2?'ex1':''" v-else-if="item.infoType==2" @click="clickNews(item.id)">

					<div class="ex1-left">
						<div class="ex-title">
							{{item.title}}
						</div>
						<div class="categoryName">{{item.categoryName}}</div>
					</div>
					<div class="ex1-img">
						<img class="ex-img" :src="item.pic1">
					</div>
				</div>
				<div v-else-if="item.infoType==3" class="item" @click="clickNews(item.id)" :class="item.infoType==3?'ex2':''">
					<div class="ex-title">
						{{item.title}}
					</div>
					<div class="ex2-img">
						<img class="ex-img" :src="item.pic1" alt=""><img class="ex-img" :src="item.pic2" alt=""><img class="ex-img" :src="item.pic3"
						 alt="">
						<div style="clear:both">
						</div>
					</div>
				</div>
			</div>
		</ul>
	</div>
</template>

<script>
	let x = null;
	import topLoad from "../components/topLoad.vue"
	export default {
		name: 'index',
		components: {
			topLoad // //注册组件
		},
		data() {
			return {
				list: [],
				adList: ['xz1', 'xz2', 'xz3', 'xz4', 'xz5'],
				cid: this.$route.query.cid || 571000,
				page: 0,
				category: 0,
				s: 0,
				advMode: "0",
				jsAdv: "",
				adArray: ['p45', 'p46', 'p47', 'p8', 'p48', 'p49', 'p50', 'p51', 'p52'],
				navIndex: 0,
				num: 8,
				nav: [{
						name: "推荐",
						selected: 1,
						id: 0
					}, {
						name: "娱乐",
						selected: 0,
						id: 3
					},
					{
						name: "社会",
						selected: 0,
						id: 1
					},
					{
						name: "养生",
						selected: 0,
						id: 33
					},
					{
						name: "生活",
						selected: 0,
						id: 17
					},
					{
						name: "猎奇",
						selected: 0,
						id: 13
					},
					{
						name: "有料",
						selected: 0,
						id: 35
					}
				],
				clickNum: 0,
				clickTimes: "",
				clickTimes2:"",
				clickMin: "",
				lastTime: "",
				noAd: true,
				loadTx: 0,
				psMsg: {
					text: "阅读任意2-3篇内容，时长≥45秒",
					step: 0,
					success: 0,
					imgCdnUrl: "http://res.hodanet.com/upload/sy/20201117/17/1608196908925.png",
					width: 0,
				}, 
				adNum: "",
				listRate: "",
				advMin: "",
				advUvUpper: "",
				advPvUpper: ""
			}
		},
		methods: {
			touch(e) {
				let that = this
				if (localStorage.getItem("over") != 1) {
					setTimeout(function() {
						if (that.loadTx == 1) {
							if (Number(localStorage.width) < 30) {
								let index = 10
								that.psMsg.width = Number(localStorage.width) + Number(index)
								if (that.psMsg.width >= 30) {
									that.psMsg.step = 1
									that.psMsg.text = "点击页面中的广告,可继续倒计时"
								}
								localStorage.width = that.psMsg.width
							} else if (Number(localStorage.width) >= 30 && localStorage.readAd == 2) {
								if (Number(localStorage.touch) > 0) {
									console.log(Number(localStorage.touch))
									let index = 87 - Number(localStorage.width)
									that.psMsg.width = 87
									localStorage.width = 87
									localStorage.setItem("over", 1)
									setTimeout(function() {
										that.psMsg.success = 1
										that.psMsg.text = "任务已完成"
										that.psMsg.imgCdnUrl = "http://res.hodanet.com/upload/sy/20201118/16/1608280846541.png"
										localStorage.alert = 1;
									}, 4000)
								} else {
									that.psMsg.text = "滑动页面，可继续完成任务"
								}
							}
							localStorage.touch = Number(localStorage.touch) + 1
						}
					}, 50)

				}
			},
			clickNews(id) {
				let width = null
				let that = this
				if (localStorage.getItem("over") != 1) {
					if (this.loadTx == 1) {
						localStorage.touch = Number(localStorage.touch) - 1
						if (Number(localStorage.width) < 30) {
							let index = -4
							this.psMsg.width = Number(localStorage.width) + index
							localStorage.width = this.psMsg.width
							if (this.psMsg.width >= 30) {
								this.psMsg.step = 1
								this.psMsg.text = "点击页面中的广告,可继续倒计时"
							}
							width = Number(localStorage.width) + 4
						} else if (Number(localStorage.width) >= 30 && localStorage.readAd < 2) {
							if (localStorage.chance == 1) {
								this.psMsg.width = Number(localStorage.width) + 8
								width = Number(localStorage.width)
								localStorage.width = this.psMsg.width
								localStorage.chance = 0
							} else {
								width = Number(localStorage.width)
							}
						} else if (Number(localStorage.width) >= 30 && localStorage.readAd == 2) {
							if (Number(localStorage.touch) > 0) {
								width = Number(localStorage.width)
								that.psMsg.width = 87
								localStorage.width = 87
								localStorage.setItem("over", 1)
								setTimeout(function() {
									that.psMsg.success = 1
									that.psMsg.text = "任务已完成"
									that.psMsg.imgCdnUrl = "http://res.hodanet.com/upload/sy/20201118/16/1608280846541.png"
								}, 4000)
							} else {
								width = Number(localStorage.width)
								if (localStorage.click == 0) {
									this.psMsg.width = 80
									localStorage.width = 80
								}
								this.psMsg.text = "滑动页面，可继续完成任务"
							}

						}
						localStorage.click = Number(localStorage.click) + 1
					}
				}

				this.$router.push({
					path: '/detail',
					query: {
						id: id,
						cid: this.cid,
						width: width
					}
				});
			},
			makeRandomArr(arrList, num) {
				if (num > arrList.length) {
					return;
				}
				//    var tempArr=arrList.concat();    
				var tempArr = arrList.slice(0);
				var newArrList = [];
				for (var i = 0; i < num; i++) {
					var random = Math.floor(Math.random() * (tempArr.length - 1));
					var arr = tempArr[random];
					tempArr.splice(random, 1);
					newArrList.push(arr);
				}
				return newArrList;
			},
			getNews(num, down) {
				let that = this
				this.$axios.get("../getNewsArray.htm?category=" + this.category + "&page=" + this.page + "&num=" + this.num +
					"&cid=" +
					this.cid).then(
					(res) => {
						let list = res.data.data
						if (this.noAd == true) {
							this.list = this.list.concat(list)
						} else {
							let array = []
							for (let i = 0; i < that.num; i = i + 2) {
								array.push(list.slice(i, i + 2));
							}
							if (that.advMode == 1) {
								let array2 = [1, 3, 5, 7, 9, 11, 13]
								for (let i = 0; i < 7; i++) {
									let json = {}
									json = {
										AdId: Math.floor(Math.random() * 90000) + 10000,
										infoType: 1
									}
									list.splice(array2[i], 0, json)
								}
							} else if (that.advMode == 2) {
								for (let i = 0; i < 4; i++) {
									let s = []
									let json = {}

									json = {
										AdId: Math.floor(Math.random() * 90000) + 10000,
										infoType: 1
									}
									s.push(json)
									array[i] = s.concat(array[i])
								}
								list = array
							} else if (that.advMode == 3) {
								for (let i = 0; i < 4; i++) {
									if (i % 2 == 0) {
										let s = []
										for (let o = 0; o < 4; o++) {
											let json = {
												AdId: Math.floor(Math.random() * 90000) + 10000,
												infoType: 1
											}
											s.push(json)
										}
										array[i] = s.concat(array[i])
									} else {
										let s = []
										for (let o = 0; o < 2; o++) {
											let json = {
												AdId: Math.floor(Math.random() * 90000) + 10000,
												infoType: 1
											}
											s.push(json)
										}
										array[i] = s.concat(array[i])
									}
								}
								list = array
							} else if (that.advMode == 4) {
								for (let i = 0; i < 3; i++) {
									let s = []
									for (let o = 0; o < 2; o++) {
										let json = {
											AdId: Math.floor(Math.random() * 90000) + 10000,
											infoType: 1
										}
										s.push(json)
									}
									array[i] = s.concat(array[i])
								}

								list = array
							} else if (that.advMode == 5) {
								let array = [0, 2, 4]
								for (let i = 0; i < 3; i++) {
									let array2 = []
									for (let s = 0; s < 3; s++) {
										let json = {
											AdId: Math.floor(Math.random() * 90000) + 10000,
											infoType: 1
										}
										array2.push(json)
									}
									list.splice(array[i], 0, array2)
								}
							}
							let result = [].concat.apply([], list)
							if (!down) {
								that.list = result
							} else {
								that.list = that.list.concat(result)
							}
							let arr8 = new Array(that.adNum).keys();
							let f = 0
							if (that.listRate) {
								let listRate = Math.round(that.listRate * that.adNum)
								arr8 = Array.from(arr8);
								arr8 = that.makeRandomArr(arr8, listRate)
							}
							let page = that.page
							let len
							if (that.advMode == 2) {
								len = 12
							} else if (that.advMode == 3) {
								len = 20
							} else if (that.advMode == 4) {
								len = 16
							} else if (that.advMode == 5) {
								len = 19
							} else if (that.advMode == 1) {
								len = 15
							}
							
							if (that.jsAdv || this.noAd == false) {
								setTimeout(function() {
									for (let i = page * len; i < len * (page + 1); i++) {
										if (that.list[i].AdId) {
											if (that.listRate) {
												if (arr8.indexOf(f) > -1) {
													that.list[i]['adHide'] = 1
													let data = that.list[i]
													that.list.splice(i, 1, data)
												}
											}
											let id = that.jsAdv[that.adArray[randomNum(0, 8)]]
											if (id) {
												that.code(id, that.list[i].AdId)
											}
											f++
										}
									}

								}, 100)
							}
						}
						that.s = 0
					})


			},
			goNav(index) {
				this.nav[this.navIndex].selected = 0
				this.navIndex = index
				this.nav[index].selected = 1
				this.category = this.nav[index].id
				this.list = []
				this.page = 0
				let that = this
				this.getNews(this.num)
			},
			code(val, id) {
				if (val && id) {
					if (val.indexOf("tbs") != -1) {
						let code = val.split(',');
						let hm = document.createElement("script");
						hm.src = "https://tbsad.imtt.qq.com/tbs/jssdk/js/formal/TBSJSSDK.js?rand=" + Math.random();
						hm.setAttribute("adkey", code[1]);
						hm.setAttribute("posid", code[2]);
						setTimeout(function() {
							let dom = document.getElementById(id).appendChild(hm)
						}, 300)
					} else if (val.indexOf("sogou") != -1) {
						let sogou_div = document.getElementById(id);
						let code = eval('(' + val + ')');
						window.sogou_un = window.sogou_un || [];
						window.sogou_un.push({
							id: code.id,
							ele: sogou_div
						});
					} else if (val.indexOf("H5AD_CORE") != -1) {
						let code2 = val.substring(9)
						setTimeout(function() {
							new H5AD_CORE({
								'advDom': id,
								'advType': code2
							})
						}, 300)
					} else if (val.indexOf("GDT") != -1) {
						window.TencentGDT = window.TencentGDT || [];
						if (!this.gdt) {
							setTimeout(() => {
								let doc = document,
									h = doc.getElementsByTagName('head')[0],
									s = doc.createElement('script');
								s.async = true;
								s.src = "//qzs.qq.com/qzone/biz/res/i.js";
								h && h.insertBefore(s, h.firstChild)
							}, 300)
							this.gdt = true
						}
						let code = val.split(',');
						let type;
						if (code[3]) {
							type = code[3]
						} else {
							type = 'native'
						}
						TencentGDT.push({
							placement_id: code[1], // {String} - ���λid - ����
							app_id: code[2], // {String} - appid - ����
							type: type, // {String} - ԭ��������� - ����
							count: 1, // {Number} - ��ȡ����������Ĭ����3�����֧��10 - ѡ��
							muid_type: '1', // {String} - �ƶ��ն˱�ʶ���ͣ�1��imei��2��idfa��3��mac�� - ѡ��
							onComplete: function(res) {
								console.log(res)
								if (res && res.constructor === Array) {
									window.TencentGDT.NATIVE.renderAd(res[0], id)
								} else {
									setTimeout(function() {
										TencentGDT.NATIVE.loadAd(code[1])
									}, 500)
								}
							}
						});
					}
				}
			},
			adStatus() {
				let date = localStorage.getItem("date")
				let mouth = localStorage.getItem("mouth")
				if (!mouth) {
					date = new Date().getDate()
					mouth = new Date().getMonth()
					localStorage.setItem("mouth", mouth)
					localStorage.setItem("date", date)
				} else {
					if (new Date().getMonth() > mouth) {
						date = new Date().getDate()
						mouth = new Date().getMonth()
						localStorage.setItem("mouth", mouth)
						localStorage.setItem("date", date)
						localStorage.removeItem("showTimes")
						localStorage.removeItem("clickTimes")
					} else {
						if (new Date().getDate() > date) {
							date = new Date().getDate()
							mouth = new Date().getMonth()
							localStorage.setItem("mouth", mouth)
							localStorage.setItem("date", date)
							localStorage.removeItem("showTimes")
							localStorage.removeItem("clickTimes")
						}
					}

				}
				let showTimes = localStorage.getItem("showTimes")
				if (!showTimes) {
					localStorage.setItem("showTimes", 1)
				}
				let clickTimes = localStorage.getItem("clickTimes")
				if (!clickTimes) {
					localStorage.setItem("clickTimes", 1)
					clickTimes = 1
				}
				this.clickTimes = clickTimes
				this.showTimes = showTimes
				let lastTime = localStorage.getItem("lastTime")
				this.lastTime = lastTime || ""
			},
			warn() {
				this.$axios.get("reportBlockAdv.htm?type=2&page=1&cid="+this.cid).then(()=>{
					localStorage.removeItem("showTimes")
					localStorage.removeItem("lastTime")
					localStorage.removeItem("clickTimes")
				}) 	 
			},
			limitFun() {
				if (this.advMin > 0) {
					if (!this.lastTime) {
						this.lastTime = Date.parse(new Date())
						localStorage.setItem("clickTimes", 1)
						localStorage.setItem("showTimes", 1)
						localStorage.setItem("lastTime", this.lastTime)
					} else {
						let time = (Date.parse(new Date()) - this.lastTime) / 1000;
						if (time < this.advMin * 60) {
							if (this.advUvUpper && this.advUvUpper > 0) {
								this.clickTimes++
								localStorage.setItem("clickTimes", this.clickTimes)
							}
							if (this.advPvUpper && this.advPvUpper > 0) {
								this.showTimes++
								localStorage.setItem("showTimes", this.showTimes)
							}
							if (this.clickTimes >= this.advUvUpper && this.advUvUpper > 0) {
								this.warn()
								return false;
							}
							if (this.showTimes >= this.advPvUpper && this.advPvUpper > 0) {
								this.warn()
								return false;
							}
						} else {
							this.lastTime = Date.parse(new Date())
							localStorage.setItem("lastTime", this.lastTime)
							this.clickTimes = 1
							localStorage.setItem("clickTimes", 1)
							this.showTimes = 1
							localStorage.setItem("showTimes", 1)
						}
					}
				}
			}
		},
		activated() {
			let that = this
			this.$nextTick(() => {
				// this.initScroll()
				window.onscroll = function() {
					//变量scrollTop是滚动条滚动时，距离顶部的距离
					var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
					//变量windowHeight是可视区的高度
					var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
					//变量scrollHeight是滚动条的总高度
					var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
					//滚动条到底部的条件
					let h = scrollHeight - scrollTop - windowHeight
					if (h < 100 && that.s == 0) {
						console.log(h)
						//写后台加载数据的函数
						that.page++
						that.s = 1
						that.getNews(this.num, true)
					}
				}
			})
		},
		created() {
			let that = this
			this.adStatus()
			if (this.cid == "411320") {
				this.psMsg.text = "阅读任意2-3篇内容，时长≥60秒"
			}
			this.$axios.get("../api/getAdvs.htm?cid=" + this.cid).then((res) => {
				console.log(res.data)
				this.loadTx = res.data.taskSwitch
				this.listRate = res.data.listRate
				this.advUvUpper = res.data.advUvUpper
				this.advPvUpper = res.data.advPvUpper
				this.advMin = res.data.advMin
				// this.loadTx = 1
				if(this.loadTx!=1){ 
					localStorage.removeItem("clickNum")
					localStorage.removeItem("lastTime2")
					localStorage.removeItem("width")
					localStorage.removeItem("click")
					localStorage.removeItem("readAd")
					localStorage.removeItem("touch")
					localStorage.removeItem("over")
					localStorage.removeItem("alert")
				}
				if (this.advMin) {
					this.limitFun()
				}
				if (res.data.cnzzUrl) {
					let cnzz_s_tag = document.createElement('script');
					cnzz_s_tag.type = 'text/javascript';
					cnzz_s_tag.async = true;
					cnzz_s_tag.src = res.data.cnzzUrl
					let root_s = document.getElementsByTagName('script')[0];
					root_s.parentNode.insertBefore(cnzz_s_tag, root_s);
				}
				if (res.data.listRate) {
					this.listRate = res.data.listRate
				}
				if (res.data.advBlock == 1) {
					this.noAd = true
				} else {
					this.advMode = res.data.advMode
					this.jsAdv = res.data.jsAdvdata
					this.noAd = false
					if (this.jsAdv.link) {
						let linkArray = this.jsAdv.link.split(',');
						linkArray.forEach(item => {
							let doc = document,
								h = doc.getElementsByTagName('head')[0],
								s = doc.createElement('script');
							s.async = true;
							s.src = item;
							h && h.insertBefore(s, h.firstChild)
						})
					}

				}
				if (res.data.advMode == 4 || res.data.advMode == 5) {
					this.num = 10 
				}
				if (this.advMode == 2) {
					this.adNum = 4
				} else if (this.advMode == 3) {
					this.adNum = 12
				} else if (this.advMode == 4) {
					this.adNum = 6
				} else if (this.advMode == 5) {
					this.adNum = 9
				} else if (that.advMode == 1) {
					this.adNum = 7
				}
				let date = localStorage.getItem("date2")
				if (!date) {
					date = Math.round(new Date() / 1000)
					localStorage.setItem("date2", date)
				} else {
					let date2 = Math.round(new Date() / 1000) - date
					if (date2 > 86400) {
						date = Math.round(new Date() / 1000)
						localStorage.setItem("date2", date)
						localStorage.removeItem("clickNum")
						localStorage.removeItem("lastTime2")
						localStorage.removeItem("width")
						localStorage.removeItem("click")
						localStorage.removeItem("readAd")
						localStorage.removeItem("touch")
						localStorage.removeItem("over")
						localStorage.removeItem("alert")
					}
				}
				if (res.data.adHidden == 1) {
					let array = ["xz1", "xz2", "xz3", "xz4", "xz5"]
					for (let i = 0; i < 5; i++) {
						let id = this.jsAdv[array[i]]
						if (id) {
							that.code(id, array[i])
						}
					}
				}
				this.getNews(this.num)
			})

		}
	}

	function randomNum(minNum, maxNum) {
		switch (arguments.length) {
			case 1:
				return parseInt(Math.random() * minNum + 1, 10);
				break;
			case 2:
				return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
				break;
			default:
				return 0;
				break;
		}
	}
	window.onbeforeunload = function() {
		let clickNum = Number(localStorage.getItem("clickNum"))
		clickNum++
		localStorage.setItem("clickNum", clickNum)
		let readAd = Number(localStorage.getItem("readAd"))
		readAd++
		if (readAd <= 2) {
			let width = Number(localStorage.getItem("width"))
			width += 20
			if (width > 80) {
				width = 80
			}
			localStorage.setItem("width", width)
		} else {
			readAd = 2
		}
		localStorage.setItem("readAd", readAd)
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

	.adHidden {
		display: none;
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
			transition: 5s linear;
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

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #000;
	}

	.item {
		width: 92%;
		overflow: hidden;
		margin: 0 auto;
		position: relative;
		display: block;
		align-items: center;
		border-bottom: 1px solid #eeeeee;
	}

	.ex1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 140px;
	}

	.ex2 {
		height: 130px;
		padding: 5px 0px;
	}



	.ex1-left {
		width: 63%;
		float: left;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		height: 21.3vw;
	}

	.categoryName {
		color: #f94d17;
		border: 1px solid #f94d17;
		font-size: 10px;
		text-align: center;
		display: inline-block;
		padding: 0px 4px;
	}

	.ex1-img {
		overflow: hidden;
		width: 34%;
		height: 21.3vw;
		float: right;

		.ex-img {
			min-height: 21.3vw;
			background-size: 64px;
			background-color: #F5F5F5;
			display: block;
			width: 100%;
		}
	}

	.ex-title {
		font-size: 15px;
	}

	.ex1 {
		.ex-title {
			display: -webkit-box;
			overflow: hidden;
			width: 100%;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical
		}
	}

	.ex2 {
		.ex-title {
			padding-bottom: 7px;
			display: block;
			position: relative;

		}

	}

	.ex2-img {
		height: 21.3vw;
		overflow: hidden;
		display: flex;
		justify-content: space-between;

		.ex-img {
			display: block;
			width: 32%;
			min-height: 100%;
		}
	}

	.nav-list {
		overflow: hidden;
		overflow-x: scroll;
		white-space: nowrap;
		display: flex;
		height: 56px;
		align-items: center;
		position: relative;
		background-color: #4396f7;
		height: 56px;
	}

	.nav-a {
		color: rgba(255, 255, 255, .7);
		text-decoration: none;
		font-size: 16px;
		margin: 0px;
		padding: 0 10px;
		line-height: 28px;
		display: inline-block;
		height: 28px;
		position: relative;
	}

	.selected {
		font-weight: bold;
		color: #fff;
	}

	.selected .underLine {
		width: 15px;
		height: 1px;
		background: #FFF;
		bottom: 0px;
		left: 0px;
		right: 0px;
		margin: auto;
	}
</style>
