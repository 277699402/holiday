
<style scoped lang="scss" rel="stylesheet/scss">
    .prompt {
        position: absolute;
        top: 0;
        left: 100%;
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        z-index: 600;
        transition: opacity .6s;
        opacity: 0;
        p {
            padding: 8px 20px;
            background-color: rgba(0, 1, 1, 0.6);
            color: #fff;
            border-radius: 4px;
            -webkit-border-radius: 4px;
            font-size: 13px;
            z-index: 1;
        }
    }

    .promptActive {
        left: 0;
        opacity: 1;
    }
</style>
<template>
    <section class="prompt" :class="{ promptActive: show }">
        <p>{{ msg }}</p>
    </section>
</template>
<script>
    import { promptData } from '../../store/data';
    export default{
        data () {
            return promptData
        }
    }
</script>