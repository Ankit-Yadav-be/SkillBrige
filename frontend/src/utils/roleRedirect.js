export const getDashboardRoute = (role) => {
  switch (role) {
    case "student":
      return "/student/dashboard";
    case "trainer":
      return "/trainer/dashboard";
    case "institution":
      return "/institution/dashboard";
    case "manager":
      return "/manager/dashboard";
    case "monitor":
      return "/monitor/dashboard";
    default:
      return "/auth/login";
  }
};