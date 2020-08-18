export function getManualAuditInfo(id, callback) {
  return $get(`/user/${id}/auditDetails`, {
    successConfig: {
      callback,
    },
  });
}

export function modifyPersonalInfo(id, data, callback) {
  return $put(`/user/${id}`, {
    body: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    successConfig: {
      callback,
    },
  });
}
