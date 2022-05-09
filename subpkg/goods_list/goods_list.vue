<template>
	<view>
		<view class="goods-list">
			<!-- block不能绑定点击函数，所以必须改成view -->
			<view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<my-goods :goods='goods'></my-goods>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键词
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				// 节流阀
				isloading:false


			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		methods: {
			// 获取商品列表数据
			async getGoodsList(cb) {
				// 打开节流阀
				this.isloading = true
				let {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isloading = false
				// 短路运算,如果有则运行,没有则忽略
				cb && cb()
				if (res.meta.status !== 200) return uni.$showMsg()
				// 为数据赋值
				this.goodsList =  [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			},
			onReachBottom(){
				// 数据全部获取完毕后继续上拉要提示数据加载完毕
				if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)	return uni.$showMsg('数据加载完毕！')
				// 判断节流阀状态
				if(this.isloading) return 
				// 让页码值自增 +1
				this.queryObj.pagenum += 1
				// 重新获取列表数据
				this.getGoodsList()
			},
			onPullDownRefresh(){
				// 1. 重置关键数据
				this.queryObj.pagenum = 1
				this.total = 0
				this.isloading = false
				this.goodsList = []
				// 2. 重新发起请求
				// 传递进去的函数是关闭下拉刷新效果的函数
				this.getGoodsList(() => uni.stopPullDownRefresh())
			},
			gotoDetail(item){
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
