import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
if (typeof window.global === "undefined") window.global = window;

const auth0Domain = import.meta.env.VITE_AUTH_DOMAIN;
const auth0ClientId = import.meta.env.VITE_CLIENT_ID;
const auth0OrganisationId = import.meta.env.VITE_ORGANISATION_ID;

ReactDOM.createRoot(document.getElementById('root')).render(

  
  <React.StrictMode>
    <Auth0Provider domain = {auth0Domain}
      clientId= {auth0ClientId}
      organizationId={auth0OrganisationId}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
