<template>
	<div :class="loadTx==1?'loadTxcss':''" @touchend="touch">
		<topLoad v-if="loadTx==1" :psMsg="psMsg"></topLoad>
		<!-- 	<div v-if="loadTx==1" style="height: 95px;position: fixed; top:0px;left:0px;z-index: 5;width: 100%;background-color: #FFF;">
			<div class="loadingText" :class="step==2?'step2':''">{{text}}</div>
			<div class="loading" :style="{background:'url('+imgCdnUrl+') 100%/100%'}">
				<div class="index" :style="{width:width+'%'}" v-if="success!=1"></div>
				<img src="../assets/redBag.png" class="redBag">
				<img src="../assets/gif.png" class="gif" :class="step!=2&&width<87?'qipao':''">
			</div>
			<div class="alert" @click="success=0" v-show="success==1">
				<img src="../assets/alert.png">
			</div>
		</div> -->
		<div v-for="item in adList" class="adHidden" :id="item"></div>
		<div id="p1"></div>
		<div class="content">
			<div class="newscontent" data-category="$detail.category">
				<div class="title">{{data.title}}</div>
				<div class="head-title">{{data.author}}</div>
				<div style=" margin-left: 10px;" class="head-title">{{data.newsDate}}</div>
				<div style=" margin-left: 10px;margin-bottom:15px;" class="head-title">{{data.newsTime}}</div>
				<div style="clear:both"></div>
				<div style="height:1px;width:100%;background:#e5e5e5"></div>
			</div>
			<div id="p4" v-if="advMode!=4"></div>
			<div id="content" class="newscontent" v-html="content" :style="{height:height}"> </div>
			<div class="Unfolded-btn" v-if="zhankai">
				<div class="Unfolded-cover"></div><a class="Unfolded-link" @click="autoHeight()">展开全文</a>
			</div>
		</div>
		<div id="likeAd" v-if="advMode!=4&&noAd==false">
			<div class="like">猜你喜欢</div>
			<div class="newscontent">
				<div style="width:600px">
					<div style="background-color:#f75151;width: 60px;height: 1px;margin-top: 5px;float:left;"></div>
					<div style="background-color:#e5e5e5;width: 500px;height: 1px;margin-top: 5px;float:left;"></div>
					<div style="clear:both;"></div>
				</div>
			</div>
			<div name="ad" data-and="p5" id="p5"></div>
			<div name="ad" data-and="p6" id="p6"></div>
			<div name="ad" data-and="p7" id="p7"></div>
			<div name="ad" data-and="p40" id="p40" v-if="advMode==2"></div>
			<div name="ad" data-and="p41" id="p41" v-if="advMode==2"></div>
			<div name="ad" data-and="p42" id="p42" v-if="advMode==2"></div>
			<div name="ad" data-and="p43" id="p43" v-if="advMode==2"></div>
		</div>
		<div class="newslist" v-if="advMode!=2">
			<div style="margin-top: 23px;" id="content2">
				<div id="tj">为您推荐</div>
				<div style="width:600px">
					<div style="background-color:#f75151;width: 60px;height: 1px;margin-top: 5px;float:left;"></div>
					<div style="background-color:#e5e5e5;width: 500px;height: 1px;margin-top: 5px;float:left;"></div>
					<div style="clear:both;"></div>
				</div>
			</div>
		</div>
		<ul id="newsList" class="news-list" v-if="advMode!=2">
			<div v-for="(item,index) in list" :class="item.infoType==1?'ad':''">
				<div v-if="item.infoType==1" :id="item.AdId" v-show="!item.adHide"></div>
				<div class="item" @click="goHref(item.id)" :class="item.infoType==2?'ex1':''" v-else-if="item.infoType==2" style="display: flex;justify-content: space-between;">

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
				<div v-else-if="item.infoType==3" @click="goHref(item.id)" class="item" :class="item.infoType==3?'ex2':''">
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
	let x = null
	import topLoad from "../components/topLoad.vue"
	export default {
		name: 'detail',
		components: {
			topLoad // //注册组件
		},
		data() {
			return {
				data: "",
				list: "",
				content: "",
				adList: ['xz1', 'xz2', 'xz3', 'xz4', 'xz5'],
				cid: this.$route.query.cid,
				adArray: ['p1', 'p36', 'p4', 'p5', 'p6', 'p7', 'p40', 'p41', 'p42', 'p43'],
				page: 0,
				advMode: "",
				s: 0,
				clickNum: 0,
				clickTimes: "",
				clickTimes2: "",
				clickMin: "",
				lastTime: "",
				noAd: true,
				loadTx: 0,
				psMsg: {
					text: "阅读任意2-3篇内容，时长≥45秒",
					step: 0,
					success: 0,
					imgCdnUrl: "http://res.hodanet.com/upload/sy/20201117/17/1608196908925.png",
					width: this.$route.query.width,
				},
				detailRate: "",
				adNum: "",
				adHide: "",
				height: "400px",
				zhankai: true,
				detailRate: "",
				adNum: "",
				advMin: "",
				advUvUpper: "",
				advPvUpper: ""
			}
		},
		inject: ["reload"],
		methods: {
			autoHeight() {
				this.height = "auto"
				this.zhankai = false
			},
			goHref(id) {
				let that = this
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
					} else if (Number(localStorage.width) >= 30 && localStorage.readAd == 2) {
						if (Number(localStorage.touch) > 0) {
							console.log(Number(localStorage.touch))
							let index = 87 - Number(localStorage.width)
							this.psMsg.width = 87
							localStorage.width = 87
							localStorage.setItem("over", 1)
							setTimeout(function() {
								that.psMsg.success = 1
								that.psMsg.text = "任务已完成"
								that.psMsg.imgCdnUrl = "http://res.hodanet.com/upload/sy/20201118/16/1608280846541.png"
							}, 4000)
						} else {
							this.psMsg.text = "滑动页面，可继续完成任务"
						}

					}
					localStorage.click = Number(localStorage.click) + 1
				}
				this.$router.push({
					path: '/detail',
					query: {
						id: id,
						cid: this.cid,
						width: localStorage.width
					}
				});
				this.reload()
			},
			touch(e) {
				let that = this
				if (localStorage.getItem("over") != 1) {
					if (that.loadTx == 1) {
						if (Number(localStorage.width) < 30) {
							let index = 10
							that.psMsg.width = Number(localStorage.width) + Number(index)
							console.log(that.psMsg.width)
							if (that.psMsg.width >= 30) {
								that.psMsg.step = 1
								that.psMsg.text = "点击页面中的广告,可继续倒计时"
							}
							localStorage.width = that.psMsg.width
						} else if (Number(localStorage.width) >= 30 && localStorage.readAd == 2) {
							if (Number(localStorage.touch) > 0) {
								console.log(Number(localStorage.touch))
								let index = 87 - Number(localStorage.width)
								this.psMsg.width = 87
								localStorage.width = 87
								localStorage.setItem("over", 1)
								setTimeout(function() {
									that.psMsg.success = 1
									that.psMsg.text = "任务已完成"
									that.psMsg.imgCdnUrl = "http://res.hodanet.com/upload/sy/20201118/16/1608280846541.png"
								}, 4000)
							} else {
								this.psMsg.text = "滑动页面，可继续完成任务"
							}
						}
						localStorage.touch = Number(localStorage.touch) + 1
					}
				}
			},
			clickNews(id) {
				this.$router.push({
					path: '/detail',
					query: {
						id: id,
						cid: this.cid
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
					clickTimes = 0
				}
				this.clickTimes = clickTimes
				this.showTimes = showTimes
				let lastTime = localStorage.getItem("lastTime")
				this.lastTime = lastTime || ""
			},
			warn() {
				this.$axios.get("reportBlockAdv.htm?type=2&page=1&cid=" + this.cid).then(() => {
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
		mounted() {
			let that = this
			setTimeout(function() {
				window.scrollTo(0, 0)
				that.s = 0
				that.page=0
			}, 100)
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
					if (h < 200 && that.s == 0 && that.advMode != 2) {
						that.page++
						that.s = 1
						console.log(that.page)
						if (that.advMode == 3) {
							that.$axios.get("../getNewsArray.htm?category=0&num=5&cid=" + that.cid).then((res) => {
								let list = res.data.data
								let array = []
								for (let o = 0; o < 3; o++) {
									let json = {
										AdId: Math.floor(Math.random() * 90000) + 10000,
										infoType: 1
									}
									array.push(json)
								}
								list = array.concat(list)
								array = []
								for (let o = 0; o < 2; o++) {
									let json = {
										AdId: Math.floor(Math.random() * 90000) + 10000,
										infoType: 1
									}
									array.push(json)
								}
								list.splice(6, 0, array)
								let result = [].concat.apply([], list)
								that.list = that.list.concat(result)
								if (that.jsAdv) {
									let arr8 = new Array(5).keys();
									let f = 0
									if (that.detailRate) {
										let detailRate = Math.round(that.detailRate * 5)
										arr8 = Array.from(arr8);
										arr8 = that.makeRandomArr(arr8, detailRate)

									}
									console.log(that.list,that.page)
									for (let i = 10 * that.page; i < (that.page + 1) * 10; i++) {
										console.log(that.list[i])
										if (that.list[i].AdId) {
											if (that.detailRate) {
												if (arr8.indexOf(f) > -1) {
													that.list[i]['adHide'] = 1
													let data = that.list[i]
													that.list.splice(i, 1, data)
												}
											} 
											setTimeout(function() {
												console.log(that.list[i].AdId)
												let id = that.jsAdv[that.adArray[randomNum(0, 9)]]
												if (id) {
													that.code(id, that.list[i].AdId)
												}

											}, 300)
											f++
										}
									}
								}
							})

						} else if (that.advMode == 4) {
							that.$axios.get("../getNewsArray.htm?category=0&num=16&cid=" + that.cid).then((res) => {
								let list = res.data.data
								let array = [1, 3, 10, 12, 20]
								for (let i = 0; i < 5; i++) {
									let json = {
										AdId: Math.floor(Math.random() * 90000) + 10000,
										infoType: 1
									}
									list.splice(array[i], 0, json)
								}
								that.list = that.list.concat(list)
								if (that.jsAdv) {
									let arr8 = new Array(5).keys();
									let f = 0
									if (that.detailRate) {
										let detailRate = Math.round(that.detailRate * 5)
										arr8 = Array.from(arr8);
										arr8 = that.makeRandomArr(arr8, detailRate)
									}

									for (let i = 21 * that.page; i < (that.page + 1) * 21; i++) {
										if (that.list[i].AdId) {
											if (that.detailRate) {
												if (arr8.indexOf(f) > -1) {
													that.list[i]['adHide'] = 1
													let data = that.list[i]
													that.list.splice(i, 1, data)
												}
											}
											setTimeout(function() {
												console.log(that.list[i].AdId)
												let id = that.jsAdv[that.adArray[randomNum(0, 9)]]
												if (id) {
													that.code(id, that.list[i].AdId)

												}

											}, 300)
											f++
										}
									}
								}
							})
						} else if (that.advMode == 5) {
							that.$axios.get("../getNewsArray.htm?category=0&num=5&cid=" + that.cid).then((res) => {
								let list = res.data.data
								let json = {
									AdId: Math.floor(Math.random() * 90000) + 10000,
									infoType: 1
								}
								list.splice(1, 0, json)
								json = {
									AdId: Math.floor(Math.random() * 90000) + 10000,
									infoType: 1
								}
								list.splice(3, 0, json)
								that.list = that.list.concat(list)
								if (that.jsAdv) {
									let arr8 = new Array(2).keys();
									let f = 0
									if (that.detailRate) {
										let detailRate = Math.round(that.detailRate * 2)
										arr8 = Array.from(arr8);
										arr8 = that.makeRandomArr(arr8, detailRate)
									}

									for (let i = 7 * that.page; i < (that.page + 1) * 7; i++) {
										if (that.list[i].AdId) {
											console.log(that.list[i].AdId)
											if (that.detailRate) {
												if (arr8.indexOf(f) > -1) {
													that.list[i]['adHide'] = 1
													let data = that.list[i]
													that.list.splice(i, 1, data)
												}
											}
											setTimeout(function() {
												console.log(that.list[i].AdId)
												let id = that.jsAdv[that.adArray[randomNum(0, 9)]]
												if (id) {
													that.code(id, that.list[i].AdId) 
												}
											}, 300)
											f++
										}
									}

								}
							})
						}
						setTimeout(() => {
							that.s = 0
						}, 1000)
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
			this.$axios.get("../getDetailData.htm?cid=" + this.cid + "&id=" + this.$route.query.id).then((res) => {
				console.log(res.data.data.detail)
				this.data = res.data.data.detail
				this.content = this.data.contents[0].content
			})
			this.$axios.get("../api/getAdvs.htm?cid=" + this.cid).then((res) => {
				console.log(res.data)
				this.loadTx = res.data.taskSwitch
				// this.loadTx = 1 
				this.listRate = res.data.listRate
				this.advUvUpper = res.data.advUvUpper
				this.advPvUpper = res.data.advPvUpper
				this.advMin = res.data.advMin
				// this.loadTx = 1
				if (this.loadTx != 1) {
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
				if (res.data.detailRate) {
					this.detailRate = res.data.detailRate
				}
				if (res.data.cnzzUrl) {
					let cnzz_s_tag = document.createElement('script');
					cnzz_s_tag.type = 'text/javascript';
					cnzz_s_tag.async = true;
					cnzz_s_tag.src = res.data.cnzzUrl
					let root_s = document.getElementsByTagName('script')[0];
					root_s.parentNode.insertBefore(cnzz_s_tag, root_s);
				}
				if (res.data.advBlock == 1) {
					this.noAd = true
					this.$axios.get("../getNewsArray.htm?category=0&page=1&num=10&cid=" + this.$route.query.cid).then((res) => {
						let list = res.data.data
						this.list = list
					})
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
					let date = localStorage.getItem("date2")
					if (!date) {
						date = Math.round(new Date() / 1000)
						localStorage.setItem("date2", date)
					} else {
						let date2 = Math.round(new Date() / 1000) - date
						if (date2 > 86400) {
							date = Math.round(new Date() / 1000)
							localStorage.setItem("date", date)
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
								// id = eval('(' + id + ')');
								// console.log(id.id)
								// window.sogou_un = window.sogou_un || [];
								// window.sogou_un.push({
								// 	id:  id.id,
								// 	ele: sogou_div
								// });
							}

						}
					}
					if (this.noAd == false) {
						if (this.advMode == 1) {
							this.$axios.get("../getNewsArray.htm?category=0&page=1&num=5&cid=" + this.$route.query.cid).then((res) => {
								let list = res.data.data
								this.list = list
							})
							if (that.jsAdv) {
								let newArray = ["p1", "p4", "p5", "p6", "p7"]
								setTimeout(function() {
									if (that.detailRate) {
										let arr = that.makeRandomArr(newArray, Math.round(5 * that.detailRate))
										arr.forEach(item => {
											document.getElementById(item).style.display = "none"
										})
									}
									newArray.forEach(item => {
										let id = that.jsAdv[item]
										if (id) {
											that.code(id, item)
											// id = eval('(' + id + ')');
											// let sogou_div = document.getElementById(item);
											// window.sogou_un = window.sogou_un || [];
											// window.sogou_un.push({
											// 	id: id.id,
											// 	ele: sogou_div
											// });
										}
									})
								}, 100)
							}
						}
						if (this.advMode == 2) {
							if (that.jsAdv) {
								let newArray = ["p1", "p4", "p5", "p6", "p7", "p40", "p41", "p42", "p43"]
								setTimeout(function() {
									if (that.detailRate) {
										let arr = that.makeRandomArr(newArray, Math.round(9 * that.detailRate))
										arr.forEach(item => {
											document.getElementById(item).style.display = "none"
										})
									}
									newArray.forEach(item => {
										let id = that.jsAdv[item]
										if (id) {
											that.code(id, item)
											// id = eval('(' + id + ')');
											// let sogou_div = document.getElementById(item);
											// window.sogou_un = window.sogou_un || [];
											// window.sogou_un.push({
											// 	id: id.id,
											// 	ele: sogou_div
											// });
										}
									})
								}, 100)
							}
						} else if (this.advMode == 3) {
							this.$axios.get("../getNewsArray.htm?category=0&page=1&num=5&cid=" + this.$route.query.cid).then((res) => {
								let list = res.data.data
								let array = []
								for (let o = 0; o < 3; o++) {
									let json = {
										AdId: Math.floor(Math.random() * 90000) + 10000,
										infoType: 1
									}
									array.push(json)
								}
								list = array.concat(list)
								array = []
								for (let o = 0; o < 2; o++) {
									let json = {
										AdId: Math.floor(Math.random() * 90000) + 10000,
										infoType: 1
									}
									array.push(json)
								}
								list.splice(6, 0, array)
								let result = [].concat.apply([], list)
								this.list = result
								if (that.jsAdv) {
									let newArray = ["p1", "p4", "p5", "p6", "p7"]
									setTimeout(function() {
										if (that.detailRate) {
											let arr = that.makeRandomArr(newArray, Math.round(5 * that.detailRate))
											arr.forEach(item => {
												document.getElementById(item).style.display = "none"
											})
										}
										newArray.forEach(item => {
											let id = that.jsAdv[item]
											if (id) {
												that.code(id, item)
												// id = eval('(' + id + ')');
												// let sogou_div = document.getElementById(item);
												// window.sogou_un = window.sogou_un || [];
												// window.sogou_un.push({
												// 	id: id.id,
												// 	ele: sogou_div
												// });
											}
										})
										let arr8 = new Array(5).keys();
										let f = 0
										if (that.detailRate) {
											let detailRate = Math.round(that.detailRate * 5)
											arr8 = Array.from(arr8);
											arr8 = that.makeRandomArr(arr8, detailRate)

										}
										for (let i = 0; i < that.list.length; i++) {
											if (that.list[i].AdId) {
												if (that.detailRate) {
													if (arr8.indexOf(f) > -1) {
														that.list[i]['adHide'] = 1
														let data = that.list[i]
														that.list.splice(i, 1, data)
													}
												}
												let id = that.jsAdv[that.adArray[randomNum(0, 9)]]
												if (id) {
													that.code(id, that.list[i].AdId)
													// id = eval('(' + id + ')');
													// let sogou_div = document.getElementById(that.list[i].AdId);
													// window.sogou_un = window.sogou_un || [];
													// window.sogou_un.push({
													// 	id: id.id,
													// 	ele: sogou_div
													// });
												}
												f++
											}
										}
									}, 100)
								}
							})
						} else if (this.advMode == 4) {
							this.$axios.get("../getNewsArray.htm?category=0&page=1&num=16&cid=" + this.$route.query.cid).then((res) => {
								let list = res.data.data
								let array = [1, 3, 10, 12, 20]
								for (let i = 0; i < 5; i++) {
									let json = {
										AdId: Math.floor(Math.random() * 90000) + 10000,
										infoType: 1
									}
									list.splice(array[i], 0, json)
								}
								this.list = list
								if (that.jsAdv) {
									let newArray = ["p1", "p5"]
									setTimeout(function() {
										if (that.detailRate) {
											let arr = that.makeRandomArr(newArray, Math.round(2 * that.detailRate))
											arr.forEach(item => {
												document.getElementById(item).style.display = "none"
											})
										}
										newArray.forEach(item => {
											let id = that.jsAdv[item]
											if (id) {
												that.code(id, that.list[i].item)
												// id = eval('(' + id + ')');
												// let sogou_div = document.getElementById(item);
												// window.sogou_un = window.sogou_un || [];
												// window.sogou_un.push({
												// 	id: id.id,
												// 	ele: sogou_div
												// });
											}
										})
										let arr8 = new Array(5).keys();
										let f = 0
										if (that.detailRate) {
											let detailRate = Math.round(that.detailRate * 5)
											arr8 = Array.from(arr8);
											arr8 = that.makeRandomArr(arr8, detailRate)
										}
										for (let i = 0; i < that.list.length; i++) {
											if (that.list[i].AdId) {
												if (that.detailRate) {
													if (arr8.indexOf(f) > -1) {
														that.list[i]['adHide'] = 1
														let data = that.list[i]
														that.list.splice(i, 1, data)
													}
												}
												let id = that.jsAdv[that.adArray[randomNum(0, 9)]]
												if (id) {
													that.code(id, that.list[i].AdId)
													// id = eval('(' + id + ')');
													// let sogou_div = document.getElementById(that.list[i].AdId);
													// window.sogou_un = window.sogou_un || [];
													// window.sogou_un.push({
													// 	id: id.id,
													// 	ele: sogou_div
													// });
												}
												f++
											}
										}
									}, 100)
								}

							})
						} else if (this.advMode == 5) {
							this.$axios.get("../getNewsArray.htm?category=0&page=1&num=5&cid=" + this.$route.query.cid).then((res) => {
								let list = res.data.data
								let array = [1, 3]
								for (let i = 0; i < 2; i++) {
									let json = {
										AdId: Math.floor(Math.random() * 90000) + 10000,
										infoType: 1
									}
									list.splice(array[i], 0, json)
								}
								console.log(list)
								this.list = list
								if (that.jsAdv) {
									let newArray = ["p1", "p4", "p5", "p6", "p7"]
									setTimeout(function() {
										if (that.detailRate) {
											let arr = that.makeRandomArr(newArray, Math.round(5 * that.detailRate))
											arr.forEach(item => {
												document.getElementById(item).style.display = "none"
											})
										}
										newArray.forEach(item => {
											let id = that.jsAdv[item]
											if (id) {
												that.code(id, item)
												// id = eval('(' + id + ')');
												// let sogou_div = document.getElementById(item);
												// window.sogou_un = window.sogou_un || [];
												// window.sogou_un.push({
												// 	id: id.id,
												// 	ele: sogou_div
												// });
											}
										})
										let arr8 = new Array(2).keys();
										let f = 0
										if (that.detailRate) {
											let detailRate = Math.round(that.detailRate * 2)
											arr8 = Array.from(arr8);
											arr8 = that.makeRandomArr(arr8, detailRate)
										}
										for (let i = 0; i < that.list.length; i++) {
											if (that.list[i].AdId) {
												if (that.detailRate) {
													if (arr8.indexOf(f) > -1) {
														that.list[i]['adHide'] = 1
														let data = that.list[i]
														that.list.splice(i, 1, data)
													}
												}
												let id = that.jsAdv[that.adArray[randomNum(0, 9)]]
												if (id) {
													that.code(id, that.list[i].AdId)
													// id = eval('(' + id + ')');
													// let sogou_div = document.getElementById(that.list[i].AdId);
													// window.sogou_un = window.sogou_un || [];
													// window.sogou_un.push({
													// 	id: id.id,
													// 	ele: sogou_div
													// });
												}
												f++
											}
										}
									}, 100)
								}
							})
						}
					}
				}

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
			let width = Number(localStorage.getItem("width")) + 30
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
		padding-top: 95px;
	}

	.loadingText {
		font-size: 15px;
		text-align: center;
		line-height: 30px;
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
		background: url(http://res.hodanet.com/upload/sy/20201117/17/1608196908925.png);
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

	h3 {
		margin: 40px 0 0;
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
		color: #000000;
	}

	.content {
		margin: 0 auto;
		width: 100%;
		overflow: hidden;
	}

	img {
		width: 100%
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

	.newscontent {
		overflow: hidden;
		margin: 0 auto;
		width: 92%;
	}

	.newslist {
		overflow: hidden;
		margin: 0 auto;
		width: 92%;
	}

	.head-title {
		float: left;
		color: #999;
		font-size: 12px
	}

	#content {
		clear: both;
		font-size: 18px;
		line-height: 28px;
		overflow: hidden;
		text-align: justify;
	}

	#content img {
		width: 100%;
		height: auto;
		margin-top: 20px;
	}

	.title {
		margin-top: 16px;
		margin-bottom: 12px;
		color: #3a3a3a;
		font-weight: 700;
		font-size: 22px;
		line-height: 28px
	}

	.like {
		color: #505050;
		font-size: 16px;
		width: 92%;
		margin: 0px auto;
	}

	#tj {
		color: #505050;
		font-size: 16px
	}

	.item {
		width: 92%;
		overflow: hidden;
		margin: 0 auto;
		position: relative;
		display: block;
		border-bottom: 1px solid #eeeeee;
		padding: 12px 0;
	}

	.ex1-left {
		width: 63%;
		float: left;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between
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

	.adHidden {
		display: none;
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

	.Unfolded-btn {
		text-align: center;
		position: relative;
		padding-bottom: 40px;
	}

	.Unfolded-btn .Unfolded-cover {
		position: absolute;
		top: -78px;
		height: 78px;
		width: 100%;
		background-image: linear-gradient(-180deg, hsla(0, 0%, 100%, 0), #fff);
	}


	.Unfolded-btn .Unfolded-link {
		display: inline-block;
		cursor: pointer;
		font-size: 16px;
		line-height: 22px;
		border-radius: 29px;
		color: #2a90d7;
		text-align: center;
	}

	.Unfolded-btn .Unfolded-link:after {
		content: "";
		background-image: url(//mini.eastday.com/toutiaoh5/img/down.png);
		background-size: contain;
		background-repeat: no-repeat;
		width: 12px;
		height: 12px;
		display: inline-block;
		margin-left: 5px;
	}
</style>
