//PASOS
//1- Obtener solo mi usuario como un objeto y lista usuarios
//2- Fetch de apis (cotización dolar y criptomonedas)
/*3- Variables globales DOM: 
    -saldo en pesos
    -saldo en dolares
    -inputs (ingreso, transferencia, cvu o cbu, compra o venta USD)
    -botones (ingresar dinero, transferir dinero, comprar y vender USD)
 */
//4- Eventos: botones (click) e inputs (change)
/*5- Funciones: 
    -modificarSaldo en pesos
    -modificarSaldo en USD
*/

//VARIABLES
//LOCALSTORAGE - Lista de Usuarios (array) y Mi perfil (objeto)
let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
//DOM - Saldo Pesos
let spanSaldoPesos = document.getElementById('saldo-pesos');
let inputIngresar = document.getElementById('card-ingresar-dinero').querySelector('input');
let btnIngresar = document.getElementById('card-ingresar-dinero').querySelector('button');
let inputTransferir = document.getElementById('card-transferir-dinero').querySelectorAll('input')[0];
let numeroCuenta = document.getElementById('card-transferir-dinero').querySelectorAll('input')[1];
let btnTransferir = document.getElementById('card-transferir-dinero').querySelector('button');
//DOM - Saldo Dolares
let spanSaldoUSD = document.getElementById('saldo-dolares');
let tasaCompraUSD = document.getElementById('tasa-compra-usd');
let tasaVentaUSD = document.getElementById('tasa-venta-usd');
let cotizadorCompraUSD = document.getElementById('cotizador-compra-usd');
let cotizadorVentaUSD = document.getElementById('cotizador-venta-usd');
let inputCompraUSD = document.getElementById('input-compra-usd');
let inputVentaUSD = document.getElementById('input-venta-usd');
let btnComprarUSD = document.getElementById('btn-comprar-usd');
let btnVenderUSD = document.getElementById('btn-vender-usd');


//EVENTOS
//1-Fetch
document.addEventListener('DOMContentLoaded', ()=>{
    //miUsuario = JSON.parse(localStorage.getItem("miUsuario")) || {};
    fetchUSD();
    pintarSaldoPesos();
    pintarSaldoUSD();
    
    //fetchCripto();
})
//2-Click ingresar dinero
btnIngresar.addEventListener('click', ()=>{
    ingresarPesos();
})
//3-Click transferir dinero
btnTransferir.addEventListener('click', ()=>{
    transferirPesos();
})
//4-Click comprar USD
btnComprarUSD.addEventListener('click', ()=>{
    comprarUSD();
})
//5-Click vender USD
btnVenderUSD.addEventListener('click', ()=>{
    venderUSD();
})
//6-Input transferencia para validad saldo suficiente
inputTransferir.addEventListener('input', ()=>{ 
    saldoPesosInsuficiente();
})
//7-Input Comprar USD
inputCompraUSD.addEventListener('input', ()=>{
    cotizarCompraUSD();
    saldoCompraUSDInsuficiente();
})
//7-Input Venta USD
inputVentaUSD.addEventListener('input', ()=>{
    cotizarVentaUSD();
    saldoVentaUSDInsuficiente();
})


//FUNCIONES
//FETCH APIS
const fetchUSD = async () => {
    try {
        const res = await fetch('https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarblue');
        const data = await res.json();
        console.log(data);
        pintarTasaUSD(data);
    } catch (error) {
        console.log(error)
    }
}

//pintarTasaUSD - Trae la cotizacion del dolar blue en Arg
const pintarTasaUSD = (data) => {
    tasaCompraUSD.textContent = data.compra;
    tasaVentaUSD.textContent = data.venta;
}
//pintarSaldoPesos - pinta el saldo en pesos del usuario
const pintarSaldoPesos = () => {
    spanSaldoPesos.textContent = miUsuario.saldoPesos;
}
//pintarSaldoUSD - pinta el saldo en USD del usuario
const pintarSaldoUSD = () => {
    spanSaldoUSD.textContent = miUsuario.saldoUSD;
}

