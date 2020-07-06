// RealPersonAuth.m
#import "RealPersonAuth.h"

#import <React/RCTBridge.h>
#import <React/RCTLog.h>
#import <RPSDK/RPSDK.h>
#import <React/UIView+React.h>

@implementation RealPersonAuth
@synthesize bridge = _bridge;
//- (instancetype)initRealPersonAuth
//{
//  [RPSDK setup];
//  return self;
//};
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(addEvent:(nonnull NSNumber *)reactTag token:(NSString *)token) {
  RCTUIManager *uiManager = self.bridge.uiManager;
  dispatch_async(uiManager.methodQueue, ^{
    [uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
      UIView *view = viewRegistry[reactTag];
      NSLog(@"start111111");
      UIViewController *viewController = (UIViewController *)view.reactViewController;
      NSLog(@"222222222");
      [RPSDK startWithVerifyToken:token
                   viewController:viewController
                       completion:^(RPResult * _Nonnull result) {
        NSLog(@"实人认证结果：%@", result);
      }];
    }];
  });
}
@end
//RCT_EXPORT_METHOD(addEvent:(NSString *)token (nonnull NSNumber *)reactTag)） {
//  NSLog(@"start 111111111111111111");
//  [RPSDK setup];
//  RCTUIManager *uiManager = self.bridge.uiManager;
//  dispatch_async(uiManager.methodQueue, ^{
//    NSLog(@"start  %@", token);
//    [uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
//      UIView *view = viewRegistry[reactTag];
//      UIViewController *viewController = (UIViewController *)view.reactViewController;
//      [viewController pushViewController:[ViewControllerXYZ new] animated:YES];
//
//
//    }
//  }
//  [RPSDK setup];
//  NSLog(@"start  %@", token);
//
//  UIViewController *rootView = [[ViewController alloc]
//  initWithNibName:@"project" bundle:nil];
//  NSLog(@"start 444");
//  [RPSDK startWithVerifyToken:token
//               viewController:rootView
//                   completion:^(RPResult * _Nonnull result) {
//      // 建议接入方调用实人认证服务端接口DescribeVerifyResult，
//      // 来获取最终的认证状态，并以此为准进行业务上的判断和处理。
//    NSLog(@"实人认证结果：%@", result);
//      switch (result.state) {
//          case RPStatePass:
//              // 认证通过。
//              break;
//          case RPStateFail:
//              // 认证不通过。
//              break;
//          case RPStateNotVerify:
//              // 未认证。
//              // 通常是用户主动退出或者姓名身份证号实名校验不匹配等原因导致。
//              // 具体原因可通过result.errorCode和result.message来区分（详见错误码说明）。
//              break;
//      }
//  }];
//}
