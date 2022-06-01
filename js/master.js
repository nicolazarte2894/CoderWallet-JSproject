let miUsuario = JSON.parse(localStorage.getItem("miUsuario")) || {};
let miNombre = document.getElementById('profile-name');
let btnLogout = document.getElementById('log-out').querySelector('a');

document.addEventListener('DOMContentLoaded', ()=>{
    miNombre.textContent = miUsuario.nombre;
})