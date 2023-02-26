<script setup>
</script>

<template>
    <div class="lds-ripple">
        <div />
        <div />
    </div>
</template>

<style scoped lang="scss">
.lds-ripple {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
}

.lds-ripple div {
    position: absolute;
    border: 4px solid #353589;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
}

@keyframes lds-ripple {
    0% {
        top: 22px;
        left: 22px;
        width: 0;
        height: 0;
        opacity: 0;
        @media only screen and (max-width: $mobile) {
            top: 11px;
            left: 11px;
        }
    }
    4.9% {
        top: 22px;
        left: 22px;
        width: 0;
        height: 0;
        opacity: 0;
        @media only screen and (max-width: $mobile) {
            top: 11px;
            left: 11px;
        }
    }
    5% {
        top: 22px;
        left: 22px;
        width: 0;
        height: 0;
        opacity: 1;
        @media only screen and (max-width: $mobile) {
            top: 11px;
            left: 11px;
        }
    }
    100% {
        top: 0;
        left: 0;
        width: 44px;
        height: 44px;
        opacity: 0;
        @media only screen and (max-width: $mobile) {
            width: 22px;
            height: 22px;
        }
    }
}
</style>
