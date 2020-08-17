export function addTenantForm(data, callback) {
    return $post("/tenant/form", {
        body: data,
        successConfig: {
            callback
        },
        failConfig: {
            callback
        }
    });
}
