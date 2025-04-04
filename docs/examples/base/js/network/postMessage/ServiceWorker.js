// 页面端 page.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.controller.postMessage({
    type: 'UPDATE_CACHE',
    urls: ['/data.json'],
  })

  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('ServiceWorker 响应:', event.data)
  })
}

// ServiceWorker sw.js
self.addEventListener('message', (event) => {
  if (event.data.type === 'UPDATE_CACHE') {
    caches.open('v1').then((cache) => {
      cache.addAll(event.data.urls).then(() => {
        event.source.postMessage('CACHE_UPDATED')
      })
    })
  }
})
