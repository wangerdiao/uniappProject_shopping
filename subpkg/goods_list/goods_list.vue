<template>
  <view class="goodsList">
   <view v-for="item in goodsList" :key="item.goods_id" @click="gotoDetail(item)">
     <my-goods :item="item"></my-goods>
   </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj:{ //请求携带的参数
          query:'',
          cid:'',
          pagenum:1,
          pagesize:20
        },
        goodsList:[], // 商品列表数据
        total:0,//数据总数量，用来实现分页
        deafult:'https://www.somode.com/uploadimg/image/20230129/20230129150835_59024.jpg',
        isLoading:false, //节流阀
      };  
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods:{
      //获取商品列表数据
      async getGoodsList(cb) {
        this.isLoading = true
        const {data} = await uni.$http.get('/goods/search',this.queryObj)
        //关闭下拉刷新的回调
        cb && cb()
        if(data.meta.status == 200) {
          this.goodsList =[...this.goodsList,...data.message.goods]
          this.total = data.message.total
          this.isLoading = false
        }else {
          this.isLoading = false
          return uni.$showMsg()
        }
      },
      //跳转到商品详情
      gotoDetail(item) {
        console.log(item);
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id
        })
      }
    },
    //下拉触底
    onReachBottom() {
      if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total)
      return uni.$showMsg('数据加载完毕')
      if(!this.isLoading) {
        this.queryObj.pagenum += 1
        this.getGoodsList()
      }
    },
    // 上拉刷新
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.goodsList = []
      this.isLoading = false
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
    
  }
</script>

<style lang="scss">
.goodsList {
  margin-top: 5px;
  background-color: #fff;
}
</style>
