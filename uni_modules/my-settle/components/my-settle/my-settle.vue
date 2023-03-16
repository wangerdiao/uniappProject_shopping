<template>
  <view class="my-settle-container">
      <view class="allBoxRadio">
        <radio color="#C00000" :checked="isAllGoodsChecked" @click="radioChangeHandler">
          <view class="allBoxSelect">
            全选
          </view>
        </radio>
      </view>
      <view class="totalPrice">
        合计：<text class="text">￥ {{getTotalPrice}}</text>
      </view>
      <view class="pay">
        <view class="payInfo">结算({{getCheckedTotal}})</view>
      </view>
  </view>
</template>
<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    computed:{
      ...mapGetters('m_cart',['isAllGoodsChecked','getCheckedTotal','getTotal','getTotalPrice']),
    },
    methods:{
      ...mapMutations('m_cart',['updateAllChecked']),
      radioChangeHandler() {
        this.updateAllChecked(!this.isAllGoodsChecked)
      }
    }
  }
</script> 
<style lang="scss">
  .my-settle-container {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    background-color: #fff;
    border: 1px solid #efefef;
    .totalPrice {
      .text {
        color: red;
      }
    }
    .pay {
      padding-right: 5px;
      .payInfo {
        background-color: red;
        text-align: center;
        height: 50px;
        color:white;
        padding: 0 10px;
        line-height: 50px;
        min-width: 100px;
      }
    }
  }
</style>
