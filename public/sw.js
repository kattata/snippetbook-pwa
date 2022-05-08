self.addEventListener("install", () => {
  console.log("I work bitches");
});

self.addEventListener("fetch", (event) => {
  console.log(event.request.url);
  event.respondWith(
    caches
      .open(`${event.request.destination == "" ? "snippets" : event.request.destination}-cached`)
      .then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then((networkResponse) => {
            console.log(networkResponse);
            if (networkResponse.statusText == "OK") {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            }
          });

          return cachedResponse || fetchedResponse;
        });
      })
  );
});
