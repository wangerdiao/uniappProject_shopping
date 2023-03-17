<template>
  <view class="container">
    <my-login v-if="!token"></my-login>
    <my-userInfo v-else></my-userInfo>
  </view>
</template>

<script>
  import  badgeMix from '@/mixins/tarbar-badge.js'
  import {mapState} from 'vuex'
  export default {
    mixins:[badgeMix],
    computed:{
      ...mapState('m_user',['token'])
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
page,.container {
  height: 100%;
}
</style>
