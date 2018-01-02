/**
 * Created by linchong on 16/11/11.
 */
const Index = r => require.ensure([], () => r(require('./views/index/index.vue')), 'index');

const routers = [
	{
		path: '/', component: Index, name: 'index'
	},
	{
		path: '/index', redirect: '/'
	}
];

export default routers;