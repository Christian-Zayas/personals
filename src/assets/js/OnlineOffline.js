const conn =  navigator.onLine ? "ONLINE" : "OFFLINE";
let success = document.querySelector('.success');
let danger = document.querySelector('.danger');
// for know status from internet offline
window.addEventListener('offline', (e) => { 
    console.log('offline'); 
    danger.innerHTML = `
    <div class="alert alert-dismissible alert-danger fade show shadow-lg">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <p class="text-center text-dark text-uppercase">
       Status from internet offline
       <small class="font-weight-bolder" >Estado de Internet sin conexión</small>
    </p>
    </div>
    `;
    success.innerHTML = '';

});
// for know status from internet online
window.addEventListener('online', function(e) { 
    success.innerHTML = `
    <div class="alert alert-dismissible alert-success fade show shadow-lg">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <p class="text-center text-dark text-uppercase">
              Status from internet online
              <small class="font-weight-bolder">Estado de Internet en línea 💖</small>
            </p>
            
    </div>
    `;
    danger.innerHTML = '';
 });