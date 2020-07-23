export function publishHouse(id, data, callback) {
  return $put('/house/{id}/publish', {
    body: data,
    successConfig: {
      callback,
    },
  });
}
