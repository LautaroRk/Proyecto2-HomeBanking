//Declaración de variables
var sesionIniciada = false;
var nombreCompleto = "Fernando Fernandez";
var saldoCuenta = 10000;
var limiteExtraccion = 1000;
var nombreUsuario = "asd";
var codigoDeSeguridad = 1234;
var cotizacionDolar = 36.16;

    //Cuentas amigas
    var cuentaAmiga1 = 1234567;
    var cuentaAmiga2 = 7654321;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    alert("Nombre de usuario: asd\nClave de acceso: 1234");
    iniciarSesion();
    if (sesionIniciada){
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    }
}

//Funciones adicionales
function redondearDecimales(numero) {

    var numeroFixed = numero.toFixed(2);

    if (numeroFixed.search('.00') >= 0) {
        return parseInt(numeroFixed).toString();
    }

    return numeroFixed;
}

function sumarDinero(cantidad){
    saldoCuenta += cantidad;
}

function restarDinero(cantidad){
    saldoCuenta -= cantidad;
}

function caracteresInvalidos(numero){

    var esNumero = typeof numero === "number";
    var esValido = esNumero && numero >= 0;

    if (!esValido) {
        alert("Caracteres inválidos.");
    }

    return !esValido;
}

function saldoSuficiente(monto){

    if (monto > saldoCuenta){
        alert("Saldo insuficiente.");
    }

    return monto <= saldoCuenta;
}

function chequeoLimite(monto, divisa = "peso"){

    switch(divisa){ 

        case "peso":
            if (monto > limiteExtraccion){
                alert("Su limite de extracción es de $" + limiteExtraccion);
            }
            break;

        case "dolar":
            if (monto > limiteExtraccion){
                alert("Su limite de extracción es de U$D " + parseInt((limiteExtraccion/cotizacionDolar)));
            }
            break;
    }

    return monto <= limiteExtraccion;
}

function billetesDisponibles(monto, divisa = "peso"){

    switch(divisa){ 

        case "peso":
            if (monto % 100 !== 0){
                alert("Este cajero sólo entrega múltiplos de $100.");
            }
            return monto % 100 === 0;

        case "dolar":
            if (monto % 5 !== 0){
                alert("Este cajero sólo entrega múltiplos de U$D 5.");
            }
            return monto % 5 === 0;
    }
}
   
function operacionExitosa(monto){
    var saldoAnterior = saldoCuenta;
    restarDinero(monto);
    alert("Operación exitosa. Se descontaron $" + redondearDecimales(monto) + " de su cuenta.\n\nSaldo anterior: $" + redondearDecimales(saldoAnterior) + "\nSaldo actual: $" + redondearDecimales(saldoCuenta));
}

function cuentaAmiga(numeroDeCuenta){

    if (numeroDeCuenta !== cuentaAmiga1 && numeroDeCuenta !== cuentaAmiga2){
        alert("El número de cuenta ingresado no corresponde a una Cuenta Amiga.");
    }

    return numeroDeCuenta === cuentaAmiga1 || numeroDeCuenta === cuentaAmiga2;
}

