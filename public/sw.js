self.addEventListener("install", () => {
  console.log("Serwice worker installed");
});

self.addEventListener("fetch", (event) => {
  const requestTarget = event.request.url;
  if (
    event.request.destination === "" &&
    (requestTarget.includes("_data=routes") || requestTarget.includes("_data=root"))
  ) {
    // Open the cache
    event.respondWith(
      caches
        .open(`${requestTarget.includes("_data=routes") === true ? "snippets-cached" : "folders-cached"}`)
        .then(async (cache) => {
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
  } else if (event.request.destination != "") {
    event.respondWith(
      caches.open(`${event.request.destination}-cached`).then(async (cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request)
            .then((networkResponse) => {
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
  } else {
    event.respondWith(
      caches.open(`others-cached`).then(async (cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request)
            .then((networkResponse) => {
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
