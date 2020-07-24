// 房源审核
export function addHouse(data, callback) {
    return $post('/house', {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
      successConfig: {
        callback,
      },
    });
  }
  
  export default {
  };
  