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
