<template>
	<!-- <view>
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
	</view> -->
	<view style="padding: 10px; padding-top: 50px">
		<input type="text" class="font border-bottom" placeholder="请输入有效token" style="height: 100rpx;" v-model="token"/>
		<button @click="test(1)">做活体+拍摄身份证</button>
		<button @click="test(2)">输入姓名和身份证号+做活体</button>
		<button @click="test(3)">做活体+拍摄身份证</button>
		<button @click="test(4)">做活体验证</button>
		<button @click="test(5)">做验证</button>
	</view>
</template>

<script>
	import _Request from '@/common/lib/request.js'
	import _Util from '@/common/lib/util.js'
	import md5 from 'js-md5'
	// const RichAlert = uni.requireNativePlugin('DCloud-RichAlert');
	const plug=uni.requireNativePlugin("Html5app-AliyunFaceVerify");
	export default {
		data() {
			return {
				username: '',
				password: '',
				token: ''
			}
		},
		methods: {
			test(type) {
				let code = this.token || "3"
				
				switch(type) {
					case 1:
						plug.RPBasic({"verifyToken":code},ret=>{
							this.toast(ret)
						});
						break;
					case 2:
						plug.RPManual({"verifyToken":code},ret=>{
							this.toast(ret)
						});
						break;
					case 3:
						plug.RPBioID({"verifyToken":code},ret=>{
							this.toast(ret)
						});
						break;
					case 4:
						plug.RPBioOnly({"verifyToken":code},ret=>{
							this.toast(ret)
						});
						break;
					case 5:
						plug.FDBioOnly({"verifyToken":code},ret=>{
							this.toast(ret)
						});
						break;
				}
			},
			toast(ret) {
				let text = ret.text
				uni.showToast({
					title: text,
					icon: 'none'
				})
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
