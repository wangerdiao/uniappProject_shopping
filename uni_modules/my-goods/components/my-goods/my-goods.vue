<template>
  <view class="goodsList-item" >
    <!-- 商品左侧图片区域 -->
    <view class="img">
      <image :src="item.goods_small_logo || deafult" mode="" ></image>
    </view>
    <!-- 右侧信息区域 -->
    <view class="itemNameAndPrice">
      <view class="name">{{item.goods_name}}</view>
      <view class="goodsInfo">
        <view class="price">
          ￥{{item.goods_price.toFixed(2)}}
        </view>
      </view>
    </view>
  </view>

</template>
<script>
  export default {
    props:{
      item:{
        type:Object,
        deafult:{}
      }
    },
    data() {
      return {
        deafult:'https://www.somode.com/uploadimg/image/20230129/20230129150835_59024.jpg',
      }
    }
  }
</script>
<style lang="scss">
  .goodsList-item {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #f0f0f0;
  .img {
   display: block;
   margin-bottom: 8px;
   margin-right: 5px;
   padding: 10px 5px;
    image {
      width: 100px;
      height: 100px;
    }
  }
  .itemNameAndPrice {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      font-style: 13px;
    }
    .goodsInfo {
      .price {
        font-size: 16px;
        color: red;
      }
    }
  }
  }
</style>
