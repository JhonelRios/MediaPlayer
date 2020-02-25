import "@babel/polyfill"

const VERSION = "v1"

self.addEventListener("install", event => {
    event.waitUntil(precache())
})

self.addEventListener("fetch", event => {
    const request = event.request

    // Validamos que la petición sea GET, ya que no nos interesa trabajar con los datos de las demás 
    if (request.method !== "GET") {
        return
    }

    // Buscamos en cache
    event.respondWith(cachedResponse(request))

    // Actualizamos el cache
    event.waitUntil(updateCache(request))
})

async function precache() {
    const cache = await caches.open(VERSION)
    return cache.addAll([
        // "/",
        // "/index.html",
        // "/style.css",
        // "/src/index.js",
        // "/src/MediaPlayer.js",
        // "/src/plugins/AutoPlay.js",
        // "/src/plugins/AutoPause.js",
        // "/assets/video.mp4"
    ])
}

async function cachedResponse(request) {
    const cache = await caches.open(VERSION)
    const response = await cache.match(request)
    return response || fetch(request)
}

async function updateCache(request) {
    const cache = await caches.open(VERSION)
    const response = await fetch(request)
    return cache.put(request, response)
}