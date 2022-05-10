<template>
	<view>
		<!-- 使用自定义组件 -->
		<!-- 不能在serach自定义事件上绑定事件，必须在内部 -->
		<my-search @click='gotoSearch'></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滑动区 -->
			<scroll-view class='left-scroll-view' scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<block v-for="(item,i) in cateList" :key='i'>
					<view :class="['left-scroll-view-item', i === active ? 'active':'']" @click="activeChanged(i)">
						{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区 -->
			<scroll-view class='right-scroll-view' scroll-y :style="{height: wh + 'px'}">
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key='i2'>
					<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				// 当前设备可用高度
				wh: 0,
				// 分类列表数据
				cateList: [],
				active: 0,
				// 二级分类列表
				cateLevel2: [],
				scrollTop: 0
			};
		},
		onLoad() {
			let sysInfo = uni.getSystemInfoSync()
			// 由于搜索框占据了剩余高度的50 所以需要减去
			this.wh = sysInfo.windowHeight -50
			this.getCateList()
		},
		methods: {
			async getCateList() {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
			},
			activeChanged(i) {
				this.active = i
				// 重新为二级分类赋值
				this.cateLevel2 = this.cateList[i].children
				// 将滚动条的值重置一下，如果一直是0则不会重置，所以需要在0和1之间切换
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			gotoGoodsList(item3){
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
	}

	.left-scroll-view {
		width: 120px;
	}

	.left-scroll-view-item {
		background-color: #F7F7F7;
		line-height: 60px;
		text-align: center;
		font-size: 12px;
		position: relative;

		&.active {
			background-color: #FFFFFF;

			&::before {
				content: ' ';
				display: block;
				height: 30px;
				width: 3px;
				background-color: red;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
		}
	}

	.cate-lv2-title {
		font-size: 12px;
		// 加粗
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	.cate-lv3-list {
		display: flex;
		// 放不下就自动换行
		flex-wrap: wrap;
		
		.cate-lv3-item {
			width: 33.33%;
			margin-bottom: 10px;
			display: flex;
			// 纵向布局
			flex-direction: column;
			// 纵向居中
			justify-content: center;
			// 横向居中
			align-items: center;
			
			image {
				width: 60px;
				height: 60px;
			}
			text {
				font-size: 12px;
			}
		}
	}
</style>
