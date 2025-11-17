export default defineNuxtRouteMiddleware((to, from) => {
  // ตรวจสอบว่าโค้ดนี้รันบน client
  if (process.client) {
    const token = localStorage.getItem("token");
  
    if (!token) {
      return navigateTo("/unauthor");
    }

    try {
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));

      if (payload.role !== "admin") {
      localStorage.removeItem('token')
        return navigateTo("/unauthor");
      }
    } catch (err) {
      return navigateTo("/unauthor");
    }
  }
});
