<template>
  <view>
    <view class="searchBox">
      <uni-search-bar @confirm="search" @input="input" placeholder="搜索" :radius="100" cancelButton="none" ></uni-search-bar>
    </view>
    <!-- 搜索关键词列表 -->
    <view class="resultList" v-if="searchKWList.length !== 0">
      <view class="resultList-item" v-for="item in searchKWList" :key="item.goods_id" @click="gotoDetail(item)">
        <view class="goodsName" >{{item.goods_name}}</view>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
    </view>
    <!-- 历史记录 -->
    <view class="history" v-else>
      <view class="head">
        <text>历史记录</text>
        <uni-icons type="trash" size="16" @click="deleteHistory"></uni-icons>
      </view>
      <view class="historyContent">
        <uni-tag :text="item" v-for="(item,i) in history" :key="i" class="tagItem" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
  
</template>

<script>
  export default {
    data() {
      return {
        timer:null , //延时器
        keyWord:'', //搜索关键词
        searchKWList:[],//搜索关键词获取的数据
        historyList:[],//搜索历史数据
      };
    },
    methods:{
      //输入事件的处理函数
      input(e) {
        //清除延时器,防抖处理
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
        this.keyWord = e
         this.getSearchList(this.keyWord)
        },500)
      },
      //获取关键词搜索数据的函数
      async getSearchList(kw) {
        //判断关键词是否为空
        if(kw === '') {
          this.searchKWList = []
          return 
        }
        //在有关键词的情况下搜索
        const {data} = await uni.$http.get('/goods/qsearch',{query:kw})
        if(data.meta.status == 200) {
          this.searchKWList = data.message
          this.saveHistory()
        }else {
          return uni.$showMsg()
        }
      },
      //跳转到商品详情
      gotoDetail(item) {
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      //保存历史记录
      saveHistory() {
        // if(this.historyList.indexOf(this.keyWord)===-1) {
        //   this.historyList.push(this.keyWord)
        // }
        
        //使用new Set方法进行数组去重
        const set = new Set(this.historyList)
        set.delete(this.keyWord)
        set.add(this.keyWord)
        this.historyList = Array.from(set)
        uni.setStorageSync('history',JSON.stringify(this.historyList))
      },
      //清楚历史记录
      deleteHistory() {
        this.historyList = []
        uni.setStorageSync('history','[]')
      },
      //跳转历史记录的商品
      gotoGoodsList(item) {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + item
        })
      }
    },
    computed:{
      history() {
        //反转搜索历史记录，是后搜索的放在第一个
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('history') || '[]')
    }
  }
</script>

<style lang="scss">
.searchBox {
  position: sticky;
  top: 0;
  z-index: 999;
}
//搜索关键词列表
.resultList {
  background-color: #ffffff;
  padding: 0 5px;
  .resultList-item {
    display: flex;
    justify-content: space-between;
    align-items: center;  
    border-bottom: 1px solid #efefef;
    height: 40px;
    .goodsName {
      //文字不允许换行
      white-space: nowrap;
      //溢出部分隐藏
      overflow: hidden;
      //文本溢出后用...代替
      text-overflow: ellipsis;
      margin-right: 3px;
      font-size: 12px;
    }
  }
}
//历史记录
.history {
  padding: 5px;
  .head {
    display: flex;
    justify-content: space-between;
    padding: 2px 5px;
    align-items: center;
    border-bottom: 1px solid #efefef;
    font-size: 12px;
  }
  .historyContent {
    margin-top: 5px;
    .tagItem {
      margin: 5px 5px;
    }
  }
}
</style>
