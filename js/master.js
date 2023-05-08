//VARIABLES
//LOCALSTORAGE - Lista de Usuarios (array) y Mi perfil (objeto)
let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let miUsuario = JSON.parse(localStorage.getItem("miUsuario")) || {};
let miNombre = document.getElementById('profile-name');
let btnLogout = document.getElementById('log-out').querySelector('a');



//FUNCIONES
//logOut - se ejecuta con boton de logout para pushear miUsuario a lista de usuarios y llevar el index que es la página de registro y login
const logOut = () =>{
    listaUsuarios.forEach(obj => {
        if(obj.email===miUsuario.email || obj.usuario === miUsuario.usuario){
            //reemplazo valores en lista usuario
            obj.saldoPesos = miUsuario.saldoPesos;
            obj.saldoUSD = miUsuario.saldoUSD;
            obj.actividad = miUsuario.actividad;
            obj.wallet = miUsuario.wallet;
            //Ingresa a mi wallet
            swal({
                title: "Cierre de sesión exitoso",
                text: "Ha salido de su CODERWALLET. Vuelva pronto!" ,
                icon: "success",
            });
            //reseteo valores en storage
            
            localStorage.removeItem('miUsuario');
            localStorage.setItem('usuarios',JSON.stringify(listaUsuarios));
            /* setTimeout(()=>{
                window.location.href = "/JavaScript/coderwallet-lazarte/index.html";
            }, 2000); */
            /* setTimeout( () => {
                location.href = "./index.html";
                }, 2000); */
            window.location.href = "/JavaScript/coderwallet-lazarte/index.html"
        }else{
            swal({
                title: "Error en el deslogueo!",
                icon: "error",
            });
        }
    });

}

//EVENTOS
document.addEventListener('DOMContentLoaded', ()=>{
    miNombre.textContent = miUsuario.nombre;
})
btnLogout.addEventListener('click', () =>{
    logOut();
})