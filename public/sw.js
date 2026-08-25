const CACHE_NAME = 'speech-swipe-v1'
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
]

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE)
    })
  )
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )
  self.clients.claim()
})

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.ok) {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
        }
        return response
      })
      .catch(() => {
        // Fallback to cache on network failure
        return caches.match(event.request).then((response) => {
          if (response) {
            return response
          }
          // Return offline page if available
          if (event.request.destination === 'document') {
            return new Response(
              '<html><body style="background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh"><div style="text-align:center"><h1>📴 Sin conexión</h1><p>La aplicación está disponible offline</p></div></body></html>',
              { headers: { 'Content-Type': 'text/html' } }
            )
          }
          return new Response('Recurso no disponible offline', {
            status: 503,
            statusText: 'Service Unavailable'
          })
        })
      })
  )
})
