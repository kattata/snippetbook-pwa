self.addEventListener("install", () => {
  console.log("I work bitches");
});

self.addEventListener("fetch", (event) => {
  console.log(event.request);
  event.respondWith(
    // we will use the locales cache
    caches.open("all").then(async (cache) => {
      // we will run the fetch
      let fetchResponsePromise = fetch(event.request);
      try {
        // try to read from cache
        let cacheResponse = await cache.match(event.request);
        if (cacheResponse) return cacheResponse;
      } finally {
        // and finally if it was not cached or after we sent the response
        let fetchResponse = await fetchResponsePromise;
        // we will update the cache
        cache.put(event.request, fetchResponse.clone());
        // and return the response
        return fetchResponse;
      }
    })
  );
});

// self.addEventListener("fetch", (event) => {
//   let url = new URL(event.request.url);
//   let method = event.request.method;

//   // any non GET request is ignored
//   if (method.toLowerCase() !== "get") return;

//   // If the request is for the favicons, fonts, or the built files (which are hashed in the name)
//   if (
//     url.pathname.startsWith("/favicons/") ||
//     url.pathname.startsWith("/fonts/") ||
//     url.pathname.startsWith("/build/")
//   ) {
//     event.respondWith(
//       // we will open the assets cache
//       caches.open("assets").then(async (cache) => {
//         // if the request is cached we will use the cache
//         let cacheResponse = await cache.match(event.request);
//         if (cacheResponse) return cacheResponse;

//         // if it's not cached we will run the fetch, cache it and return it
//         // this way the next time this asset it's needed it will load from the cache
//         let fetchResponse = await fetch(event.request);
//         cache.put(event.request, fetchResponse.clone());

//         return fetchResponse;
//       })
//     );
//   }

//   return;
// });