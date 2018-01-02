<style scoped lang="sass" rel="stylesheet/scss">
    @import '../../styles/_common.scss';
    .go-back {
        width: 1.2rem;
        height: 1.2rem;
        display: block;
        border-left: .15rem solid #151515;
        border-top: .15rem solid #151515;
        @include rotate(-45deg);
    }
    .app-ar .go-back {  @include rotate(135deg);  }
</style>
<template>
    <i class="go-back"></i>
</template>