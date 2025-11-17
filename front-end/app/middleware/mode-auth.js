export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const token = localStorage.getItem('token')
        if (!token) {
            return navigateTo('/')
        }
    } try {
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        if (payload.role !== "Moderator" || payload.role !== "admin") {
            localStorage.removeItem('token')
            return navigateTo("/unauthor");
        }
    } catch (err) {
        console.log(err)
    }

})