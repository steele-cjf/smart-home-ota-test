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

export function addFamilyForm(data, callback) {
    return $post("/tenant/family/form", {
        body: data,
        successConfig: {
            callback
        },
        failConfig: {
            callback
        }
    });
}