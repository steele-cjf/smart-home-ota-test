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

export function addUserFeedback(data, callback) {
  return $post('/feedback', {
    body: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    successConfig: {
      callback,
    },
  });
}

export function getUserInfoById(id, callback) {
  return $get(`/user/${id}`, {
    successConfig: {
      callback,
    },
  });
}

export function deleteTenant(data, callback) {
  return $remove('/tenant', {
    queryData: data,
    successConfig: {
      callback,
    },
  });
}

