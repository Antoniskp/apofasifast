import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8080',
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'voting',
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'frontend',
};

let keycloakInstance: Keycloak | null = null;

export const getKeycloak = (): Keycloak => {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak(keycloakConfig);
  }
  return keycloakInstance;
};

export const initKeycloak = async (): Promise<boolean> => {
  const keycloak = getKeycloak();
  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      checkLoginIframe: false,
    });
    return authenticated;
  } catch (error) {
    console.error('Keycloak initialization failed', error);
    return false;
  }
};

export const login = () => {
  const keycloak = getKeycloak();
  keycloak.login();
};

export const logout = () => {
  const keycloak = getKeycloak();
  keycloak.logout();
};

export const getToken = (): string | undefined => {
  const keycloak = getKeycloak();
  return keycloak.token;
};

export const isAuthenticated = (): boolean => {
  const keycloak = getKeycloak();
  return !!keycloak.authenticated;
};
