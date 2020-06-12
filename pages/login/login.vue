<template>
	<view>
		<button @click="test()">測試實人認證</button>
		<view class="content flex flex-column">
		  <image class="logo" src="/static/logo.png"></image>
		  <view class=".uni-center">
			  <text class="font-md text-info font-weight-bolder font-italic">SMART HOME</text>
		  </view>
	  </view>
		<view  class="px-3">
			<input type="text" class="font border-bottom" placeholder="用户名" style="height: 100rpx;" v-model="username"/>
			<input type="password" class="font border-bottom" placeholder="密码" style="height: 100rpx;" v-model="password"/>
			<view class="pt-5">
				<view class="main-bg-color rounded p-1 text-center"
				hover-class="main-bg-hover-color">
					<text class="text-white font-md" @tap="bindLogin">登 录</text>
				</view>
			</view>
		</view>
		<view class="flex justify-center align-center  pt-5">
			<navigator class="text-light-muted font p-2" url="../reg/reg">注册账号</navigator>
			<text class="text-light-muted font">|</text>
			<navigator class="text-light-muted font p-2" url="../pwd/pwd">忘记密码</navigator>
		</view>
	</view>
</template>

<script>
	import _Request from '@/common/lib/request.js'
	import _Util from '@/common/lib/util.js'
	import md5 from 'js-md5'
	const RealPersonAuth = uni.requireNativePlugin('RealPersonAuth');
	const dcGaoDeNav = uni.requireNativePlugin('HG-GaoDeNav');
	export default {
		data() {
			return {
				username: '',
				password: '',
			}
		},
		methods: {
			test() {
				console.log(999, RealPersonAuth, dcGaoDeNav)
			},
			bindLogin() {
				if (this.username.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				const data = {
					username: this.username,
					password: md5(this.password)
				}
				console.log(data)
				uni.request({
				    url: 'http:10.10.11.244:9700/auth/login',
						method:'POST',
				    data: data,
				    header: {
				      'Content-Type': 'application/json;charset=UTF-8'
				    },
				    success: (res) => {
							console.log(data)
				      console.log(res.data);
							this.$store.dispatch('login', res.data)
							
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							})
							
							return uni.switchTab({
								url:"/pages/tabbar/index/index"
							})
				    }
				});
				// _Request.post('/auth/login', data, {})
				// .then(res => {
				// 	this.$store.dispatch('login', res)
				// 	uni.showToast({
				// 		title: '登录成功',
				// 		icon: 'none'
				// 	});
				// 	return uni.switchTab({
				// 		url:"/pages/tabbar/index/index"
				// 	})
				// })
			}
		},
		onReady() {
			
		}
	}
</script>

<style>
.content {
	align-items: center;
	margin-top: 120rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}
.logo {
	width: 121rpx;
	height: 121rpx;
}
.title {
	font-size: 18px;
	color: #707070;
}
</style>
