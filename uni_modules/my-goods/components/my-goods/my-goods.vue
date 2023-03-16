<template>
  <view class="goodsList-item" >
    <!-- 商品左侧图片区域 -->
    <view class="img">
      <radio :checked="item.goods_isChacked" color="#C00000" v-if="showRaiodsAndNumberBox" @click="radioChangeHandler"></radio>
      <image :src="item.goods_small_logo || deafult" mode="" ></image>
    </view>
    <!-- 右侧信息区域 -->
    <view class="itemNameAndPrice">
      <view class="name">{{item.goods_name}}</view>
      <view class="goodsInfo">
        <view class="price">
          ￥{{item.goods_price.toFixed(2)}}
        </view>
        <uni-number-box class="numberBox" :min="1" :value="item.goods_count" v-if="showRaiodsAndNumberBox" @change="numChangeHandler"></uni-number-box>
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
      },
      showRaiodsAndNumberBox:{ //是否展示radio
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        deafult:'https://www.somode.com/uploadimg/image/20230129/20230129150835_59024.jpg',
      }
    },
    methods:{
      // 复选框回调
      radioChangeHandler() {
        this.$emit('radio-change',{
          goods_id:this.item.goods_id,
          goods_isChacked:!this.item.goods_isChacked
        })
      },
      // 商品购买数量变化的回调
      numChangeHandler(val) {
        this.$emit('num-change',{
          goods_id:this.item.goods_id,
          goods_count: + val,
        })
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
   display: flex;
   margin-bottom: 8px;
   margin-right: 5px;
   padding: 10px 5px;
   align-items: center;
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        font-size: 16px;
        color: red;
      }
      .numberBox {
        border: 1px solid white;
      }
    }
  }
  }
</style>
