// 打开相机
export function openCamera(options) {
    /**
     * options对象：{
     *  open (必填) false, true
     *  result 获取扫描后的结果，选填
     * }
     */
    return dispatch => {
        dispatch({
            type: 'CAMERA_DETAIL',
            data: options,
        });
    }
}

// 打开相机
export function getScanResult(url, callback) {
    return $get(url, {
        actionType: 'SCAN_RESULT',
        successConfig: {
            callback
        }
    })
}

// HOUSE_DETAIL
export function cameraOpt(state = null, action) {
    if (action.type === 'CAMERA_DETAIL') {
        return action.data || null;
    }
    return state;
}

export default {
    cameraOpt
};
