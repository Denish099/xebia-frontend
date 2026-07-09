const ROLE_ROUTES: Record<string, string> = {
  'super_admin': '/dashboard',
  'university_admin': '/dashboard',
  'faculty': '/dashboard',
  'student': '/dashboard',
};

export function getRedirectPath(roles: string[]): string {
  if (!roles || roles.length === 0) {
    return '/login';
  }

  for (const role of roles) {
    const normalizedRole = role.toLowerCase();
    if (ROLE_ROUTES[normalizedRole]) {
      return ROLE_ROUTES[normalizedRole];
    }
  }

  return '/dashboard';
}