//ingresarPesos - aumenta el saldo de la cuenta en pesos
const ingresarPesos = () => {
    if(inputIngresar.value == ''){
        swal({
            title: "Error!",
            text: "Ingrese un valor",
            icon: "error",
        });
    }else{
        miUsuario.saldoPesos += parseFloat(inputIngresar.value);
        pintarSaldoPesos();
        inputIngresar.value = '';
        localStorage.setItem("miUsuario",JSON.stringify(miUsuario))
        swal({
            title: "Transacción exitosa!",
            icon: "success",
        });
    }
}

//saldoPesosInsuficiente - valida si hay saldo suficiente para transferir
const saldoPesosInsuficiente = () => {
    if(inputTransferir.value > miUsuario.saldoPesos){
        swal({
            title: "Error!",
            text: "Saldo Insuficiente",
            icon: "error",
        });
    }
};

//transferirPesos - disminuye el saldo de la cuenta en pesos
const transferirPesos = () => {
    if(inputTransferir.value == '' || inputTransferir.value > miUsuario.saldoPesos || numeroCuenta.value == '' || numeroCuenta.value.length != 22){
        swal({
            title: "Error!",
            text: "Ingrese los valores correctamente",
            icon: "error",
        });
    }else{
        miUsuario.saldoPesos -= parseFloat(inputTransferir.value);
        pintarSaldoPesos();
        inputTransferir.value = '';
        numeroCuenta.value = '';
        localStorage.setItem("miUsuario",JSON.stringify(miUsuario));
        swal({
            title: "Transacción exitosa!",
            icon: "success",
        });
    }
}

//cotizarCompraUSD - Muestra la equivalencia en $ de acuerdo al input en USD
const cotizarCompraUSD = () =>{
    if(inputCompraUSD.value ==''){
        cotizadorCompraUSD.textContent = 0;
    }else{
        cotizadorCompraUSD.textContent = parseFloat(inputCompraUSD.value) * parseFloat(tasaVentaUSD.textContent);
    }
}

//cotizarVentaUSD - Muestra la equivalencia en $ de acuerdo al input en USD
const cotizarVentaUSD = () =>{
    if(inputVentaUSD.value ==''){
        cotizadorVentaUSD.textContent = 0;
    }else{
    cotizadorVentaUSD.textContent = parseFloat(inputVentaUSD.value) * parseFloat(tasaCompraUSD.textContent);
    }
}

//verificar saldo compra USD
const saldoCompraUSDInsuficiente = () =>{
    if(cotizadorCompraUSD.textContent > miUsuario.saldoPesos){
        swal({
            title: "Error!",
            text: "Su saldo en la cuenta en pesos es Insuficiente",
            icon: "error",
        });
    } 
}

//verificar saldo venta USD
const saldoVentaUSDInsuficiente = () =>{
    if(inputVentaUSD.value > miUsuario.saldoUSD){
        swal({
            title: "Error!",
            text: "Su saldo en la cuenta en dolares es Insuficiente",
            icon: "error",
        });
    }
}

//comprarUSD - aumenta el saldo de USD y disminuye saldo en pesos
const comprarUSD = () => {
    
        if(inputCompraUSD.value == '' || cotizadorCompraUSD.textContent >miUsuario.saldoPesos){
            swal({
                title: "Error!",
                text: "Dato inválido",
                icon: "error",
            });
        }else{
            miUsuario.saldoUSD += parseFloat(inputCompraUSD.value);
            miUsuario.saldoPesos -= parseFloat(cotizadorCompraUSD.textContent);
            localStorage.setItem("miUsuario",JSON.stringify(miUsuario));
            pintarSaldoUSD();
            pintarSaldoPesos();
            swal({
                title: "Transacción exitosa!",
                icon: "success",
            });
        }
    
}
//venderUSD - disminuye el saldo de USD y aumenta saldo en pesos

const venderUSD = () => {
    if(inputVentaUSD.value == '' || inputVentaUSD.textContent > miUsuario.saldoUSD){
        swal({
            title: "Error!",
            text: "Dato inválido",
            icon: "error",
        });
    }else{
        miUsuario.saldoUSD -= parseFloat(inputVentaUSD.value);
        miUsuario.saldoPesos += parseFloat(cotizadorVentaUSD.textContent);
        localStorage.setItem("miUsuario",JSON.stringify(miUsuario));
        pintarSaldoUSD();
        pintarSaldoPesos()
        swal({
            title: "Transacción exitosa!",
            icon: "success",
        });
    }
}