<template>
	<!-- 自定义搜索框的颜色 -->
	<view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
		<!-- 这是自定义搜索组件 -->
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<!-- 使用uni-ui樣式 -->
			<uni-icons type="search" size="17" ></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		// 自定义属性之后可以在使用属性的时候传递不同的背景色
		props: {
		// 背景颜色
		bgcolor: {
		type: String,
		default: '#C00000'
		},
		// 圆角尺寸
		radius: {
		type: Number,
		// 单位是 px
		default: 18
		}
		},
		data() {
			return {

			};
		},
		methods:{
			searchBoxHandler(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		// background-color: #c00000;
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		height: 36px;
		background-color: #ffffff;
		// border-radius: 15px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>
