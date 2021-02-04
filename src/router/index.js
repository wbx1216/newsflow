import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue' 
import detail from '@/components/detail.vue' 
Vue.use(Router)

export default new Router({
	mode: 'hash', 
	routes: [{
			path: '/',
			name: 'index',
			component: index,
			meta:{
				  keepAlive: true
			}
			
		},
		{
			path: '/detail',
			name: 'detail',
			component: detail
		}
	]
})
