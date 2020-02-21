if ('serviceWorker' in navigator) {
    window.addEventListener('load' , () => {
       navigator.serviceWorker.register('/swpwa.js')
                               .then(result => result)
                               .catch(error => error)
    })
}
