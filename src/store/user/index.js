export function getManualAuditInfo(data, callback) {
  return $post('/rp/manualAudit', {
    body: data,
    successConfig: {
      callback,
    },
  });
}

// export default {
//   getManualAuditInfo
// };