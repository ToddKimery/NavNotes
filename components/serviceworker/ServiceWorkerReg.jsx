// components/ServiceWorker/ServiceWorkerRegistration.jsx
'use client'
import { useEffect } from 'react';

const ServiceWorkerReg = () => {
  useEffect(() => {
    // Check if Service Workers are supported
    if ('serviceWorker' in navigator) {
      console.log('Service Worker Registration',navigator.serviceWorker)
      // Use the window load event to keep the page load performant
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
          console.log('Service Worker registered: ', registration);
        }).catch(registrationError => {
          console.log('Service Worker registration failed: ', registrationError);
        });
      });
    }
  }, []);

  return null;  // This component doesn't render anything
};

export default ServiceWorkerReg;
