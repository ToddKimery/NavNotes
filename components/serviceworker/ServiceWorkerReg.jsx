// components/ServiceWorker/ServiceWorkerRegistration.jsx
'use client'

// export default function ServiceWorkerReg () {
  
//     if ('serviceWorker' in navigator) {
//       console.log('Service Worker Registration',navigator.serviceWorker)
//       // Use the window load event to keep the page load performant
   
//        navigator.serviceWorker.register('/serviceWorker.js').then(registration => {console.log('Service Worker registered: ', registration);
//        }).catch(registrationError => {console.log('Service Worker registration failed: ', registrationError);
//        })
// }
//     }
'use client'

export default function ServiceWorkerReg() {
  
    if ('serviceWorker' in navigator) {
      console.log('Service Worker Available in Navigator', navigator.serviceWorker);
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' })
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
}
