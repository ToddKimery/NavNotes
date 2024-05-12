// import * as idb from 'idb'
import * as idb from '/packageIdb.js'

 const CACHE_NAME = 'v1';
 const URLS_TO_CACHE = [
     '/',
     '/notes',
     '/packageIdb.js',
     '/training',  
 ];

 self.addEventListener('install', event => {
     event.waitUntil(
         caches.open(CACHE_NAME)
             .then(cache => {
                 console.log('Opened cache');
                 return cache.addAll(URLS_TO_CACHE);
             })
     );
 });

// async function createStoreInDB () {
const NotesDB =async ()=>{await idb.openDB('myDB', 1, {
    upgrade (db) {
      console.log('...checking for object store')

      if(!db.objectStoreNames.contains('NotesStore')) {
        console.log('creating object store')
      db.createObjectStore('NotesStore', { keyPath: 'id' });
      if(!db.objectStoreNames.contains('TrainingStore')) {
        console.log('creating object store')
      db.createObjectStore('TrainingStore', { keyPath: 'id' });
    }
  }
  return NotesDB
}
}
)
}
// createStoreInDB()

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Using URL pathname to decide the handling strategy
  if (url.pathname.startsWith('/api/notes')) {
    console.log("Notes requested: ",url.pathname)
    event.respondWith(handleApiNotesRequest(event.request));
  } else if (url.pathname.startsWith('/api/training')) {
    event.respondWith(handleApiTrainingRequest(event.request));
  } else {
    event.respondWith(cacheFirstStrategy(event.request));
  }
});

async function handleApiNotesRequest(request) {
  
  const allNotes = await NotesDB.get('notes');
  if (allNotes.length > 0) {
    console.log("We have notes")
    return new Response(JSON.stringify(allNotes), { headers: { 'Content-Type': 'application/json' } });
  } else {
    const response = await fetch(request);
    const notes = await response.json();
    console.log("Got notes: ",notes)
    await NotesDb.add('notes', notes);
    // notes.forEach(note => {
    //   db.put('notes', note);
    // });
    return new Response(JSON.stringify(notes), { headers: { 'Content-Type': 'application/json' } });
  }
}

async function handleApiTrainingRequest(request) {
  
  const allTraining = await db.getAll('training');
  if (allTraining.length > 0) {
    return new Response(JSON.stringify(allTraining), { headers: { 'Content-Type': 'application/json' } });
  } else {
    const response = await fetch(request);
    const training = await response.json();
    training.forEach(item => {
      db.put('training', item);
    });
    return new Response(JSON.stringify(training), { headers: { 'Content-Type': 'application/json' } });
  }
}

async function cacheFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  } else {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  }
}










// // // self.importScripts('/idb.js');

// // const CACHE_NAME = 'v1';
// // const URLS_TO_CACHE = [
// //     '/',
// //     '/notes',
// //     '/training',  
// // ];

// // self.addEventListener('install', event => {
// //     event.waitUntil(
// //         caches.open(CACHE_NAME)
// //             .then(cache => {
// //                 console.log('Opened cache');
// //                 return cache.addAll(URLS_TO_CACHE);
// //             })
// //     );
// // });

// // self.addEventListener('fetch', event => {
// //     const url = event.request.url;
// //     console.log(url)

// //     // Handle API requests separately
// //     if (url.includes('/api/')) {
// //       console.log("I saw a request to /api/")
// //         let storeName = '';
// //         if (url.includes('/api/notes')) {
// //           console.log("I saw a request to /api/notes")
// //             storeName = 'note';
// //         } else if (url.includes('/api/training')) {
// //             storeName = 'training';
// //             console.log("Handling request to /api/training");
// //         }

// //         if (storeName) {
// //             event.respondWith(
// //                 getItemsFromDB(storeName).then(items => {
// //                     return items.length > 0 ?
// //                         new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } }) :
// //                         fetch(event.request).then(networkResponse => {
// //                             networkResponse.clone().json().then(items => {
// //                                 items.forEach(item => saveItemToDB(storeName, item));
// //                             });
// //                             return networkResponse;
// //                         });
// //                 })
// //             );
// //             return;
// //         }
// //     }

