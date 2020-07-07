package com.testsmart.aliyunverify;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.security.biometrics.theme.ALBiometricsConfig;
import com.alibaba.security.biometrics.transition.TransitionMode;
import com.alibaba.security.cloud.CloudRealIdentityTrigger;
import com.alibaba.security.realidentity.ALRealIdentityCallback;
import com.alibaba.security.realidentity.ALRealIdentityCallbackExt;
import com.alibaba.security.realidentity.ALRealIdentityResult;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.FileNotFoundException;

public class AliyunVerify extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static ReactApplicationContext reactContext;

    public AliyunVerify(ReactApplicationContext context) {
        super(context);
        reactContext = context;
       CloudRealIdentityTrigger.initialize(reactContext, true, buildALBiometricsConfig());//第二个参数是本地日志能
    }

    @ReactMethod
    public void show(String s, final Callback jsCallback) {
        
        CloudRealIdentityTrigger.start(reactContext, s, getALRealIdentityCallback(jsCallback));
    }


    /**
     * 通过ALBiometricsConfig 自定义您的UI
     *
     * @return
     */
    private ALBiometricsConfig buildALBiometricsConfig() {
        //TODO 详细参数参考UICustom
        ALBiometricsConfig.Builder alBiometricsConfig = new ALBiometricsConfig.Builder();
        alBiometricsConfig.setNeedSound(false);//默认是否开启声音
        alBiometricsConfig.transitionMode = TransitionMode.BOTTOM;//从下弹出
        return alBiometricsConfig.build();
    }

    /**
     * 基础回调的方式 TODO
     *
     * @return
     */
    private ALRealIdentityCallback getALRealIdentityCallback(final Callback jsCallback) {

        return new ALRealIdentityCallback() {
            @Override
            public void onAuditResult(ALRealIdentityResult alRealIdentityResult, String s) {
                //DO your things
                Log.i("aa", "add");

                if (alRealIdentityResult == ALRealIdentityResult.AUDIT_PASS) {
                    // 认证通过。建议接入方调用实人认证服务端接口DescribeVerifyResult来获取最终的认证状态，并以此为准进行业务上的判断和处理。
                    // do something
                    JSONObject result = new JSONObject();
                    result.put("result", "success");
                    jsCallback.invoke(result);
                    System.out.println("认证通过");
                } else if (alRealIdentityResult == ALRealIdentityResult.AUDIT_FAIL) {
                    // 认证不通过。建议接入方调用实人认证服务端接口DescribeVerifyResult来获取最终的认证状态，并以此为准进行业务上的判断和处理。
                    // do something
                    JSONObject result = new JSONObject();
                    result.put("result", "fail");
                    jsCallback.invoke(result);
                } else if (alRealIdentityResult == ALRealIdentityResult.AUDIT_NOT) {
                    // 未认证，具体原因可通过code来区分（code取值参见下方表格），通常是用户主动退出或者姓名身份证号实名校验不匹配等原因，导致未完成认证流程。
                    // do something
                }
            }
        };
    }

    /**
     * 增加活体页面开始与结束回调 TODO
     *
     * @return
     */
    private ALRealIdentityCallbackExt getALRealIdentityCallbackEX() {
        return new ALRealIdentityCallbackExt() {
            @Override
            public void onBiometricsStart() {
                //活体页面开始
            }

            @Override
            public void onBiometricsStop(boolean isBiometricsSuc) {//
                //活体页面结束 参数表示是否检测成功
            }

            @Override
            public void onAuditResult(ALRealIdentityResult alRealIdentityResult, String s) {
                //DO your things
            }
        };
    }


    @Override
    public String getName() {
        return "AliyunVerify";
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {
        // Activity `onDestroy`
        reactContext.removeLifecycleEventListener(this);
    }
}
