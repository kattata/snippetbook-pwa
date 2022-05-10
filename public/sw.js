self.addEventListener("install", () => {
  console.log("I work bitches");
});

self.addEventListener("fetch", (event) => {
  console.log(event.request.url);
  if (event.request.destination === "") {
    // Check if this is a navigation request

    // Open the cache
    event.respondWith(
      caches.open("snippets-cached").then(async (cache) => {
        // Go to the network first
        return fetch(event.request.url)
          .then((fetchedResponse) => {
            cache.put(event.request, fetchedResponse.clone());

            return fetchedResponse;
          })
          .catch(() => {
            // If the network is unavailable, get
            return cache.match(event.request.url);
          });
      })
    );
  } else {
    event.respondWith(
      caches.open(`${event.request.destination}-cached`).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request)
            .then((networkResponse) => {
              console.log(networkResponse);
              if (networkResponse.ok == true) {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              }
            })
            .catch((error) => {
              return cachedResponse;
            });

          return cachedResponse || fetchedResponse;
        });
      })
    );
  }
});
