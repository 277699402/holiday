<style scoped lang="scss" rel="stylesheet/scss">
    .loading {
        position: absolute;
        top: 0;
        left: 100%;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        opacity: 0;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        transition: opacity .6s;
        transition-delay: 0.2s;
        z-index: 550;
        .loader {
            margin: 6rem auto;
            font-size: 10px;
            position: relative;
            text-indent: -9999em;
            border-top: 0.5rem solid rgba(255, 255, 255, 0.2);
            border-right: 0.5rem solid rgba(255, 255, 255, 0.2);
            border-bottom: 0.5rem solid rgba(255, 255, 255, 0.2);
            border-left: 0.5rem solid #ffffff;
            -webkit-animation: loadCircle 1.1s infinite linear;
            animation: loadCircle 1.1s infinite linear;
            border-radius: 50%;
            width: 5rem;
            height: 5rem;
            &:after{
                border-radius: 50%;
                width: 10rem;
                height: 10rem;
            }
        }

        &.loadingActive {
            left: 0;
            opacity: 1;
        }
    }
    @-webkit-keyframes loadCircle {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes loadCircle {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
<template>
    <section class="loading" :class="{ 'loadingActive': show, 'fn-hide': !show }">
        <div class="loader"></div>
    </section>
</template>
<script>
    import { loadingData } from '../../store/data';

    export default{
        data () {
            return loadingData;
        }
    }
</script>