<template>
  <view >
    <!-- 购物车为空时展示 -->
    <view class="carIsNull" v-if="cart.length==0">
      <view class="img">
        <image src="/static/my-icons/cartempty.jpg" mode="widthFix"></image>
      </view>
      <view>空空如也</view>
    </view>
    <view class="container" v-else>
      <!-- 收获地址组件 -->
      <my-address></my-address>
      <!-- 商品列表区域 -->
      <view class="goodsList">
        <!-- 购物车标题 -->
        <view class="title">
          <uni-icons type="shop" size="25"></uni-icons>
          <text class="cart">购物车</text>
        </view>
        <!-- 购物车数据区域 -->
        <view class="goodsAllItem">
           <uni-swipe-action>
             <block v-for="item in cart" :key="item.goods_id">
                <uni-swipe-action-item :right-options="options" @click="deleteSwipeItem(item)">
                  <my-goods :item="item" :showRaiodsAndNumberBox="true" @radio-change="radioChangeHandler" @num-change="numChangeHandler"></my-goods>
                </uni-swipe-action-item>
             </block>
           </uni-swipe-action>
        </view>
      </view>
      <!-- 底部结算组件 -->
      <my-settle></my-settle>
    </view>
  </view>
</template>

<script>
  import  badgeMix from '@/mixins/tarbar-badge.js'
  import {mapState,mapMutations} from 'vuex'
  export default {
    mixins:[badgeMix],
    computed:{
      ...mapState('m_cart',['cart'])
    },
    data() {
      return {
        options:[
          {
            text:'删除',
            style:{
              backgroundColor:'#C00000'
            }
          }
        ]
      };
    },
    methods:{
      ...mapMutations('m_cart',['setGoods_isChacked','updateGoodsCount','deleteGoods']),
      //复选框回调
      radioChangeHandler(e) {
        this.setGoods_isChacked(e)
      },
      //商品购买数量变化的回调
      numChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      //删除购物车商品的回调
      deleteSwipeItem(item) {
        this.deleteGoods(item)
      }
    },
    onShow() {
      
    },
  }
</script>

<style lang="scss">
  .carIsNull{
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img {
      image{
        width: 200px;
        height: 200px;
      }
    }
  }
.container {
  padding-bottom: 50px;
}
.goodsList {
  .title {
    display: flex;
    align-items: center;
    padding: 10px 5px;
    border-bottom: 1px solid #efefef ;
    .cart {
      margin-left: 5px;
    }
  }
}
</style>
