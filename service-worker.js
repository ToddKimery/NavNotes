importScripts('/path/to/idb-promised.js');

self.addEventListener('fetch', function(event) {
  if (event.request.url.includes('/api/notes')) {
    event.respondWith(
      getNotesFromDB().then(notes => {
        return notes.length > 0 ?
          new Response(JSON.stringify(notes), { headers: { 'Content-Type': 'application/json' } }) :
          fetch(event.request).then(networkResponse => {
            networkResponse.clone().json().then(notes => {
              notes.forEach(note => saveNoteToDB(note));
            });
            return networkResponse;
          });
      })
    );
  }
});
