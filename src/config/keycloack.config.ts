import KeycloakConnect from 'keycloak-connect';

export const keycloakConfig: KeycloakConnect.KeycloakConfig = {
  realm: 'singularis',
  'auth-server-url': 'http://localhost:8080',
  'ssl-required': 'none', // Use 'none' for development, 'external' for production
  resource: 'singularis', // Client ID from Keycloak
  'confidential-port': 0, // Default confidential port
  'bearer-only': false,
};
