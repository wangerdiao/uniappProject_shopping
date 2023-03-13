<template>
  <view>
    <!-- 搜索组件区域 -->
    <view class="search-box">
      <my-search></my-search>
    </view>
    <!-- 轮播图区域   -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="navList">
      <view class="navList-item" v-for="(item,i) in navList" :key="i" @click="gotoCate(item)">
        <image :src="item.image_src" mode="" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floorList">
        <view class="floorList-item" v-for="(item,i) in floorList" :key="i">
          <!-- 楼层标题 -->
          <image :src="item.floor_title.image_src" mode="" class="floor-image"></image>
          <!-- 楼层的图片区域 -->
          <view class="floorList-img">
            <!-- 左侧图片的盒子 -->
              <navigator class="imgLeft" :url="item.product_list[0].url">
                <image :src="item.product_list[0].image_src" mode="widthFix"
                 :style="{width:item.product_list[0].image_width + 'rpx'}"
                ></image>
              </navigator>
              <!-- 右侧图片的盒子 -->
              <view class="imgRight">
                <navigator class="imgRight-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !==0" :url="item2.url">
                  <image :src="item2.image_src" mode="widthFix"
                    :style="{width:item2.image_width + 'rpx'}"
                  ></image>
                </navigator>
              </view>
          </view>
        </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[] , //轮播图数据
        navList:[] , //分类导航数据
        floorList:[],//楼层的数据
      };
    },
    onLoad() {
      //在页面加载时获取轮播图数据
      this.getSwiperList()
      //获取分类导航数据
      this.getNavList()
      //获取楼层的数据
      this.getFloorList()
    },
    methods:{
      //获取轮播图数据
      async getSwiperList() {
        const {data} = await uni.$http.get('/home/swiperdata')
        if(data.meta.status == 200) {
          this.swiperList = data.message
        }else {
          return uni.$showMsg()
        }
      },
      //获取分类导航数据
      async getNavList() {
        const {data} = await uni.$http.get('/home/catitems')
        if(data.meta.status == 200) {
          this.navList = data.message
        }else {
          return uni.$showMsg()
        }
      },
      //跳转到分类页面
      gotoCate(item) {
        if(item.name == '分类') {
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      //getFloorList获取楼层的数据
      async getFloorList() {
        const {data} = await uni.$http.get('/home/floordata')
        console.log(data)
        if(data.meta.status == 200) {
          //对数据进行处理
          data.message.forEach(item1 => {
            item1.product_list.forEach(item2 => {
              item2.url = '/subpkg/goods_list/goods_list?' + item2.navigator_url.split('?')[1]
            })
          })
          this.floorList = data.message
        }else {
          return uni.$showMsg()
        }
      },
      
    } 
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  //轮播图
  swiper{
    height: 330rpx;
    .swiper-item,image {
      width: 100%;
      height: 100%;
    }
  }
  //分类导航
  .navList {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    .navList-item {
      .nav-img {
        width: 128rpx;
        height: 140rpx;
      }
    }
  }
  //楼层标题区域
  .floor-image {
    width: 100%;
    height: 60rpx;
    display: flex;
  }
  //楼层图片区域
  .floorList-img {
    display: flex;
    justify-content: space-between;
    margin-left: 5rpx;
    .imgRight {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
</style>
