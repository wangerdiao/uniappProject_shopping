<template>
  <view class="container">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,i) in goodsDetail.pics" :key="i">
        <image :src="item.pics_big" mode="" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goodsArea" v-if="goodsDetail.goods_price">
      <!-- 商品价格区域 -->
      <view class="price">￥{{goodsDetail.goods_price}}</view>
      <!-- 商品详细信息区域 和收藏按钮 -->
      <view class="goodsInfo">
        <view class="info">
          {{goodsDetail.goods_name}}
        </view>
        <view class="icon">
          <uni-icons type="star" size="30" color="gray"></uni-icons>
          <text class="iconText">收藏</text>
          <uni-icons type="star-filled" v-show="false"></uni-icons>
        </view>
      </view>
      <!-- 免运费区域 -->
      <view class="yunfei">快递:免运费</view>
      <rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
    </view>
    <!-- 商品导航组件 -->
   <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
   </view>
  </view>
</template>

<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default {
    computed:{
      ...mapGetters('m_cart',['getTotal'])
    },
    watch:{
      getTotal(newValue) {
        this.setCartInfo(newValue)
      }
    },
    data() {
      return {
        goodsDetail:{},//商品详情数据
        //左侧按钮组的配置对象
        options:[{
          icon:'shop',
          text:'店铺'
        },{
          icon:'cart',
          text:'购物车',
          info:0
        }],
        //右侧按钮配置对象
        buttonGroup:[
          {
            text:'加入购物车',
            backgroundColor:'#ff0000',
            color:'#fff'
          },
          {
            text:'立即购买',
            backgroundColor:'#ffa200',
            color:'#fff'
          }
        ]
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
      this.setCartInfo(this.getTotal)
    },
    methods:{
      ...mapMutations('m_cart',['addToCart']), //映射store中的方法
      async getGoodsDetail(goods_id) {
        const {data} = await uni.$http.get('/goods/detail',{goods_id})
        if(data.meta.status == 200) {
          data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g,'<img style="display:block;"').replace(/webp/g,'jpg')
          this.goodsDetail = data.message
        }else {
          return uni.$showMsg()
        }
      },
      //大图预览
      preview(i) {
        uni.previewImage({
          current:i,
          urls:this.goodsDetail.pics.map(x => x.pics_big)
        })
      },
      //导航组件click事件
      onClick(e) {
        if(e.content.text === '购物车') {
          console.log(1);
          uni.switchTab({
            url:'/pages/car/car'
          })
        }
      },
      //导航组件按钮事件@buttonClick
      buttonClick(e) {
        if(e.content.text === '加入购物车') {
          const goods = {
            goods_id:this.goodsDetail.goods_id,
            goods_name:this.goodsDetail.goods_name,
            goods_price:this.goodsDetail.goods_price,
            goods_count:1,
            goods_small_logo:this.goodsDetail.goods_small_logo,
            goods_state:this.goodsDetail.goods_state,
            goods_isChacked:true
          }
          this.addToCart(goods)
        }
      },
      //修改购物车数量的回调
      setCartInfo(newValue) {
        const findResult = this.options.find(x => x.text==='购物车')
        if(findResult) {
          findResult.info = newValue
        }
      }
    }
  }
</script>

<style lang="scss">
  .container{
    background-color: #fff;
    padding-bottom: 50px;
  }
swiper {
  height: 750rpx;
  image{
    width: 100%;
    height: 100%;
  }
}
.goodsArea {
  display: flex;
  flex-direction: column;
  margin: 5px 10px;
  .price {
    color: red;
    font-size: 20px
  }
  .goodsInfo {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 8px 0;
    .info {
      font-size: 14px;
      width: 80%;
      border-right:1px solid #efefef ;
      font-weight: 700;
    }
    .icon {
      display: flex;
      flex-direction: column;
      color: gray;
    }
  }
  .yunfei {
    color:#a1a1a1;
    font-size: 12px;
    margin-bottom: 10px;
  }
}
.goods_nav {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
