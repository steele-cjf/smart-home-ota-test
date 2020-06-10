<template>
	<view class="content">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/launch1.png" mode="aspectFit"></image></view>
					<view>高效</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/launch2.png" mode="aspectFit"></image></view>
					<view>安全</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/launch1.png" mode="aspectFit"></image></view>
					<view>高效</view>
				</view>
				<view class="experience" @tap="launchFlag()">立即体验</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			launchFlag: function() {
				/**
				 * 向本地存储launchFlag的值，即启动标识
				 */
				uni.setStorage({
					key: 'launchFlag',
					data: true
				})
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				});
			}
		}
	}
</script>

<style scoped>
	page, uni-swiper { height: 100%;}
	.content{
		width: 100%;
		height: 100vh;
		background-size: 100% auto ;
		padding: 0;
	}
	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		display: flex;
		flex-direction:column;
		margin-top: 20%;
	}

	.experience{
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: #454343;
		border: 1px solid #454343;
		z-index: 999;
	}
	.experience{
		right: 50%;
		margin-right: -105upx;
		bottom: 10%;
	}
</style>
