export function getManualAuditInfo(id, callback) {
  return $get(`/user/${id}/auditDetails`, {
    successConfig: {
      callback,
    },
  });
}
