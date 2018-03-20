import fb from "fb";

export function getUser(id) {
    fb.setAccessToken(accessToken);
    return fb.api(id, {fields: ['name']})
        .then(info => info);
}
