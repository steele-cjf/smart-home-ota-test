import { act } from "react-test-renderer"

export function getUserToken(callback) {
    return $get('/rp/verifyToken', {
      actionType: 'USER_TOKEN',
      successConfig: {
          callback
      }
    })
  }
  
  // user info
  export function userToken(state = null, action){
      console.log(22222, action)
    if (action.type === 'USER_TOKEN') {
      return action.data || null
    }
    return state
  }
  
  
  export default {
    userToken
  }