function cambiarClave() {

    claveAntigua = parseInt(prompt("Ingrese su clave actual:"));

    if (claveAntigua === codigoDeSeguridad){
        
        claveNueva = parseInt(prompt("Ingrese su nueva clave personal:"));
        
        if (!caracteresInvalidos(claveNueva) && ((chequeoClaveNueva = parseInt(prompt("Vuelva a ingresar su nueva clave personal:"))) === claveNueva)){
            codigoDeSeguridad = claveNueva;
            alert("Su clave personal fue actualizada con éxito.");
        }else if (claveNueva !== null && chequeoClaveNueva !== claveNueva){
            alert("Las claves ingresadas no coinciden. Operación anulada.");
        }

    }else{
        alert("Clave incorrecta. Operación anulada.");
    }
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {

    monto = parseInt(prompt("Ingrese un nuevo límite de extracción: "));

    if(!caracteresInvalidos(monto)){
        limiteExtraccion = monto;
        actualizarLimiteEnPantalla();
        alert("Su nuevo límite de estracción es de: $" + limiteExtraccion);
    }
}

function extraerDinero() {

    var saldoAnterior = saldoCuenta;
    var divisa = parseInt(prompt("Ingrese el número correspondiente a la divisa que desea retirar:\n\n        1: Pesos\n        2: Dólares (cotización: $" + cotizacionDolar + ")\n"));
    
    switch(divisa){

        case 1: //pesos
            var monto = parseInt(prompt("Ingrese el monto que desea extraer: "));
            if(!caracteresInvalidos(monto) && chequeoLimite(monto) && saldoSuficiente(monto) && billetesDisponibles(monto)){
                restarDinero(monto);
                actualizarSaldoEnPantalla();
                alert("Has retirado: $" + monto + "\n\nSaldo anterior: $" + redondearDecimales(saldoAnterior) + "\nSaldo actual: $" + redondearDecimales(saldoCuenta));
            }
            break;

        case 2: //dolares
            var monto = parseInt(prompt("Ingrese el monto en dólares que desea extraer: "));
            if(!caracteresInvalidos(monto)){
                var conversion = monto * cotizacionDolar;
                if (chequeoLimite(conversion, "dolar") && saldoSuficiente(conversion) && billetesDisponibles(monto, "dolar")){
                    restarDinero(conversion);
                    actualizarSaldoEnPantalla();
                    alert("Has retirado: U$D " + monto + "\n\nLa cotización actual del dólar es de $" + cotizacionDolar + "\nSe han descontado $" + redondearDecimales(conversion) + " de tu cuenta.\n\nSaldo anterior: $" + redondearDecimales(saldoAnterior) + "\nSaldo actual: $" + redondearDecimales(saldoCuenta));
                }
            }
            break;

        default:
            alert("Opción inválida.");
    }
}

function depositarDinero() {

    var saldoAnterior = saldoCuenta;
    var monto = parseInt(prompt("Ingrese el monto del deposito que desea realizar: "));
    
    if (!caracteresInvalidos(monto)){
        sumarDinero(monto);
        alert("Has depositado $" + monto + "\nSaldo anterior: $" + redondearDecimales(saldoAnterior) + "\nSaldo actual: $" + redondearDecimales(saldoCuenta));
        actualizarSaldoEnPantalla();
    }
}

function pagarServicio() {

    var agua = 350;
    var luz = 210;
    var internet = 570;
    var telefono = 425;

    var servicio = parseInt(prompt("Ingrese el número correspondiente al servicio que desea abonar:\n\n        1: Agua ($" + agua + ")\n        2: Luz ($" + luz + ")\n        3: Internet ($" + internet + ")\n        4: Telefono ($" + telefono + ")\n"));

    switch(servicio){
        case 1:
            if(saldoSuficiente(agua)){
                operacionExitosa(agua);
            }
            break;
        case 2:
            if(saldoSuficiente(luz)){
                operacionExitosa(luz);
            }
            break;
        case 3:
            if(saldoSuficiente(internet)){
                operacionExitosa(internet);
            }
            break;
        case 4:
            if(saldoSuficiente(telefono)){
                operacionExitosa(telefono);
            }
            break;
        default:
            alert("Opción inválida.");
    }
    actualizarSaldoEnPantalla();
}

function transferirDinero() {

    var monto = parseInt(prompt("Ingrese el monto que desea transferir:"));

    if (!caracteresInvalidos(monto) && saldoSuficiente(monto) && cuentaAmiga(numeroDeCuenta = parseInt(prompt("Ingrese el número de la cuenta a la cuál desea realizar la transferencia:")))){
        operacionExitosa(monto);
        alert("Fueron transferidos $" + monto + " a la cuenta nro.: " + numeroDeCuenta);
        actualizarSaldoEnPantalla();
    } 
}

function iniciarSesion() {

    var usuario = prompt("Por favor, ingrese su nombre de usuario:");

    if (usuario !== nombreUsuario){
        alert("Nombre de usuario incorrecto.");
    }else{
        //Dos oportunidades para ingresar la clave correcta
        for (var i = 0; i < 2; i++){
            var codigo = parseInt(prompt("Por favor, ingrese su clave personal:"));
            if (codigo === codigoDeSeguridad){
                alert("Bienvenido/a " + nombreCompleto + ". Ya puede comenzar a realizar operaciones.");
                sesionIniciada = true;
                break;
            }else{
                alert("Clave incorrecta.");
            }
        }
        if (codigo !== codigoDeSeguridad){ 
            alert("Tu dinero ha sido retenido por cuestiones de seguridad.");
            saldoCuenta = 0;
        }
    }
    if (!sesionIniciada){
        alert("Error en el inicio de sesión. Actualice la página para volver a intentarlo.");
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreCompleto;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + redondearDecimales(saldoCuenta);
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}