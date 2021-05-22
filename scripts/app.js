if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../service-worker.js')
            .then(reg => console.log('Service Worker: Registered!'))
            .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
}