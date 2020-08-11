export function getManualAuditInfo(id, callback) {
  return $get(`/user/${id}/auditDetails`, {
    successConfig: {
      callback,
    },
  });
}

export function getPersonalInfo(id, callback) {
  return $get(`/user/${id}`, {
    successConfig: {
      callback,
    },
  });
}
