const cacheName = 'v2'

const cacheAssets = [
    'index.html',
    'darkmode.html',
    'calender.html',
    '/scripts/calenderScript.js',
    '/scripts/darkmodeScript.js',
    '/scripts/dbScript.js',
    'style.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'scripts/app.js',
    'scripts/calenderScript.js',
    'scripts/darkmodeScript.js',
    'scripts/script.js'
]

// Install Event
self.addEventListener('install', event => {
    console.log('Service Worker: Installed')

    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files')
                cache.addAll(cacheAssets)
            })
            .then(()=> self.skipWaiting())
    )
})

// Activate Event
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated')

    //remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache != cacheName){
                        console.log('Service worker clearing Old Cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

//fetch event 
self.addEventListener('fetch' , event => {
    console.log('Servçce Working: Fetching')
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    )
})