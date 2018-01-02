<template>
    <div class="countdown">
        <div class="countdownTime">
            <span>{{timeArr.hours}}</span>:<span>{{timeArr.minutes}}</span>:<span>{{timeArr.seconds}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return{
                timeArr: {
                    'day': Math.floor((this.time / 3600 / 24)),
                    'hours': Math.floor((this.time / 3600)) < 10 ? '0' + Math.floor(this.time / 3600) : Math.floor((this.time / 3600)),
                    'minutes': Math.floor((this.time / 60) % 60) < 10 ? '0' + Math.floor((this.time / 60) % 60) : Math.floor((this.time / 60) % 60),
                    'seconds': Math.floor(this.time % 60) < 10 ? '0' + Math.floor(this.time % 60) : Math.floor(this.time % 60)
                }
            }
        },
        mounted () {
            let _this = this, SysSecond = _this.time,timeArr = _this.timeArr;
            if(SysSecond > 0){
                const InterValObj = window.setInterval(function(){
                    if (SysSecond > 0) {
                        SysSecond = SysSecond - 1;
                        let second = Math.floor(SysSecond % 60),
                            minute = Math.floor((SysSecond / 60) % 60),
                            hour = Math.floor((SysSecond / 3600)),
                            day = Math.floor((SysSecond / 3600 / 24));
                        day < 10 ? timeArr.day = 0 : timeArr.day = day;
                        second < 10 ? timeArr.seconds = "0" +second : timeArr.seconds = second;
                        minute < 10 ? timeArr.minutes = "0" + minute : timeArr.minutes = minute;
                        hour < 10 ? timeArr.hours = "0" +  hour : timeArr.hours = hour;
                    } else {
                        window.clearInterval(InterValObj);
                        _this.callback();
                    }
                },1000);
            }
        },
        methods: {
            callback () {
                this.$emit('callback', () => {});
            }
        },
        props: ['time']
    }
</script>
