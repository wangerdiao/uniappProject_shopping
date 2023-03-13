<template>
  <view>
    <my-search @goSearch="goSearch"></my-search>
    <view class="scrollContainer">
      <!-- 左侧滑动区 -->
      <scroll-view scroll-y="true" class="leftScroll" :style="{height:wh+'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['leftScrollItem', i===active?'active':'']" @click="changeItem(item,i)">
            {{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧滑动区 -->
      <scroll-view scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
        <view class="cateLeve2" v-for="(item,i) in cateLevel2" :key="i">
            <view class="cateLeve2-title">
              {{item.cat_name}}
            </view> 
            <view class="cateLevel3-shop">
              <view class="cateLevel3-shop-item" v-for="(item2,i2) in item.children" :key="i2" @click="gotoGoodsList(item2)">
                <image :src="item2.cat_icon.replace('dev','web')" mode="widthFix" class="msg"></image>
                <text class="img-text">{{item2.cat_name}}</text>
              </view>
            </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh:0,//当前设备可用高度
        cateList:[],//分类数据
        cateLevel2:[],//二级分类数据
        active:0, //选中项
        scrollTop:0,//滚动条滚动距离
      };
    },
    onLoad() {
      //获取当前屏幕可以高度
      const syncInfo = uni.getSystemInfoSync()
      this.wh = syncInfo.windowHeight - 50
      //获取分类的数据
      this.getCateList()
    },
    methods:{
      //获取左侧分类数据
      async getCateList() {
        const {data} = await uni.$http.get('/categories')
        if(data.meta.status == 200) {
          this.cateList = data.message
          this.cateLevel2 = data.message[0].children
        }else {
          return uni.$showMsg()
        }
      },
      //切换分类的回调
      changeItem(item,i) {
        console.log(item,i);
        this.active = i
        //重新为二级分类赋值
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop = this.scrollTop === 0 ? 1:0
      },
      //跳转商品页面
      gotoGoodsList(item) {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
        })
      },
        //点击搜索组件的回调
      goSearch() {
          uni.navigateTo({
            url:'/subpkg/search/search'
          })
      }
    }
  }
</script>i

<style lang="scss">
.scrollContainer {
  display: flex;
  background-color: #fff;
  .leftScroll {
    width: 120px;
    //左侧滚动区域
    .leftScrollItem {
      background-color: #F7F7F7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &.active {
        background-color: #fff;
        position: relative;
        &::before {
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #C00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
}
//右侧滚动区域
.cateLeve2 {
  
  .cateLeve2-title {
      height: 60rpx;
      line-height: 60rpx; 
      text-align: center;
      font-size: 40rpx;
      font-weight: 900;
  }
    
  .cateLevel3-shop {
    display: flex;
    flex-wrap: wrap;
    .cateLevel3-shop-item {
      width: 33.3%;
      display: flex;
      flex-direction: column;
      align-items:center;
      margin-bottom: 10rpx;
      .msg {
        width: 60px;
      }
      .img-text {
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>
