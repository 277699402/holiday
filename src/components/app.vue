<style lang="scss" rel="stylesheet/scss">
    @import '../styles/reset.scss';
    @import '../styles/_common';
    @import '../styles/transition.scss';
    html,body {
        height: 100%;
    }
</style>
<template>
    <div id="app" :class="{ 'fn-unscroll': unScroll }" >
        <transition :name="transitionName">
            <router-view class="J-app"></router-view>
        </transition>
        <loading></loading>
        <prompt></prompt>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                'transitionName': '',
                'fromPath': '',
                'unScroll': false                       //解决ios下屏幕滚动问题
            }
        },
        watch: {
            '$route' (to, from) {
                let _this = this;

                /*根据路由执行动画*/
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                _this.$root.fromPath = from.path;

                if(from.name) {
                    this.transitionName = toDepth <= fromDepth ? 'slide-left' : 'slide-right';
                }
            }
        }
    }
</script>
