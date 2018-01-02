/*引入插件*/
import Vue from 'vue';
import VueRouter from 'vue-router';

/*引入组件*/
import App from './components/app';
import Routers from './router';
import Config from './config/config';

/*引入loading and prompt*/
import Loading from './components/common/loading';
import Prompt from './components/common/prompt';
Vue.component('loading', Loading);
Vue.component('prompt', Prompt);


/*引入全局指令*/
import './directives/common/vue-lazyload';
import VueLazyLoadImg from 'vue-lazy-load-img';

Vue.use(VueRouter);
Vue.use(Vue.lazyimg, {fadein: false, nohori: true});
Vue.use(VueLazyLoadImg);

// 开启debug模式
Vue.config.debug = true;
// 路由配置
const router = new VueRouter({
    mode: 'hash',
	routes: Routers
});

import http from './libs/js/common/http';


new Vue({
	router,
	data () {

	},
	watch: {
		'$route' (to, from){

		}
	},
	render: h => h(App)
}).$mount('#app');