import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
