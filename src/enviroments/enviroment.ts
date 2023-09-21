import { clientId, domain } from '../app/config/auth-config.json';

export const enviroment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirect_uri: window.location.origin,
  },
};
