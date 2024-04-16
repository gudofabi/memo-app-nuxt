export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated } = useAuthStore();
  // List of public routes that don't require authentication
  const publicPaths = [
    "/",
    "/register",
    "/login",
    "/forgot-password",
    "/verify",
    "/reset-password",
  ];

  // If the user is authenticated and trying to access the login or register page,
  // redirect them to the home page.
  if (isAuthenticated && (to.path === "login" || to.path === "register")) {
    return navigateTo("/");
  }

  // If the route is public or the user is authenticated, allow the navigation to proceed
  if (publicPaths.includes(to.path) || isAuthenticated) {
    return;
  }

  // If the user is not authenticated and trying to access a protected route,
  // redirect them to the login page.
  if (!isAuthenticated) {
    return navigateTo("/");
  }

  // Optionally, you might handle other cases or routes here.
});
