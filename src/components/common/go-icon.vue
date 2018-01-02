<style scoped lang="scss" rel="stylesheet/scss">
    @import '../../styles/_common.scss';
    .go_icon {
        width: .6rem;
        height: .6rem;
        display: block;
        border-top: 1px solid #999;
        border-right: 1px solid #999;
        @include rotate(45deg);
    }
    .app-ar .go_icon {
        @include rotate(225deg);
    }
</style>
<template>
    <i class="go_icon"></i>
</template>