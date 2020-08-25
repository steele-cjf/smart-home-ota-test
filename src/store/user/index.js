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

export function getUserInfoUrl(id, callback) {
  return $post2(`/qrcode/${id}/genUserInfoUrl`, {
    successConfig: {
      callback,
    },
  });
}

export function getUserInfoById(id, callback) {
  console.log('%%%%%%%%%%%%%id:', id);

  return $get(`/user/${id}`, {
    successConfig: {
      callback,
    },
  });
}
