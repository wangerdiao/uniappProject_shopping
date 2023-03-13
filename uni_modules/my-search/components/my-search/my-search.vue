<template>
  <view class="container" :style="{'background-color':bgColor}" @click="searchHandler"> 
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholader">搜索</text>
    </view> 
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      //背景颜色
      bgColor:{
        type:String,
        default: '#C00000',
      },
      radius:{
        type:Number,
        default:18,
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      searchHandler() {
        console.log('goto');
        this.$emit('goSearch')
      }
    }
  }
</script>

<style lang="scss">
.container {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-search-box {
    height: 36px;
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholader {
      font-style: 15px;
      margin-left: 5px;
    }
  }
}
</style>