self.addEventListener("install", () => {
  console.log("I work bitches");
});

self.addEventListener("fetch", (event) => {
  console.log(event.request.url);
  if (event.request.destination === "document") {
    event.respondWith(
      caches.open("cacheDocument").then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then(
            (networkResponse) => {
              cache.put(event.request, networkResponse.clone());

              return networkResponse;
            }
          );

          return cachedResponse || fetchedResponse;
        });
      })
    );
  }
  if (event.request.destination === "style") {
    event.respondWith(
      caches.open("cachedStyles").then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then(
            (networkResponse) => {
              cache.put(event.request, networkResponse.clone());

              return networkResponse;
            }
          );

          return cachedResponse || fetchedResponse;
        });
      })
    );
  }
  if (event.request.destination === "") {
    event.respondWith(
      caches.open("cachedSnippets").then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then(
            (networkResponse) => {
              console.log(networkResponse);
              if (networkResponse.statusText == "OK") {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              }
            }
          );

          return cachedResponse || fetchedResponse;
        });
      })
    );
  }
  if (event.request.destination === "image") {
    event.respondWith(
      caches.open("cachedImages").then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then(
            (networkResponse) => {
              cache.put(event.request, networkResponse.clone());

              return networkResponse;
            }
          );

          return cachedResponse || fetchedResponse;
        });
      })
    );
  }
  if (event.request.destination === "script") {
    event.respondWith(
      caches.open("cachedScripts").then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then(
            (networkResponse) => {
              cache.put(event.request, networkResponse.clone());

              return networkResponse;
            }
          );

          return cachedResponse || fetchedResponse;
        });
      })
    );
  }
  if (event.request.destination === "manifest") {
    event.respondWith(
      caches.open("cachedManifest").then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then(
            (networkResponse) => {
              cache.put(event.request, networkResponse.clone());

              return networkResponse;
            }
          );

          return cachedResponse || fetchedResponse;
        });
      })
    );
  } else {
    return;
  }
});
