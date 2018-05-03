import fb from "fb";

export function getUser(id) {
    fb.setAccessToken(process.env.FB_PAGE_ACCESS_TOKEN);
    return fb.api(id, {fields: ['name']})
        .then(info => info)
        .catch(error => console.log(error.message));
}
