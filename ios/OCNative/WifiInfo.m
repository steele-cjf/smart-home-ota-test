//
//  WifiInfo.m
//  SmartHome
//
//  Created by lyq on 2020/7/30.
//

#import "WifiInfo.h"
#import <SystemConfiguration/CaptiveNetwork.h>

@implementation WifiInfo

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getWifi:(RCTResponseSenderBlock)callback)
{
//  <Text>{'TestWifi' || '未能获取wifi'}</Text>
//  <Text>{'' || '未能获取wifi'}</Text>
//  <Text>{'' || ''}</Text>
//  <Text>{0 || '未能获取wifi'}</Text>
  
  //NSString *str = "TestWifi" || "未能获取wifi"; //报错
  //NSLog(@"%@", "TestWifi" || "未能获取wifi");    //运行报错
  
  bool b1 = "TestWifi" || "未能获取wifi";
  bool b2 = "" || "未能获取wifi";
  bool b3 = "" || "";
  bool b4 = 0 || "未能获取wifi";
 
  NSLog(@"******** b1 = %d", b1);
  NSLog(@"******** b2 = %d", b2);
  NSLog(@"******** b3 = %d", b3);
  NSLog(@"******** b4 = %d", b4);
  
  
  NSArray *interfaceNames = CFBridgingRelease(CNCopySupportedInterfaces());
  
  NSLog(@"Supported interfaces: %@", interfaceNames);
  
  NSDictionary *info = nil;
  for (NSString *interfaceName in interfaceNames) {
    info = CFBridgingRelease(CNCopyCurrentNetworkInfo((__bridge CFStringRef)interfaceName));
    
    NSLog(@"%@ => %@", interfaceName, info);
    
    if (info && info.count > 0) {
      break;
    }
  }
  
  NSString *ssid = [info objectForKey:@"SSID"];
  if (!ssid) {
    ssid = @"未连接WiFi";
  }
  
  callback(@[ssid]);
}

@end
