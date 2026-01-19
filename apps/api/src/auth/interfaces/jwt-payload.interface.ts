export interface JwtPayload {
  sub: string;
  preferred_username?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  realm_access?: {
    roles: string[];
  };
}