// //     // Default cache-first strategy for other requests
// //     event.respondWith(
// //         caches.match(event.request)
// //             .then(response => {
// //                 if (response) {
// //                     return response;
// //                 }
// //                 return fetch(event.request).then(response => {
// //                     if (!response || response.status !== 200 || response.type !== 'basic') {
// //                         return response;
// //                     }
// //                     var responseToCache = response.clone();
// //                     caches.open(CACHE_NAME).then(cache => {
// //                         cache.put(event.request, responseToCache);
// //                     });
// //                     return response;
// //                 });
// //             })
// //     );
// // });


// // importScripts('/idb-promised.js');




// const CACHE_NAME = 'v2';
// const URLS_TO_CACHE = [
//     '/',
//     '/notes',
//     '/training'
// ];

// self.addEventListener('install', event => {
//     // Perform install steps
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(cache => {
//                 console.log('Opened cache');
//                 return cache.addAll(URLS_TO_CACHE);
//             })
//     );
// });

// self.addEventListener('fetch', event => {
//   console.log("I see the fetch event: ", event.request)
//     event.respondWith(
//         caches.match(event.request)
//             .then(response => {
//                 // Cache hit - return response
//              if (event.request.url.includes('/api/notes')) {
//     storeName = "note"
//     event.respondWith(
//       getItemsFromDB(storeName).then(notes => {
//         return notes.length > 0 ?
//           new Response(JSON.stringify(notes), { headers: { 'Content-Type': 'application/json' } }) :
//           fetch(event.request).then(networkResponse => {
//             networkResponse.clone().json().then(notes => {
//               notes.forEach(note => saveItemToDB(note));
//             });
//             return networkResponse;
//           });
//       })
//     );
//   }
//   else if(event.request.url.includes('/api/training')) {
//     storeName = "training"
//     console.log("I saw a request to /api/training")
//     event.respondWith(
//       getItemsFromDB(storeName).then(trainings => {
//         return trainings.length > 0 ?
//           new Response(JSON.stringify(trainings), { headers: { 'Content-Type': 'application/json' } }) :
//           fetch(event.request).then(networkResponse => {
//             networkResponse.clone().json().then(training => {
//               training.forEach(course => saveItemToDB(storeName,course));
//             });
//             return networkResponse;
//           });
//       })
//     );
//   }else{
//                 return fetch(event.request).then(
//                     response => {
//                         // Check if we received a valid response
//                         if (!response || response.status !== 200 || response.type !== 'basic') {
//                             return response;
//                         }

//                         // IMPORTANT: Clone the response. A response is a stream
//                         // and because we want the browser to consume the response
//                         // as well as the cache consuming the response, we need
//                         // to clone it so we have two streams.
//                         var responseToCache = response.clone();

//                         caches.open(CACHE_NAME)
//                             .then(cache => {
//                                 cache.put(event.request, responseToCache);
//                             });

//                         return response;
//                     }
//                 )
//     );
// });



// // self.addEventListener('fetch', function(event) {
// //   let storeName=''
// //   if (event.request.url.includes('/api/notes')) {
// //     storeName = "note"
// //     event.respondWith(
// //       getItemsFromDB(storeName).then(notes => {
// //         return notes.length > 0 ?
// //           new Response(JSON.stringify(notes), { headers: { 'Content-Type': 'application/json' } }) :
// //           fetch(event.request).then(networkResponse => {
// //             networkResponse.clone().json().then(notes => {
// //               notes.forEach(note => saveItemToDB(note));
// //             });
// //             return networkResponse;
// //           });
// //       })
// //     );
// //   }
// //   else if(event.request.url.includes('/api/training')) {
// //     storeName = "training"
// //     console.log("I saw a request to /api/training")
// //     event.respondWith(
// //       getItemsFromDB(storeName).then(trainings => {
// //         return trainings.length > 0 ?
// //           new Response(JSON.stringify(trainings), { headers: { 'Content-Type': 'application/json' } }) :
// //           fetch(event.request).then(networkResponse => {
// //             networkResponse.clone().json().then(training => {
// //               training.forEach(course => saveItemToDB(storeName,course));
// //             });
// //             return networkResponse;
// //           });
// //       })
// //     );
// //   }
// // });
